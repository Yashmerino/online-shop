[![Java CI with Maven](https://github.com/Yashmerino/online-shop/actions/workflows/maven.yml/badge.svg)](https://github.com/Yashmerino/online-shop/actions/workflows/maven.yml) [![Node.js CI](https://github.com/Yashmerino/online-shop/actions/workflows/node.js.yml/badge.svg)](https://github.com/Yashmerino/online-shop/actions/workflows/node.js.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Yashmerino_online-shop&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Yashmerino_online-shop)

<h1 align="center"><strong><em>Online Shop</strong></em></h1>

<p align="center"><img src="https://static.vecteezy.com/system/resources/previews/009/848/288/original/verified-shop-online-store-3d-illustration-for-ecommerce-icon-free-png.png" alt="sms logo" height=225 width=225></p>

Online Shop is a pet project made using Spring Boot and React. It uses a MySQL database to store the user, seller and products data. Online shop uses JWT for the authorization system and supports 3 languages:
* English
* Romanian
* Russian

## Prerequisites:
* Java 17+
* Node.js 21+
* Maven
* MySQL Database
<br>

## To run the Spring server application:

* Execute the `mvn clean install` command in the `online-shop\online-shop-server` directory.
* Modify the `online-shop-server\src\main\resources\application.properties` file.
```properties
server.port=8081

# Database properties
spring.jpa.hibernate.ddl-auto=create
spring.datasource.url=jdbc:mysql://localhost:3306/online_shop
spring.datasource.username=root
spring.datasource.password=1234
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Swagger properties
springdoc.swagger-ui.tagsSorter=alpha

# JWT
jwt.secret=640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316

# Algolia
algolia.usage=true
algolia.app.id=KLFWXPOEHY
algolia.api.key=87c939ac9269c88a17beeaacca28567a
algolia.index.name=online-shop-dev
```
* Execute the `mvn spring-boot:run` command in the `online-shop\online-shop-server` directory.
<br>

# To run the React client application:

* Execute the `npm install` command in the `online-shop\online-shop-ui` directory.
* Modify the `online-shop-ui\src\env-config.ts` file.
```ts
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';
export const JWT_SECRET = process.env.JWT_SECRET || '640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316';
export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'KLFWXPOEHY';
export const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || '87c939ac9269c88a17beeaacca28567a';
export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'online-shop-dev';
export const ALGOLIA_USAGE = process.env.ALGOLIA_USAGE === "true";
```
* Execute the `npm start` command in the `online-shop\online-shop-ui` directory.

<b>NOTE</b>: If you don't want to use the Algolia search and therefore to not display the search page, you don't have to define any Algolia properties.

<br>

# To run the app using Docker Compose:

* Make sure to have Docker and Docker-Compose installed.
* Create a `init-db.sql` file.
```sql
CREATE DATABASE IF NOT EXISTS online_shop;
```
* Create a `docker-compose.yml` file.
```yaml
services:
  # Database service
  db:
    image: mysql:latest
    container_name: online-shop-mysql
    networks:
      - online-shop-network
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: 1234
    volumes:
      - ./init-db.sql:/docker-entrypoint-initdb.d/init-db.sql

  # Server service
  server:
    image: yashmerino/online-shop-server:latest
    container_name: online-shop-server
    networks:
      - online-shop-network
    ports:
      - "8081:8081"
    environment:
      SPRING_DATASOURCE_URL: jdbc:mysql://db:3306/online_shop
      SPRING_DATASOURCE_USERNAME: root
      SPRING_DATASOURCE_PASSWORD: 1234
      algolia.usage: true
      algolia.app.id: KLFWXPOEHY
      algolia.api.key: 87c939ac9269c88a17beeaacca28567a
      algolia.index.name: online-shop-dev
      jwt.secret: 640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316
    depends_on:
      - db

  # UI service
  ui:
    image: yashmerino/online-shop-ui:latest
    container_name: online-shop-ui
    networks:
      - online-shop-network
    ports:
      - "8080:8080"
    environment:
      API_BASE_URL: http://online-shop-server:8081
      JWT_SECRET: 640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316640762F165320F52408DAFED313C106346575273C66013DE94B8D13E9ED20316
      ALGOLIA_APP_ID: KLFWXPOEHY
      ALGOLIA_API_KEY: 87c939ac9269c88a17beeaacca28567a
      ALGOLIA_INDEX_NAME: online-shop-dev
      ALGOLIA_USAGE: true
    depends_on:
      - server
networks:
  online-shop-network:
    driver: bridge
```
* Execute the `docker-compose up -d` command.
* Access the app using `http://localhost:8080`.

<br>

# Selenium Integration Tests

* Online Shop also has a separate module for Selenium integration tests. It resides here: `online-shop/online-shop-it`
* Modify the `online-shop-it\src\test\resources\it-test.properties` file.
```properties
db.url=jdbc:mysql://localhost:3306/online_shop
db.username=root
db.password=1234
```
* Make sure to turn on the Spring server and React client to run the integration tests.

<b>NOTE</b>: If you run any integration test, it will dump all the existing data from your database.
  
<br>

#### Feel free to create issues and pull requests :)
