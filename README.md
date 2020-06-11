# Rental Apartments
Full Stack Project: Spring Boot, Next.js

This repository has two projects: rental-api and rental-front 

## rental-api
Is a spring-boot app that has two modules: api and security
### api
[api](api/README.md) is a Spring Boot module that expose a API to rent apartments

### security
[security](security/README.md) is a spring boot security module

### before run
Config a postgres database and set JDBC_DATABASE_URL, JDBC_DATABASE_USERNAME and JDBC_DATABASE_PASSWORD. If it's your first run, you need to create the database. So, edit the property spring.jpa.hibernate.ddl-auto at the file [properties](api/src/main/resources/application.properties)

### build

```shell
mvn clean package
```

### run
Make sure to set spring.jpa.hibernate.ddl-auto as update at the file [properties](api/src/main/resources/application.properties)
```shell
java -jar api/target/api-0.0.1-SNAPSHOT.jar
```

Than curl at http://localhost:8090/api/v1/profile/. To see a json response. Like that
```json
{
  "_links" : {
    "self" : {
      "href" : "http://localhost:8090/api/v1/profile"
    },
    "users" : {
      "href" : "http://localhost:8090/api/v1/profile/users"
    },
    "rents" : {
      "href" : "http://localhost:8090/api/v1/profile/rents"
    },
    "apartments" : {
      "href" : "http://localhost:8090/api/v1/profile/apartments"
    }
  }
}
```

## rental-front
[rental-front](rental-front/README.md) is a Next.js application. The config instructions are at the project README file
