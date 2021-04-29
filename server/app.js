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

//Recombee
var recombee = require('recombee-api-client');
var rqs = recombee.requests;
var clientRecombee = new recombee.ApiClient('placerec-dev', 'DEJsyJUwbrXVEePuRyEQmfAayorajE6ELWUSU3xIpr1rXuELPQfilPpkTytBANQA');


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
          //console.log("result password" +results[0].location)
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
 
  //console.log("longitude = ",long,"latitude =",lat)
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
                     //recombee comes here after new user creates
                     
                     recombeeUserInfo ={}
                     recombeeUserInfo.username = uname
                     recombeeUserInfo.location = lct
                     recombeeUserInfo.longitude = long
                     recombeeUserInfo.latitude = lat


                     clientRecombee.send(new rqs.SetUserValues(uname, recombeeUserInfo, {
                      // optional parameters:
                      'cascadeCreate': true
                    }));


                      res.status(201).send("created new user");

                    }
                    
                  });
  //res.status(401).send("Unauthorized..");
})

app.post('/userprofile',(req,res)=>{

  var uname = req.body.username

  connection.query('SELECT * FROM `user` WHERE `username` = ? ',[uname],
  function(err, results, fields) {
     // console.log("results..."+results.body)
      if(err ){
        console.log("error")
        res.status(404).json({err:"404 error"});
        //res.status(401).send("Unauthorized");  
      }else if (JSON.stringify(results).length > 2){
          //console.log("result password" +results[0].location)
          res.send({
            username: results[0].username,
            location: results[0].location,
            
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

})


app.post('/setUserPassword',(req,res)=>{

  var psw = req.body.password
  var username = req.body.username

  connection.query('UPDATE `user` SET `password` = ? WHERE `username` = ?',
                   [psw,username], function (error, results, fields) {
    if (error) {
      res.status(404).json({err:"404 error"});
    }else if (JSON.stringify(results).length > 2){
      res.status(200).json({success:"OK"});
    }else{
      res.status(401).send("Unauthorized");
    }
   
  })



})
app.get('/testRecombee',(req,res)=>{

  //  recombeeUserInfo ={}
  //  recombeeUserInfo.username = "uname"
  //  recombeeUserInfo.location = "lct"
  //  recombeeUserInfo.longitude = "long"
  //  recombeeUserInfo.latitude = "lat"

  //  console.log(recombeeUserInfo)

})

// Different API Calls Here
app.post('/search',(req,res)=>{
  var location = req.body.location;
  var categories = req.body.categories;
  var radius =  req.body.radius * 1609;
  var price = req.body.price;
  var term = req.body.term;
  var open_at = Math.floor(Date.now()/1000)

  // console.log(radius);
  // console.log(categories);
  // console.log(price);
 const bearerToken2 = "helGUeqNlXHSd-EZ2XLiQrMpQ25vAm2TNhsiJ5K2cP9XXaAeOw_Q7NvhG1TWLRvggiFQQOqK_8twVcxOqpcxpzdPTYN6Lad9l9Gu1etR4u6FO6ke7gHN6CaISkmHYHYx";
  const bearerToken = "ITrF-x3KyQGhcwu_KJ1UuNel0z3TmiC3icaP-2511-fMzR0eSap1qllS4OsPheTsLWYkr_T70kY1aInoIKHRB4ehHF3I7dGasIP9ZkkAccLLxewzaEoaJwKakH6EYHYx";
  const bearerToken1="eK56-qSrTKEY9waNsUaskzk7kvBlEKGMLnC8LQNDm4OCnybU67TtOGFYV8vqRLK9ejcIbMqARBXfYhV9JpUeAbCq90w8WA6vafzj6i0IeoflC7bLDG3UzczPZ7VWYHYx";
  const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}` 
    },
    params: {location: location,
             limit:18,
             categories: categories,
             radius: radius,
             price: price,
             term:term,
             open_at:open_at
             //location: Chicago,60616
             //terms for restaurant : "Chinese Kitchen","indian","italian food","american food"
            //  term:"cake","chipotle","pizza" 
            
            //location: McKinney,75070
            //term for resaurant: "thai food"
            
            }
  };

  axios.get( 
    'https://api.yelp.com/v3/businesses/search',
    config
  ).then(response => {
      //console.log("api call returned: ", response.data);
      res.send(response.data);
  })
  .catch(error => {
    //console.log(error);
    res.status(500).send(error);
  });

})


// Different API Calls otherUsersReviews
app.post('/otherUsersReviews',(req,res)=>{
  let bussinessId = req.body.resId
  //console.log("bussinessId :otherUsersReviews",bussinessId)
  const bearerToken2 ="helGUeqNlXHSd-EZ2XLiQrMpQ25vAm2TNhsiJ5K2cP9XXaAeOw_Q7NvhG1TWLRvggiFQQOqK_8twVcxOqpcxpzdPTYN6Lad9l9Gu1etR4u6FO6ke7gHN6CaISkmHYHYx";  
  const bearerToken = "ITrF-x3KyQGhcwu_KJ1UuNel0z3TmiC3icaP-2511-fMzR0eSap1qllS4OsPheTsLWYkr_T70kY1aInoIKHRB4ehHF3I7dGasIP9ZkkAccLLxewzaEoaJwKakH6EYHYx";
  const bearerToken1="eK56-qSrTKEY9waNsUaskzk7kvBlEKGMLnC8LQNDm4OCnybU67TtOGFYV8vqRLK9ejcIbMqARBXfYhV9JpUeAbCq90w8WA6vafzj6i0IeoflC7bLDG3UzczPZ7VWYHYx";
  const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}` 
    },
    params: {locale :'en_US'
             //location: Chicago,60616
             //terms for restaurant : "Chinese Kitchen","indian","italian food","american food"
            //  term:"cake","chipotle","pizza" 
            
            //location: McKinney,75070
            //term for resaurant: "thai food"
            
            }
  };

  axios.get('https://api.yelp.com/v3/businesses/'+`${bussinessId}`+'/reviews',
    config
  ).then(response => {
      //console.log("api call returned otherusers Reviews: ", response.data);
      res.send(response.data.reviews);
  })
  .catch(error => {
   //console.log(error);
    res.status(500).send(error);
  });

})

app.post('/ratings',(req,res)=>{
     
  
     var username = req.body.userid
     var itemid = req.body.itemid
     var itemname = req.body.itemname
     var rating = parseInt(req.body.rating)
    
     var category1 = req.body.category
     var category = "Any"
     const categoriesList =['bars','restaurants','movietheaters','parks','bowling']
     if(categoriesList.includes(category1)){
      var category = category1.charAt(0).toUpperCase()+category1.slice(1)
     }
     

     //var category = category1.charAt(0).toUpperCase()+category1.slice(1)
     //var pricelevel = req.body.pricelevel

     var pricelevel1 = req.body.pricelevel

     var pricelevel = "Any"
     const priceLevelList =['$','$$','$$$','$$$$']
     if(priceLevelList.includes(pricelevel1)){
         pricelevel = pricelevel1
     }

     var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
     //console.log(today)
     //console.log("mongodb body request testing...",username, itemid, itemname, rating, category, pricelevel)

      //insert function
      const insertDocuments = function(db, callback) {
            // Get the documents collection
          const collection = db.collection('documents');
          // Insert one documents or for more documents insertMany() instead of insert()
          collection.insertOne({ username: username, itemid : itemid, itemname: itemname, rating:rating,category:category,pricelevel:pricelevel,Date:new Date(today)}, 
              function(err, result) {
            //console.log('Inserted 44 documents into the collection');
            callback(result);
          });
      };



      // Use connect method to connect to the server
      const mongoConnection = client.connect(function(err) {

      console.log('Mongo Connected successfully to server ...');

      const db = client.db(dbName);
      insertDocuments(db, function() {
        //in callback provide PurchaseView and RatingView of Recombee
        var dateobj = new Date();
        var isoDate = dateobj.toISOString();
      //   clientRecombee.send(new rqs.AddPurchase(username,itemid, {timestamp: isoDate, cascadeCreate: true}),
      //   (err, response) => {
      //     //response.send("AddPurchase added ..")
      //   }
      // );

      clientRecombee.send(new rqs.AddPurchase(username,itemid, {timestamp: isoDate, cascadeCreate: true}),
          (err, response) => {
            //response.send("AddPurchase added ..")
            var recombeeRating = (rating - 3) / 2
            clientRecombee.send(new rqs.AddRating(username,itemid,recombeeRating, {timestamp: isoDate, cascadeCreate: true}),
            (err, response) => {
              //response.send("AddRating added ..")
                }
            );
          }
      );


    // clientRecombee.send(new rqs.AddRating(username,itemid,rating, {timestamp: isoDate, cascadeCreate: true}),
    //     (err, response) => {
    //       //response.send("AddRating added ..")
    //     }
    // );

      // client.close();
      })


      });
      res.send("data ratings....")
});



app.post('/recombeeAddDetailView',(req,res)=>{
  var itemId = req.body.itemid
  var username = req.body.username
  var dateobj = new Date();
  var isoDate = dateobj.toISOString();
  clientRecombee.send(new rqs.AddDetailView(username,itemId, {timestamp: isoDate, cascadeCreate: true}),
    (err, response) => {
      //response.send("recombeeAddDetailView added ..")
    }
);

// console.log("itemId....",itemId)
// console.log("username....",username)
// console.log("isoDate....",isoDate)
  
})


app.post('/recombeeRecommendation',(req,res)=>{
  var username = req.body.username
  var term = req.body.term
  var mainterm = req.body.mainterm
  var price = req.body.price

  var pricelevel =""
  if(price === "1"){
    pricelevel ="$"
  }else if(price == "2"){
    pricelevel ="$$"
  }else if(price == "3"){
    pricelevel ="$$$"
  }else if(price == "4"){
    pricelevel ="$$$$"
  }
  
  
  var lat = req.body.lat
  var longitude = req.body.longitude
  var miles = req.body.miles * 1609
  //new rqs.RecommendItemsToUser(username, 5,{'returnProperties': true, 'filter':'earth_distance(41.8483,-87.6291,41.8483,-87.6291) < 20 * 1609'})
  //{returnProperties: true , filter:"('busId' != null) AND ('distance' <= 20 * 1609) AND ('categories' in {\"pizza\"})"}--> running
  //clientRecombee.send(new rqs.RecommendItemsToUser(username, 5,{returnProperties: true , filter:"('busId' != null)  AND (\"Burgers\" in 'categories')"}) ==> running

  // `('busId' != null)  AND ("${term}" in 'categories')` ==> running

  // filter:`('busId' != null)  AND ("${term}" in 'categories') AND ('price' == "${pricelevel}") AND (earth_distance(${lat},${longitude},number('latitude'),number('longitude')) < ${miles})`  ==> running


  // if(pricelevel === "" && mainterm === "" ){

  // }else if(){

  // }else{

  // }
  let query = `('busId' != null) AND (earth_distance(${lat},${longitude},number('latitude'),number('longitude')) < ${miles})`
  if(price){
    query = query + ` AND ('price' == "${pricelevel}")`
  }

  if(mainterm && term){
    query = query + `AND (("${term}" in 'categories') OR ("${mainterm}" in 'categories'))`
  }else if(mainterm){
    query = query + ` AND ("${mainterm}" in 'categories')`
  }else if(term){
    query = query + ` AND ("${term}" in 'categories')`
  }
  query = `(`+query+`)`
  // filter:`('busId' != null)  AND (("${term}" in 'categories') OR ("${mainterm}" in 'categories')) AND ('price' == "${pricelevel}") AND (earth_distance(${lat},${longitude},number('latitude'),number('longitude')) < ${miles})`
  console.log("query.............",query)
  clientRecombee.send(new rqs.RecommendItemsToUser(username, 6,{returnProperties: true , 
       filter : query
   }), (err, recommendations) => {
     if(err ) {res.status(404).json({err:"404 error"});}
    // console.log(recommendations);
    res.send(recommendations.recomms)
  });
  
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
      { '$sort' :{_id:1}}
     
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

   
   

  
    //console.log("nodejs", Object.keys(resfinal))
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
      { '$sort' :{_id:1}}
     
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



app.post('/ratingHistory',(req,res)=>{
  var username = req.body.username
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ratingMongo");
    /*Return only the documents with the address "Park Lane 38":*/
    var query = { username:username};
    var sort = {Date:-1,_id:-1};
    dbo.collection("documents").find(query).sort(sort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      res.send(result)
      
      db.close();
    });
  });
  


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
