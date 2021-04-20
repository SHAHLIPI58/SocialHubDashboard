const axios = require("axios")
var moment = require("moment");
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var cors = require('cors');
var bodyParser = require('body-parser');
var mysqlcontroller = require('./Controller/mysqlcontroller');
var connection = mysqlcontroller

//Mongo Client 
var mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

const { MongoClient1 } = require('mongodb');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'ratingMongo';
const client = new MongoClient(url);


// use it before all route definitions
app.use(cors({origin: 'http://localhost:3000'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use('/login', (req, res) => {
  //select query to authenticate user
  var uname = req.body.username
  var psw = req.body.password
  //console.log(uname +""+connection.config)
  connection.query('SELECT * FROM `user` WHERE `username` = ? AND `password` = ?  ',[uname,psw],
  function(err, results, fields) {
     // console.log("results..."+results.body)
      if(err ){
        console.log("error")
        res.status(404).json({err:"404 error"});
        //res.status(401).send("Unauthorized");  
      }else if (JSON.stringify(results).length > 2){
          console.log("result password" +results[0].location)
          res.send({
            token: 'test123',
            location: results[0].location,
            latitude: results[0].latitude,
            longitude: results[0].longitude
          }); 
      }else{
        res.status(401).send("Unauthorized");
      }
      // if(results.length != 0){
      //     res.send({
      //       token: 'test123'
      //     }); 
      // }
  
  });

  // res.send({
  //   token: 'test123'
  // });
  // res.status(401).send("Unauthorized");
});


app.use('/signup', (req, res) => {
  //select query to authenticate user
  var uname = req.body.username
  var psw = req.body.password
  var lct = req.body.location
  var long = req.body.longitude;
  var lat = req.body.latitude;
 
  console.log("longitude = ",long,"latitude =",lat)
  connection.query('SELECT * FROM `user` WHERE `username` = ?',[uname],
                  function(err, results, fields) {

                    if(err ){
                      console.log("error")
                      res.status(404).json({err:"404 error"}); 
                    }else if(JSON.stringify(results).length > 2){
                      //User Exists
                      res.status(200).send("authorized..");

                    }else{
                      //insert query
                      var post = {username : uname, password : psw,location:lct,longitude:long,latitude:lat };
                      var q = connection.query('insert into `user` set ?', post, function (error, results, fields) {
                        if(error) throw error;
                      })
                      //console.log(q.sql)
                      // res.send({
                      //   message: 'success'
                      // }); 
                      res.status(201).send("created new user");

                    }
                    
                  });
  //res.status(401).send("Unauthorized..");
})

// Different API Calls Here
app.post('/search',(req,res)=>{
  var location = req.body.location;
  var categories = req.body.categories;
  var radius =  req.body.radius;
  var price = req.body.price;

  console.log(radius);
  console.log(categories);
  console.log(price);

  const bearerToken = "eK56-qSrTKEY9waNsUaskzk7kvBlEKGMLnC8LQNDm4OCnybU67TtOGFYV8vqRLK9ejcIbMqARBXfYhV9JpUeAbCq90w8WA6vafzj6i0IeoflC7bLDG3UzczPZ7VWYHYx";
  const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}` 
    },
    params: {location: location,
             limit:9,
             categories: categories,
             radius: radius,
             price: price
            }
  };

  axios.get( 
    'https://api.yelp.com/v3/businesses/search',
    config
  ).then(response => {
      console.log("api call returned: ", response.data);
      res.send(response.data);
  })
  .catch(error => {
    console.log(error);
    res.status(500).send(error);
  });

})

app.post('/ratings',(req,res)=>{
     
  
     var username = req.body.userid
     var itemid = req.body.itemid
     var itemname = req.body.itemname
     var rating = parseInt(req.body.rating)
     var category1 = req.body.category
     var category = category1.charAt(0).toUpperCase()+category1.slice(1)
     var pricelevel = req.body.pricelevel
     var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
     console.log(today)
     console.log("mongodb body request testing...",username, itemid, itemname, rating, category, pricelevel)

      //insert function
      const insertDocuments = function(db, callback) {
            // Get the documents collection
          const collection = db.collection('documents');
          // Insert one documents or for more documents insertMany() instead of insert()
          collection.insertOne({ username: username, itemid : itemid, itemname: itemname, rating:rating,category:category,pricelevel:pricelevel,Date:new Date(today)}, 
              function(err, result) {
            console.log('Inserted 44 documents into the collection');
            callback(result);
          });
      };



      // Use connect method to connect to the server
      const mongoConnection = client.connect(function(err) {

      console.log('Mongo Connected successfully to server ...');

      const db = client.db(dbName);
      insertDocuments(db, function() {
      // client.close();
      })


      });
      res.send("data ratings....")
});







app.post('/getfindCountStartanalysisData',(req,res)=>{
  var username = req.body.username
  
//   userratings = {
//     ratingObject: []
// };

var finalres ={}
  async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017/ratingMongo";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Print the 10 cheapest suburbs in the Sydney, Australia market
        await printCountByStart(client, username);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the cheapest suburbs for a given market
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} country The country for the given market
 * @param {String} market The market you want to search
 * @param {number} maxNumberToPrint The maximum number of suburbs to print
 */
async function printCountByStart(client, username) {
    const pipeline = [
      { '$match': { username: username} },
      { '$group': { '_id': "$rating", 'count': { '$sum': 1 } } },
      { '$sort' :{rating:1}}
     
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

  
  
    var resfinal ={}
    await aggCursor.forEach(ratingListing => {
      
      var item = ratingListing;
      // userratings.ratingObject.push({
      
      //   [`${item._id}star`]:item.count
      // });

      resfinal[`${item._id}STAR`] = item.count

        console.log(`${ratingListing._id}: ${ratingListing.count}`);
        //console.log(userratings)
        // finalres = {
        //   label :`${item._id}star`,
        //   value :item.count
        // }
        // let stringoutput = `${item._id}star`
        // finalres[stringoutput] = item.count
        
      
    });

   
   

  
    console.log("nodejs", Object.keys(resfinal))
    res.send(resfinal)
}




})


app.post('/getfindCountCategorySanalysisData',(req,res)=>{
   var username = req.body.username
  // var uname = req.body.username
   console.log("username in getfindCountCategorySanalysisData",req.body.data)
   usercategoryratings = {
    categoryratingObject: []
};

  async function main() {

   
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017/ratingMongo";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        

        // Make the appropriate DB calls

        
        await printCountByCategory(client, username);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the cheapest suburbs for a given market
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} username 

 */
async function printCountByCategory(client, username) {
    const pipeline = [
      { '$match': { username: username} },
      { '$group': { '_id': "$category", 'count': { '$sum': 1 } } }
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

  
  

    await aggCursor.forEach(categoryratingListing => {

      var item = categoryratingListing;
      usercategoryratings.categoryratingObject.push({
        label :`${item._id}`,
        value :item.count
      });
        //console.log(`${ratingListing._id}: ${ratingListing.count}`);
        //console.log(userratings)
    });
    console.log(usercategoryratings.categoryratingObject)
    res.send(usercategoryratings.categoryratingObject)
}




})



app.post('/getfindCountPriceanalysisData',(req,res)=>{
  var username = req.body.username

 var finalres ={}
  async function main() {
  
    const uri = "mongodb://localhost:27017/ratingMongo";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls

        // Print the 10 cheapest suburbs in the Sydney, Australia market
        await printCountByPrice(client, username);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the cheapest suburbs for a given market
 * @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
 * @param {String} pricelevel
 */
async function printCountByPrice(client, username) {
    const pipeline = [
      { '$match': { username: username} },
      { '$group': { '_id': "$pricelevel", 'count': { '$sum': 1 } } },
     
    ];

    // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
    const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

  
  
    var resfinal ={}
    await aggCursor.forEach(priceListing => {
      
      var item = priceListing;
    

      resfinal[`${item._id}`] = item.count

      console.log(`${priceListing._id}: ${priceListing.count}`);
        
      
    });

    console.log("nodejs", Object.keys(resfinal))
    res.send(resfinal)
}




})



app.post('/getfindCountFavCatanalysisData',(req,res)=>{
  var username = req.body.username
  console.log("username in getfindCountCategorySanalysisData",req.body.data)
  usercategoryratingsfav = {
   categoryratingObjectfav: []
};

 async function main() {

   const uri = "mongodb://localhost:27017/ratingMongo";

 
   const client = new MongoClient(uri);

   try {
       // Connect to the MongoDB cluster
       await client.connect();
       

       // Make the appropriate DB calls

       
       await printCountByFavCategory(client, username);

   } finally {
       // Close the connection to the MongoDB cluster
       await client.close();
   }
}

main().catch(console.error);

/**
* Print the cheapest suburbs for a given market
* @param {MongoClient} client A MongoClient that is connected to a cluster with the sample_airbnb database
* @param {String} username 

*/
async function printCountByFavCategory(client, username) {
   const pipeline = [
     { '$match': { username: username,  rating:{$gt:3}} },
     { '$group': { '_id': "$category", 'count': { '$sum': 1 } } },
     {'$limit' : 3},
     { '$sort' :{count:-1}}
     
   ];

   // See https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html#aggregate for the aggregate() docs
   const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

 
 

   await aggCursor.forEach(categoryratingListingfav => {

     var item = categoryratingListingfav;
     usercategoryratingsfav.categoryratingObjectfav.push({
       label :`${item._id}`,
       value :item.count
     });
       //console.log(`${ratingListing._id}: ${ratingListing.count}`);
       //console.log(userratings)
   });
   console.log(usercategoryratingsfav.categoryratingObjectfav)
   res.send(usercategoryratingsfav.categoryratingObjectfav)
}




})



app.get('/ratingMongo',(req,res)=>{


  async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const uri = "mongodb://localhost:27017/ratingMongo";

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await listDatabases(client);

    } catch (e) {
        console.error(e);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

res.send("testing mongo database lisr...")



})




app.get('/kkkgetfindCountStartanalysisData_old',(req,res)=>{

  
  //insert function
  const findCountStart =  function(db, callback) {
    // Get the documents collection
  const collection = db.collection('documents');
  // // Insert one documents or for more documents insertMany() instead of insert()
  // collection.insertOne({ username: username, itemid : itemid, itemname: itemname, rating:rating,category:category,pricelevel:pricelevel,Date:new Date(today)}, 
  //     function(err, result) {
  //   console.log('Inserted 44 documents into the collection');
  //   callback(result);
  // });

  //findCountStart
  const aggCursor = collection.aggregate([ { '$match': { username: "Lipi"} },
                          { '$group': { '_id': "$rating", 'count': { '$sum': 1 } } }],
                   function(err,result){ 
                     console.log(result.toArray())
                     
                    callback(result);
                   })

};


// Use connect method to connect to the server
const mongoConnection = client.connect(function(err) {

  console.log('Mongo Connected successfully to server ...aggregate function');

  const db = client.db(dbName);
   findCountStart(db, function() {
  // client.close();
  })


  });
  res.send("rating aggregation....")




});


app.get('/buy', (req, res) => {
    res.send(req.query.val+" 100");
});

app.get('/bhijai', (req, res) => {
  res.send("lipi")
});






console.log(moment().format());
app.listen(port);
