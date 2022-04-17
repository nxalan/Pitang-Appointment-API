[![Build Status](https://app.travis-ci.com/nxalan/Pitang-Appointment-API.svg?branch=main)](https://app.travis-ci.com/nxalan/Pitang-Appointment-API)
[![Coverage Status](https://coveralls.io/repos/github/nxalan/Pitang-Appointment-API/badge.svg?branch=main)](https://coveralls.io/github/nxalan/Pitang-Appointment-API?branch=main)
[![Known Vulnerabilities](https://snyk.io/test/github/nxalan/Pitang-Appointment-API/badge.svg)](https://snyk.io/test/github/nxalan/Pitang-Appointment-API)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![Open Source](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://opensource.org/)


## [**Link para a documentação da API**](http://pitang-appointment-api.herokuapp.com/api-docs)

> ## APIs cadastradas

1. [Criar agendamento](./requirements/add-appointment.md)
2. [Listar agendamento especifico](./requirements/get-appointment.md)
3. [Listar todos agendamentos](./requirements/get-appointments.md)
4. [Deletar agendamento especifico](./requirements/delete-appointment.md)
5. [Editar agendamento especifico](./requirements/edit-appointment.md)
6. [Listar dias e horários restritos](./requirements/get-restricted-dates.md)

> ## Metodologias e Designs utilizados

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

> ## Features da Aplicação

* Documentação de API com Swagger
* API Rest com Express
* Testes com Jest
* Typescript
* Banco de dados MongoDB
* Log de Erro
* Middlewares
* Validações
* Docker e Docker-Compose
* Deploy no Heroku

> ## Features de Testes

* Testes Unitários
* Testes de Integração (API Rest)
* Cobertura de Testes
* Test Doubles
* Mocks
* Stubs
* Spies
* Fakes

## O que cada um dos diretórios representa

* data: camada responsável pela regra de negócio
* domain: camada responsável pelos casos de uso e modelos de dados
* infra: camada responsável pela implementação dos repositories e conexão com banco
* main: conhecido como composition root, essa é a camada mais acoplada da aplicação, onde é feito a
  composição de todas as outras camadas
* presentation: camada onde serão criados os controllers que terão acesso aos casos de uso da
  camada domain