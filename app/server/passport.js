
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
    
            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
          con.query("select * from users where username = '"+username+"'",function(err,rows){
                console.log(rows);
                console.log("above row object");
                if (err)
                    return done(err);
                 if (rows.length) {
                     console.log("This username is already taken")
                    return done(null, false, err ,req.flash('signupMessage', 'That username is already taken.'));
                    
                } else {
    
                    // if there is no user with that email
                    // create the user
                    var newUserMysql = new Object();
    
                   // newUserMysql.username = username;
                    newUserMysql.username = username;
                    newUserMysql.password = password; // use the generateHash function in our user model
        
    
                var insertQuery = "INSERT INTO users (username, password) values ('" + username +"','"+ password +"')";
                        console.log(insertQuery);
            
                        con.query(insertQuery,function(err,rows){

                   newUserMysql.id = rows.insertId;
    
                    return done(null, newUserMysql);
                    }); 
                }   
            });
        }));
    

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'username',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, username, password, done) { // callback with email and password from our form

         connection.query("SELECT * FROM users WHERE username = '" + username + "'",function(err,rows){
			if (err)
                return done(err);
			 if (!rows.length) {
                return done(null, false, err,req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
            } 
			
			// if the user is found but the password is wrong
            if (!( rows[0].password == password))
          
                return done(null, false, err,req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
			
            // all is well, return successful user
            console.log("Successful Login - " + username)
            return done(null, rows[0]);			
		
		});
		


    }));

};


    
    
    
    
    
    
    
    
    
    