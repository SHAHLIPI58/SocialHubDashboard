var mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// This is a global variable we'll use for handing the MongoDB client
var mongodb;

// Connection URL
var url = 'mongodb://localhost:27017/testingMongo';

console.log("Initiating mongo connection");

// Create the database connection
MongoClient.connect(url, {  
    // poolSize: 10
    // other options can go here
  },function(err, db) {
      
      mongodb=db;
      console.log("Mongodb client intitialized at => ", mongodb);
      }
  );

  //export 
  module.exports = mongodb;