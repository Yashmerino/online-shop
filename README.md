[![Java CI with Maven](https://github.com/Yashmerino/online-shop/actions/workflows/maven.yml/badge.svg)](https://github.com/Yashmerino/online-shop/actions/workflows/maven.yml) [![Node.js CI](https://github.com/Yashmerino/online-shop/actions/workflows/node.js.yml/badge.svg)](https://github.com/Yashmerino/online-shop/actions/workflows/node.js.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Yashmerino_online-shop&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Yashmerino_online-shop)

<h1 align="center"><strong><em>Online Shop</strong></em></h1>

<p align="center"><img src="https://static.vecteezy.com/system/resources/previews/009/848/288/original/verified-shop-online-store-3d-illustration-for-ecommerce-icon-free-png.png" alt="sms logo" height=225 width=225></p>

<h3 align="center"><strong>Online Shop YouTube Video</strong></h3>

[![YouTube Showcase Video of the project](demo/thumbnail.png)](https://www.youtube.com/watch?v=mUr1V9aDOi8)

Online Shop is a pet project made using Spring Boot and React. It uses a MySQL database to store the user, seller and products data. Online shop uses JWT for the authorization system and supports 3 languages:
* English
* Romanian
* Russian

## Prerequisites:
* Java 17+
* Node.js 21+
* Maven
* MySQL Database

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
jwt.secret=YOUR_JWT_SECRET

# Algolia
# Change it to "true" if Algolia search is enabled.
algolia.usage=false
algolia.app.id=YOUR_APP_ID
algolia.api.key=YOUR_API_KEY
algolia.index.name=YOUR_INDEX_NAME
```
* Execute the `mvn spring-boot:run` command in the `online-shop\online-shop-server` directory.
<br>

# To run the React client application:

* Execute the `npm install` command in the `online-shop\online-shop-ui` directory.
* Modify the `online-shop-ui\src\env-config.ts` file.
```ts
export const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:8080';
export const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID || 'YOUR_APP_ID';
export const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY || 'YOUR_API_KEY';
export const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME || 'YOUR_INDEX_NAME';
// Change it to "true" if Algolia search is enabled.
export const ALGOLIA_USAGE = false;
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
    healthcheck:
      test: ["CMD", "mysqladmin", "ping", "-h", "localhost", "-u", "root", "-p1234"]
      interval: 10s
      retries: 5
      start_period: 60s

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
      algolia.app.id: YOUR_APP_ID
      algolia.api.key: YOUR_API_KEY
      algolia.index.name: YOUR_INDEX_NAME
      jwt.secret: YOUR_JWT_SECRET
    depends_on:
      db:
        condition: service_healthy
    healthcheck:
      test: ["CMD", "curl", "--fail", "http://localhost:8081/actuator/health"]
      interval: 10s
      retries: 5
      start_period: 60s

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
      JWT_SECRET: YOUR_JWT_SECRET
      ALGOLIA_APP_ID: YOUR_APP_ID
      ALGOLIA_API_KEY: YOUR_API_KEY
      ALGOLIA_INDEX_NAME: YOUR_INDEX_NAME
      ALGOLIA_USAGE: true
    depends_on:
      server:
        condition: service_healthy
    healthcheck:
      test: ["CMD-SHELL", "curl --fail http://localhost:8080 || exit 1"]
      interval: 10s
      retries: 5
      start_period: 60s
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
