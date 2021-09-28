# api_node_mongodb_typescript
# Teste de Back-End (NodeJS)
Api developed for back end test of melhorcom (https://melhorcom.com.br/)
That's a fork from https://github.com/Jeffsantana/api_node_mongodb_typescript

Starter API REST with Node.js, express.js, JWT, Mongoose and MongoDB

all this with typescript
# Getting started

This is a basic API REST written on JavaScript using async/await. Great for building a starter web API for your front-end (Android, iOS, Vue, react, angular, or anything that can consume an API)

# Features
Response with Mongoose paginate.
Standardized Message responses.


#Requirements
Node.js 14+
MongoDB 3.6+

#How to Install
Using Git
$ git clone https://github.com/Jeffsantana/melhorcom_back-end-teste_api_nodejs_mongodb_typescript 

Install yarn dependencies after installing
cd ~/melhorcom_back-end-teste_api_nodejs_mongodb_typescript
$ yarn

#For this purpose you don't need to set environment variables 

#How to run development mode
cd ~/melhorcom_back-end-teste_api_nodejs_mongodb_typescript
yarn dev
You will know server is running by checking the output of the command yarn dev:

---

$ yarn dev

yarn run v1.22.11

$ ts-node-dev --respawn --transpile-only --ignore-watch node_modules server.ts

[INFO] 10:28:19 ts-node-dev ver. 1.1.8 (using ts-node ver. 9.1.1, typescript ver. 4.4.2)

🚀 Server Running
🚀 Port 4500
🚀 Mongodb connected

---

#Usage/test
Using a restful client test
if you using Insomnia downloading this .json and import on the app https://drive.google.com/file/d/1AyQgWcsPjYj1AA-4jqF4c27gmeDg73QX/view?usp=sharing

or anything that can consume an API
the implemented endpoints are: 
request post url('http://localhost4500/phone');
request get url('http://localhost4500/phone/');
request put url('http://localhost4500/phone/');
request delete url('http://localhost4500/phone/');
request get url('http://localhost4500/phone');







Need new modules? The module contains everything with direct relation. Like a models, controllers, use cases, routes. Create a new path with name of new module, and four paths inside: controllers, models, routes and useCases. 

We use class, is good! 

Creating new controllers
If you need to add more controllers to the project just create a new file with class and export in /src/app/modules/new_module/controllers/NewController.ts 

Creating new models
If you need to add more models to the project just create a new file with class and export in /src/app/modules/new_module/models/NewModel.ts

Creating new routes
If you need to add more routes to the project just create a new file with class and export in /src/app/modules/new_module/routes/index.ts and load+export this file in /src/app/routes/index.js

#Responsible
This project is SantanaJeff´s responsability
contact in:
jeffersonsantana.ti@gmail.com

#License
This project is open-sourced software licensed under the MIT License. See the LICENSE file for more information.