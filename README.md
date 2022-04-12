[![Build Status](https://app.travis-ci.com/nxalan/Pitang-Appointment-API.svg?branch=main)](https://app.travis-ci.com/nxalan/Pitang-Appointment-API)
[![Coverage Status](https://coveralls.io/repos/github/nxalan/Pitang-Appointment-API/badge.svg?branch=main)](https://coveralls.io/github/nxalan/Pitang-Appointment-API?branch=main)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)

## O que cada um dos diretórios representa

* data: Camada responsável pela regra de negócio
* domain: Camada responsável pelos casos de uso e modelos de dados
* infra: Camada responsável pela implementação dos repositories e conexão com banco
* main: Conhecido como Composition Root, essa é a camada mais acoplada da aplicação, onde é feito a
  composição de todas as outras camadas
* presentation: Camada onde serão criados os controllers que terão acesso aos casos de uso da
  camada domain

## Bibliotecas e ferramentas utilizadas:
* NPM
* Typescript
* Git
* Docker
* Jest
* MongoDb
* Bcrypt
* JsonWebToken
* Validator
* Express
* Supertest
* Husky
* Lint Staged
* Eslint
* Standard Javascript Style
* Sucrase
* Nodemon
* Rimraf
* In-Memory MongoDb Server

