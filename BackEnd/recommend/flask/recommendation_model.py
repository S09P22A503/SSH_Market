from sparksession import CommonSparkSession
import requests
import json

class RecommendationModel:
    __instance = None
    __model = None
    __recommendations = None

    def __new__(cls, *args, **kwargs):
        if not cls.__instance:
            cls.__instance = super(RecommendationModel, cls).__new__(cls, *args, **kwargs)
        return cls.__instance

    def set_recommendation_model(self, new_model):
        self.__model = new_model
        
        # member 테이블의 id를 가져옴
        try:
            memberIds = requests.get(url="https://j9a503a.p.ssafy.io/members/all").json()["data"]
        except:
            memberIds = [i for i in range(1000)]
        
        userSubset = CommonSparkSession() \
                                    .get_spark_session() \
                                    .createDataFrame(memberIds, ["user_id"])
        recommendationsForUser = self.__model.recommendForUserSubset(userSubset, 5)
        recommendations_list = [row.asDict() for row in recommendationsForUser.collect()]
        recommendations_dict = {row['user_id']: row for row in recommendations_list}
        self.__recommendations = recommendations_dict
        

    def get_recommendations(self):
        return self.__recommendations
    
    def get_recommendation_for_user(self,userId):
        return self.__recommendations.get(userId, None)

    def get_recommendation_model(self):
        return self.__model