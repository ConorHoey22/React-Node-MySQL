
// expose this function to our app using module.exports
module.exports = function() {



    var mysql = require('mysql');  

    var con = mysql.createConnection({  
    host: "localhost",  
    user: "root",  
    password: "",  
    database: "socialapp"  
    });  
  
    var passport = require('passport');
    
    // load all the things we need
    var LocalStrategy   = require('passport-local').Strategy;
    

    
        // =========================================================================
        // LOCAL SIGNUP ============================================================
        // =========================================================================
        // we are using named strategies since we have one for login and one for signup
        // by default, if there was no name, it would just be called 'local'
    
        passport.use('local-signup', new LocalStrategy({
    
            // by default, local strategy uses username and password, we will override with email
            //nameField : 'usernane',
            usernameField : 'username',
            passwordField : 'password',
            //locationField : 'location',
    
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
          console.log("This is twas");
    
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
          con.query("select * from users where username = '"+username+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                 if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                } else {
    
                    // if there is no user with that email
                    // create the user
                    var user = new Object();
    
                   // newUserMysql.username = username;
                    user.username = username;
                    user.password = password; // use the generateHash function in our user model
    
    
                var insertQuery = "INSERT INTO users (username, password) values (" + username +"','"+ password +"')";
                        console.log(insertQuery);
                    con.query(insertQuery,function(err,res){

                      //  console.log(res.insertId)
               //    newUserMysql.id = res.insertId;
    
                    return done(null, user);
                    }); 
                }   
            });
        }));
    

        // =========================================================================
        // passport session setup ==================================================
        // =========================================================================
        // required for persistent login sessions
        // passport needs ability to serialize and unserialize users out of session
    
        // used to serialize the user for the session
        passport.serializeUser(function(user, done) {
            done(null, user.id);
        });
    
        // used to deserialize the user
        passport.deserializeUser(function(id, done) {
            con.query("select * from users where id = "+id,function(err,rows){  
                done(err, rows[0]);
            });
        });
    





     };
    
    
    
    
    
    
    
    
    