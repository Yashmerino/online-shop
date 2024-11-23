FROM maven:3.8.1-openjdk-17 AS build

WORKDIR /online-shop-server

COPY pom.xml .

RUN mvn dependency:go-offline

COPY src /online-shop-server/src

RUN mvn package -DskipTests

FROM openjdk:17-jdk-slim

WORKDIR /online-shop-server

COPY --from=build /online-shop-server/target/*.jar online-shop-server.jar

COPY ./scripts/wait-for-it.sh /scripts/wait-for-it.sh

RUN chmod +x /scripts/wait-for-it.sh

EXPOSE 8081

CMD ["java", "-jar", "online-shop-server.jar"]
