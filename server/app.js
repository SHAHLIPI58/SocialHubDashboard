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

app.use(express.json());

app.use('/login', (req, res) => {

    var uname = req.body.username
    var psw = req.body.password

    connection.query('SELECT * FROM `user` WHERE `username` = ? AND `password` = ?  ',[uname,psw],
    function(err, results, fields) {
        if(err ){
          console.log("error")
          res.status(404).json({err:"404 error"}); 
        }else if (JSON.stringify(results).length > 2){
            res.send({
              token: 'test123',
              location: results[0].location,
              latitude: results[0].latitude,
              longitude: results[0].longitude
            }); 
        }else{
          res.status(401).send("Unauthorized");
        }
      });
});


app.use('/signup', (req, res) => {
  var uname = req.body.username
  var psw = req.body.password
  var lct = req.body.location
  var long = req.body.longitude;
  var lat = req.body.latitude;
 
  connection.query('SELECT * FROM `user` WHERE `username` = ?',[uname],
                  function(err, results, fields) {

                    if(err ){
                      console.log("error")
                      res.status(404).json({err:"404 error"}); 
                    }else if(JSON.stringify(results).length > 2){
                      //User Already Exists
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

})

app.post('/userprofile',(req,res)=>{

    var uname = req.body.username

    connection.query('SELECT * FROM `user` WHERE `username` = ? ',[uname],
    function(err, results, fields) {
        if(err ){
          console.log("error")
          res.status(404).json({err:"404 error"});
        }else if (JSON.stringify(results).length > 2){
            res.send({
              username: results[0].username,
              location: results[0].location,
              
            }); 
        }else{
          res.status(401).send("Unauthorized");
        }
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


app.post('/search',(req,res)=>{
  var location = req.body.location;
  var categories = req.body.categories;
  var radius =  req.body.radius * 1609;
  var price = req.body.price;
  var term = req.body.term;
  var open_at = Math.floor(Date.now()/1000)
  const bearerToken = "helGUeqNlXHSd-EZ2XLiQrMpQ25vAm2TNhsiJ5K2cP9XXaAeOw_Q7NvhG1TWLRvggiFQQOqK_8twVcxOqpcxpzdPTYN6Lad9l9Gu1etR4u6FO6ke7gHN6CaISkmHYHYx";
  const bearerToken2 = "ITrF-x3KyQGhcwu_KJ1UuNel0z3TmiC3icaP-2511-fMzR0eSap1qllS4OsPheTsLWYkr_T70kY1aInoIKHRB4ehHF3I7dGasIP9ZkkAccLLxewzaEoaJwKakH6EYHYx";
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
            }
  };

  axios.get( 
    'https://api.yelp.com/v3/businesses/search',
    config
  ).then(response => {
      res.send(response.data);
  })
  .catch(error => {
    res.status(500).send(error);
  });

})


app.post('/otherUsersReviews',(req,res)=>{
  let bussinessId = req.body.resId
  const bearerToken ="helGUeqNlXHSd-EZ2XLiQrMpQ25vAm2TNhsiJ5K2cP9XXaAeOw_Q7NvhG1TWLRvggiFQQOqK_8twVcxOqpcxpzdPTYN6Lad9l9Gu1etR4u6FO6ke7gHN6CaISkmHYHYx";  
  const bearerToken2 = "ITrF-x3KyQGhcwu_KJ1UuNel0z3TmiC3icaP-2511-fMzR0eSap1qllS4OsPheTsLWYkr_T70kY1aInoIKHRB4ehHF3I7dGasIP9ZkkAccLLxewzaEoaJwKakH6EYHYx";
  const bearerToken1="eK56-qSrTKEY9waNsUaskzk7kvBlEKGMLnC8LQNDm4OCnybU67TtOGFYV8vqRLK9ejcIbMqARBXfYhV9JpUeAbCq90w8WA6vafzj6i0IeoflC7bLDG3UzczPZ7VWYHYx";
  const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}` 
    },
    params: {locale :'en_US' 
            }
  };

  axios.get('https://api.yelp.com/v3/businesses/'+`${bussinessId}`+'/reviews',
    config
  ).then(response => {
      res.send(response.data.reviews);
  })
  .catch(error => {
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


     var pricelevel1 = req.body.pricelevel

     var pricelevel = "Any"
     const priceLevelList =['$','$$','$$$','$$$$']
     if(priceLevelList.includes(pricelevel1)){
         pricelevel = pricelevel1
     }

     var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
     const insertDocuments = function(db, callback) {
            // Get the documents collection
          const collection = db.collection('documents');
          // Insert one documents or for more documents insertMany() instead of insert()
          collection.insertOne({ username: username, itemid : itemid, itemname: itemname, rating:rating,category:category,pricelevel:pricelevel,Date:new Date(today)}, 
              function(err, result) {
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
  clientRecombee.send(new rqs.RecommendItemsToUser(username, 6,{returnProperties: true , 
       filter : query
   }), (err, recommendations) => {
     if(err ) {res.status(404).json({err:"404 error"});}
    res.send(recommendations.recomms)
  });
  
});



app.post('/getfindCountStartanalysisData',(req,res)=>{
  var username = req.body.username
  var visulizationfilter = parseInt(req.body.visulizationfilter);
  var finalres ={}
  async function main() {
    const uri = "mongodb://localhost:27017/ratingMongo";
    const client = new MongoClient(uri);
    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await printCountByStart(client, username,visulizationfilter);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function printCountByStart(client, username,visulizationfilter) {
  
      var today = moment(new Date()).format('YYYY-MM-DD[T00:00:00.000Z]');
      var d = new Date()
      d.setDate(d.getDate())
      if(visulizationfilter === 1){
        d.setDate(d.getDate()-1);
      }else if(visulizationfilter === 7){
        d.setDate(d.getDate()-7);
      }else if(visulizationfilter === 365){
        d.setDate(d.getDate()-365);
      }
      
      var filter_span = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
      const pipeline = [
          { '$match': { username: username, "Date":{"$gt": (new Date(filter_span))}} },
          { '$group': { '_id': "$rating", 'count': { '$sum': 1 } } },
          { '$sort' :{_id:1}}
        
        ];

      const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

      var resfinal ={}
      await aggCursor.forEach(ratingListing => {
        var item = ratingListing;
        resfinal[`${item._id}STAR`] = item.count    
      });

        res.send(resfinal)
    }

})


app.post('/getfindCountCategorySanalysisData',(req,res)=>{
   var username = req.body.username
   var visulizationfilter = parseInt(req.body.visulizationfilter);
   usercategoryratings = {
    categoryratingObject: []
};

  async function main() {
    const uri = "mongodb://localhost:27017/ratingMongo";
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();
        await printCountByCategory(client, username,visulizationfilter);

    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

async function printCountByCategory(client, username,visulizationfilter) {

    var d = new Date()
    d.setDate(d.getDate())
    if(visulizationfilter === 1){
      d.setDate(d.getDate()-1);
    }else if(visulizationfilter === 7){
      d.setDate(d.getDate()-7);
    }else if(visulizationfilter === 365){
      d.setDate(d.getDate()-365);
    }
    
    var filter_span = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]');
    
    const pipeline = [
      { '$match': { username: username,"Date":{"$gt": (new Date(filter_span))}} },
      { '$group': { '_id': "$category", 'count': { '$sum': 1 } } }
    ];

    const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);
    await aggCursor.forEach(categoryratingListing => {

      var item = categoryratingListing;
      usercategoryratings.categoryratingObject.push({
        label :`${item._id}`,
        value :item.count
      });
    });
    res.send(usercategoryratings.categoryratingObject)
}

})



app.post('/getfindCountPriceanalysisData',(req,res)=>{
      var username = req.body.username
      var visulizationfilter = parseInt(req.body.visulizationfilter);
      var finalres ={}
      async function main() {
      const uri = "mongodb://localhost:27017/ratingMongo";
      const client = new MongoClient(uri);

        try {
            // Connect to the MongoDB cluster
            await client.connect();
            await printCountByPrice(client, username,visulizationfilter);

        } finally {
            // Close the connection to the MongoDB cluster
            await client.close();
        }
    }

    main().catch(console.error);
    async function printCountByPrice(client, username,visulizationfilter) {

        var d = new Date()
        d.setDate(d.getDate())
        if(visulizationfilter === 1){
          d.setDate(d.getDate()-1);
        }else if(visulizationfilter === 7){
          d.setDate(d.getDate()-7);
        }else if(visulizationfilter === 365){
          d.setDate(d.getDate()-365);
        }
        
        var filter_span = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]')
          const pipeline = [
            { '$match': { username: username,"Date":{"$gt": (new Date(filter_span)) }} },
            { '$group': { '_id': "$pricelevel", 'count': { '$sum': 1 } } },
            { '$sort' :{_id:1}}
          
          ];

          const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);
          var resfinal ={}
          await aggCursor.forEach(priceListing => {
            var item = priceListing;
            resfinal[`${item._id}`] = item.count 
          });
          res.send(resfinal)
      }

})



app.post('/getfindCountFavCatanalysisData',(req,res)=>{
      var username = req.body.username
      var visulizationfilter = parseInt(req.body.visulizationfilter);
      usercategoryratingsfav = {
      categoryratingObjectfav: []
      };

    async function main() {

      const uri = "mongodb://localhost:27017/ratingMongo";
      const client = new MongoClient(uri);

      try {
          // Connect to the MongoDB cluster
          await client.connect();
          await printCountByFavCategory(client, username,visulizationfilter);

      } finally {
          // Close the connection to the MongoDB cluster
          await client.close();
      }
    }

    main().catch(console.error);

    async function printCountByFavCategory(client, username,visulizationfilter) {

          var d = new Date()
          d.setDate(d.getDate())
          if(visulizationfilter === 1){
            d.setDate(d.getDate()-1);
          }else if(visulizationfilter === 7){
            d.setDate(d.getDate()-7);
          }else if(visulizationfilter === 365){
            d.setDate(d.getDate()-365);
          }
          
          var filter_span = moment(d).format('YYYY-MM-DD[T00:00:00.000Z]')
          const pipeline = [
            { '$match': { username: username,  rating:{$gt:3}, "Date":{"$gt": (new Date(filter_span)) }} },
            { '$group': { '_id': "$category", 'count': { '$sum': 1 } } },
            {'$limit' : 3},
            { '$sort' :{count:-1}}
            
          ];

          const aggCursor = client.db("ratingMongo").collection("documents").aggregate(pipeline);

          await aggCursor.forEach(categoryratingListingfav => {

            var item = categoryratingListingfav;
            usercategoryratingsfav.categoryratingObjectfav.push({
              label :`${item._id}`,
              value :item.count
            });
              
          });
          res.send(usercategoryratingsfav.categoryratingObjectfav)
      }


})



app.post('/ratingHistory',(req,res)=>{
  var username = req.body.username
  
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("ratingMongo");
    var query = { username:username};
    var sort = {Date:-1,_id:-1};
    dbo.collection("documents").find(query).sort(sort).toArray(function(err, result) {
      if (err) throw err;
      res.send(result)
      
      db.close();
    });
  });
  
})


app.get('/ratingMongo',(req,res)=>{


  async function main() {
    
    const uri = "mongodb://localhost:27017/ratingMongo";
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

  async function listDatabases(client) {
      databasesList = await client.db().admin().listDatabases();
      databasesList.databases.forEach(db => console.log(` - ${db.name}`));
  };

  res.send("testing mongo database lisr...")

  })




app.listen(port);
