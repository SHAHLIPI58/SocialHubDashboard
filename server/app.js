const axios = require("axios")
var moment = require("moment");
var express = require('express');
var app = express();
var port = process.env.PORT || 3001;
var cors = require('cors');
var bodyParser = require('body-parser');
var mysqlcontroller = require('./Controller/mysqlcontroller');
var connection = mysqlcontroller


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
            location: results[0].location
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
                      var post = {username : uname, password : psw,location:lct };
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
  const bearerToken = "eK56-qSrTKEY9waNsUaskzk7kvBlEKGMLnC8LQNDm4OCnybU67TtOGFYV8vqRLK9ejcIbMqARBXfYhV9JpUeAbCq90w8WA6vafzj6i0IeoflC7bLDG3UzczPZ7VWYHYx";
  const config = {
    headers: {
        Authorization: `Bearer ${bearerToken}` 
    },
    params: {location: location}
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

  app.get('/buy', (req, res) => {
    res.send(req.query.val+" 100");
});


console.log(moment().format());
app.listen(port);
