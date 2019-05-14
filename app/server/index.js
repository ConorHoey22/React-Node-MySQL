const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();

var sess              = require('express-session');
//var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);



const app = express();
app.use(bodyParser.json())

var flash             = require('connect-flash');
var crypto            = require('crypto');
var cors = require('cors');
const cookieParser = require('cookie-parser');
var passport = require('passport');
var config = require('./passport.js');
var passport_config = config(passport);

var LocalStrategy     = require('passport-local').Strategy;


const bcrypt = require('bcrypt');



app.use(flash());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

var mysql = require('mysql');  

  var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "",  
  database: "socialapp"  
  });  


  con.connect(function(err) {  
  if (err) {
    console.log("Not Connected to the database");
  }  
  else{
    console.log("Connected to the database!"); 
  }
  

  var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });

    

    app.use(sess({
      secret: 'keyboard cat',
      resave: false,
      saveUninitialized: true,
      cookie: { secure: true }
    }))



 app.use(passport.initialize());
app.use(passport.session());


  app.use(cors());

  app.use(pino);


  app.use(cookieParser());


  app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });




    //-----API POST --- CreateAccount ------
    app.post('/api/createAccount', function(req, res) {
      var username = req.body.username;
      var email = req.body.email;
      var password = req.body.password;
      var location = req.body.location;

      bcrypt.hash(password, 10, function(err, hash){
        if(err) console.log(err);
        password = hash;
    

        con.query(`INSERT INTO users SET username = ? , email = ? , password = ? , location = ?`, [username , email, password, location] ,  function(err, res) {
    
          if (err) throw err;
      
            console.log(username  + " - Successful register" );
        
          });
    });



      //redirect function 

    });


    //-----------------------------------------

  app.get('/signin', function(req, res){
      res.render('login/index',{'message' :req.flash('message')});
    });



    //POST 


    app.post("/signin", passport.authenticate('local', {
      successRedirect: '/profile',
      failureRedirect: '/signin',
      failureFlash: true
  }), function(req, res, info){
      res.render('login/index',{'message' :req.flash('message')});
  });

  //isAuthenticated Example
  //router.get('/', isAuthenticated, function(req, res, next) {  }
  //function isAuthenticated(req, res, next) {
    //  if (req.isAuthenticated())
      //  return next();
      //res.redirect('/signin');
  // }


  // After the user is successfully logged in will
  // be redirected to /users route. 
  //User can view personal data from the database
  // and also a logout link is provided so user can logout.
  

  app.post('/api/signup', passport.authenticate('local-signup'));

  
  app.post('/api/login', passport.authenticate('local-login'));
  
  app.get('/logout', (req, res)=>{
  req.logout();
  return res.json({status:'success'});
  });





  }); //DB Connection

  app.listen(3001, () =>
    console.log('Express server is running on localhost:3001')
  );