const passport = require("passport");
const user=require("../models/user")


var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login",{title:"login"})
};

var postLogin = (req, res) => {
  const newuser= new user({
   USERNAME:req.body.username,
   PASSWORD:req.body.password

  })
  
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      console.log(err);
      return res.redirect("/login"); 
    }

    if (!user) {
     
      return res.render("login", {title:"Login"}) 
    }

    req.login(user, function (err) {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/")
      }
    });
  })(req, res);
  



  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
};

var logout = (req, res) => {
  req.logout();
  res.redirect("/");


  // TODO: write code to logout user and redirect back to the page
};

var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register", {title:"Register"})
};

var postRegister = (req, res) => {
  user.register({username:req.body.username}, req.body.password, function(err, user){
    if(err){
      console.log(err);
      res.redirect("/getRegister");
    }
    else{
      passport.authenticate("local")(req,res,function(){
        res.redirect("/login");
      })
    }
  })

  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
};

module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
