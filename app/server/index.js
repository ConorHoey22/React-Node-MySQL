const express = require('express');
const bodyParser = require('body-parser');
const pino = require('express-pino-logger')();


const app = express();
app.use(bodyParser.json())



var flash             = require('connect-flash');
var crypto            = require('crypto');
var passport          = require('passport');
var LocalStrategy     = require('passport-local').Strategy;
var sess              = require('express-session');
var Store             = require('express-session').Store;
var BetterMemoryStore = require('session-memory-store')(sess);
const bcrypt = require('bcrypt');


var mysql = require('mysql');  

  var con = mysql.createConnection({  
  host: "localhost",  
  user: "root",  
  password: "",  
  database: "socialapp"  
  });  



  var session = require('express-session');
  app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
  }))

  con.connect(function(err) {  
  if (err) {
    console.log("Not Connected to the database");
  }  
  else{
    console.log("Connected to the database!"); 
  }
  

  var store = new BetterMemoryStore({ expires: 60 * 60 * 1000, debug: true });
  app.use(sess({
     name: 'JSESSION',
     secret: 'MYSECRETISVERYSECRET',
     store:  store,
     resave: true,
     saveUninitialized: true
 }));






app.use(flash());
app.use(passport.initialize());
app.use(passport.session());




app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);

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
      //alert(password); //shows hashed password

      //>>query logic should go here.

      con.query(`INSERT INTO users SET username = ? , email = ? , password = ? , location = ?`, [username , email, password, location] ,  function(err, res) {
  
        if (err) throw err;
    
          console.log(username  + " - Successful register" );
      
        });
  });





    //Insert not working
  //MySQL INSERT QUERY - Retrieves values from RegistrationComponent.js

  //MySQL INSERT QUERY - Retrieves values from RegistrationComponent.js
 

    //redirect function 

  });


  //-----------------------------------------



//

passport.use('local', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true //passback entire req to call back
  } , function (req, username, password, done){
        if(!username || !password ) { return done(null, false, req.flash('message','All fields are required.')); }
        var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';
        connection.query("select * from users where username = ?", [username], function(err, rows){
            console.log(err); console.log(rows);
          if (err) return done(req.flash('message',err));
          if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }
          salt = salt+''+password;
          var encPassword = crypto.createHash('sha1').update(salt).digest('hex');
          var dbPassword  = rows[0].password;
          if(!(dbPassword == encPassword)){
              return done(null, false, req.flash('message','Invalid username or password.'));
           }
          return done(null, rows[0]);
        });
      }
  ));


  passport.serializeUser(function(user, done){
    done(null, user.id);
});
passport.deserializeUser(function(id, done){
    connection.query("select * from users where id = "+ id, function (err, rows){
        done(err, rows[0]);
    });
});


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
//router.get('/', isAuthenticated, function(req, res, next) { ... }
//function isAuthenticated(req, res, next) {
  //  if (req.isAuthenticated())
    //  return next();
   // res.redirect('/signin');
  //}


 // After the user is successfully logged in will
 // be redirected to /users route. 
 //User can view personal data from the database
 // and also a logout link is provided so user can logout.


}); //DB Connection

app.listen(3001, () =>
  console.log('Express server is running on localhost:3001')
);