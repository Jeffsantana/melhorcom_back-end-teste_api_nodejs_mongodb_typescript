# api_node_mongodb_typescript

Starter API Rest with Node.js, express.js, JWT, Mongoose and MongoDB

all this with typescript
# Getting started

This is a basic API REST written on JavaScript using async/await. Great for building a starter web API for your front-end (Android, iOS, Vue, react, angular, or anything that can consume an API)

#Features
Multiple environment ready(Development, Test, Production).
Response with Mongoose paginate.
Standardized Message responses.
User profile.
Users list for admin area.
JWT Tokens, make requests with a token after login with Authorization header with value Bearer yourToken where yourToken is the signed and encrypted token given in the response from the login process.
Basic Web page show status of API and Date base.
Use Nodemon
Cors ready
Possible to configure https mode

#Requirements
Node.js 8+
MongoDB 3.6+

#How to Install
Using Git (recommended)
Clone the project from github. Change "myproject" to your project name.

Install npm dependencies after installing
cd ~/myproject
$ yarn

#Setting up environments (development or production)
In the root this repository you will find a file named .env.example
Create a new file by copying and pasting the file and then renaming it to just .env
The file .env is already ignored, so you never commit your credentials.
Change the values of the file to your environment (development or production)
Upload the .env to your environment server(development or production)

#How to run development mode
cd ~/myproject
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

see the status information in: http://localhost:4500/api/v1

#How to run production mode
use pm2 (Advanced, production process manager for Node.js) [http://pm2.keymetrics.io/]
bash
npm run production

#Usage
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