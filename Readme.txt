
In order to upload social places data using Yelp fusion APIs to Recombee item catalogue is already done by running python script which is inside /data folder.

------------------------------------------------------------------------------------------------------------------------------------------------------------
In order to run the entire application, client (ReactJs), server (NodeJs), mysql and mongodb should be up and running.

Currently, we are using NodeJs Express framework (4.17.1) and ReactJs Version (17.0.2)

To run the project:
1.	Install Mongodb,NodeJs and NVM (Node Virtual machine) with correct configurations
2.	Copy the project and extract Final_Project folder that consist of two folder called client and server
3.	Install and configure MYSQL and mongo DB
4.	Fire the below My SQl and Mongo DB queries

MySQL Queries in workbench Mysql:
//Note: Workbench Mysql user = "root" and password=""
Show databases;
create database project;
use project;


create table user
(
id int primary key NOT NULL AUTO_INCREMENT,
username varchar(100),password varchar(100),location varchar(100),
longitude varchar(100),latitude varchar(100)
);



Mongo Commands:
1.	Go to mongoDb bin folder using command prompt.
2.	Run=>  mongod.exe
3.	Double click on mongo.exe and open mongo shell.
4.	Run the following command for mongo

Use CustomerReviews
Show dbs
use ratingMongo
db.createCollection(“documents”)  
show collections
db.documents.find()



5.    open command prompt and come to Final_Project/server directory to run the server first, this will start on port number 3001

Type following commands to run server:
npm install
nodemon start

6.    open another command prompt and come to Final_Project/client directory to run client, this will start on port number 3000

Type following command to run client:
npm install
npm start

7.    open another command propmt to run mongo deamon by following command or run mongod.exe directly

mongod

8.    open another command prompt to see all mongodb results by following command

mongo
use ratingMongo
show collections
db.documents.find()

------------------------------------------------------------------------------------------------------------------------------------------------------------
                                          API KEYS USED IN PROJECT
------------------------------------------------------------------------------------------------------------------------------------------------------------

Yelp fusion API Key = "helGUeqNlXHSd-EZ2XLiQrMpQ25vAm2TNhsiJ5K2cP9XXaAeOw_Q7NvhG1TWLRvggiFQQOqK_8twVcxOqpcxpzdPTYN6Lad9l9Gu1etR4u6FO6ke7gHN6CaISkmHYHYx"

Recombee server side API key = "DEJsyJUwbrXVEePuRyEQmfAayorajE6ELWUSU3xIpr1rXuELPQfilPpkTytBANQA"

Google Map API key = "AIzaSyBn8Nd-y2xT2QFtkh8INau53gcZbT64x_k"

-------------------------------------------------------------------------------------------------------------------------------------------------------------