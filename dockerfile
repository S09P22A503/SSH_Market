FROM openjdk:17-jdk-alpine

ARG JAR_FILE=build/libs/*.jar

WORKDIR /myapp

COPY ${JAR_FILE} member-application.jar

ENTRYPOINT ["java","-Duser.timezone=Asia/Seoul", "-Dspring.profiles.active=${PROFILE}", "-jar","member-application.jar"]
