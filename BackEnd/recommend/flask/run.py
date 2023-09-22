from flask import  Flask
import redis
import threading
from pyspark.ml.recommendation import ALSModel
from sparksession import CommonSparkSession

from recommendation_model import RecommendationModel
is_started = False

def get_recommendation_model():

  s3_path = "s3a://a503/model/"

  model = ALSModel.load(s3_path)
  
  if model is None:
    raise ValueError("S3에 모델이 존재하지 않습니다")


  return model


def replace_train_model():
  model = get_recommendation_model()
  if model is None:
    raise ValueError("Redis에 학습된 모델이 없습니다.")
  RecommendationModel().set_recommendation_model(model)


def listen_train_model():
  r = redis.Redis()
  p = r.pubsub()
  p.subscribe('recommend-model-train')

  print('is thread run twice?')

  for msg in p.listen():
    if msg['type'] == 'message':
      replace_train_model()
      print("sdadas")


def create_app():

  global is_started

  app = Flask(__name__)

  app.config.from_object('config')

  from app.views import views
  from app.database import connection


  # DB연결
  connection.setup_db(app)

  CommonSparkSession().init_spark_session()

  #Blueprint 등록 (라우팅)
  app.register_blueprint(views.bp)

  #Redis 서버에 존재하는 모델을 가져옴
  replace_train_model()

  #Redis Subscribe Thread 실행
  if(not is_started):
    threading.Thread(target=listen_train_model, daemon=True).start()
    is_started = True
    
  return app