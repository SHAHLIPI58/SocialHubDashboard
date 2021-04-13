 var mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
// // Connection URL
// const url = 'mongodb://localhost:27017';

// // Database Name
// const dbName = 'testingMongo';
// const client = new MongoClient(url);

// // //insert function
// // const insertDocuments = function(db, callback) {
// //     // Get the documents collection
// //     const collection = db.collection('documents');
// //     // Insert some documents
// //     collection.insertMany([{ a: 41 }, { a: 51 }, { a: 61 }], 
// //         function(err, result) {
// //       console.log('Inserted 3 documents into the collection');
// //       callback(result);
// //     });
// //   };

// // Use connect method to connect to the server
// const mongoConnection = client.connect(function(err) {
  
//   console.log('Mongo Connected successfully to server');

//   const db = client.db(dbName);
// //   insertDocuments(db, function() {
// //     client.close();
// //   })

  
// });




//   //export
//   module.exports = mongoConnection;


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