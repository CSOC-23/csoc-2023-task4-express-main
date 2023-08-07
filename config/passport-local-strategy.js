const passport=require('passport');
const LocalStrategy= require('passport-local').Strategy;

const User= require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'
    },
    function(email,password,done){
        //finding user and establishing identity
        User.findOne({email:email})
        .then(user=>{
            if(!user || user.password!=password){
                console.log('inavalid user/password');
                return done(null,false);
            }
            return done(null,user);
        })
        .catch(err=>{
            if(err){
                console.log('error in finding user');
                return done(err); 
            }
        });
    }
));

//serializing the user to decide which key to be kept in cookies
passport.serializeUser(function(user, done){
    return done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            return done(null, user);
        })
        .catch(err => {
            if (err) {
                console.log('Error in finding user', err);
                return done(err);
            }
        });
});

//check if user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if user is signed in pass on the request to next function 
    if(req.isAuthenticated()){
        return next();
     }
      //if user is not signed in
    return res.redirect('/users/login'); 
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending it  to the locals for the views
        res.locals.user=req.user; 
    }
    next(); 
}
  

 module.exports=passport