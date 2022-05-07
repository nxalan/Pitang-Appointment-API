[![Build Status](https://app.travis-ci.com/nxalan/appointment-api.svg?branch=main)](https://app.travis-ci.com/nxalan/appointment-api)
[![Coverage Status](https://coveralls.io/repos/github/nxalan/appointment-api/badge.svg?branch=main)](https://coveralls.io/github/nxalan/appointment-api?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/nxalan/appointment-api/badge.svg)](https://snyk.io/test/github/nxalan/appointment-api)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## Application Goal

  Given the current scenario, there is a huge demand for people to take the vaccine to the COVID-19. And with that our city is in need of a simple system to carry out the appointments. The process consists of creating a portal where it will be possible to schedule patients for take the vaccine, build an API to consult the appointments made per day and hour.

  The application have some validations:
  The maximum availability of appointment per day is 20.
  The maximum availability of appointment per hour is 2.

## Documentation

* [**SWAGGER**](http://alan-appointment-api.herokuapp.com/api-docs)

> ## Created APIs

1. [Create Appointment](./requirements/add-appointment.md)
2. [List Specific Appointment](./requirements/get-appointment.md)
3. [List All Appointments](./requirements/get-appointments.md)
4. [Delete Specific Appointment](./requirements/delete-appointment.md)
5. [Update Specific Appointment](./requirements/edit-appointment.md)
6. [List Restricted Days and Hours](./requirements/get-restricted-dates.md)

> ## Design and Metodologies

* TDD
* Clean Architecture
* DDD
* Conventional Commits
* GitFlow
* Modular Design
* Dependency Diagrams
* Use Cases
* Continuous Integration
* Continuous Delivery
* Continuous Deployment

> ## Application Features

* API Documentation with Swagger
* API Rest with Express
* Tests with Jest
* Typescript
* MongoDB Database
* Automatic Database Error Logging
* Middlewares
* Validations
* Docker and Docker-Compose
* Heroku Deploy

> ## Tests Features

* 100% of Test Coverage
* Unit Testing
* Integration Testing (API Rest)
* Test Doubles
* Mocks
* Stubs
* Spies
* Fakes

> ## What every folder represents

* data: layer responsible for the business rule
* domain: layer responsible for use cases and data models
* infra: layer responsible for implementing repositories and database connection
* main: known as composition root, this is the most coupled layer of the application, where all other layers are composed
* presentation: layer where the controllers that will have access to the use cases of the domain layer will be created

> ## How to start the application

With Docker Compose: <br />
1. Open the project root folder
2. Run the command: npm run up
3. The API will be acessible on localhost:3000* and the database will be acessible on localhost:27017*
4. To stop the aplication run the command: npm run down
5. To delete the database folder run the command: sudo rm -rf data
*Is necessary to await at least 30 seconds because of the API build process

Manually: <br />
MongoDB 4.5+ accessible on port 27017 is necessary or<br />
you can use .env variable MONGO_URL set to a valid MongoDB 4.5+ url <br />
1. Open the project root folder
2. Run the command: npm run install
3. Run the command: npm run build
4. Run the command: npm run start
5. The application will be acessible on localhost:3000
