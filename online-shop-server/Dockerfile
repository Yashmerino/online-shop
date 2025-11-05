FROM maven:3.8.1-openjdk-17 AS build

WORKDIR /online-shop-server

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src /online-shop-server/src

RUN mvn package -DskipTests

FROM eclipse-temurin:17-jre

WORKDIR /online-shop-server

COPY --from=build /online-shop-server/target/*.jar online-shop-server.jar

EXPOSE 8081

RUN apt-get update && apt-get install -y curl

CMD ["java", "-jar", "online-shop-server.jar"]
