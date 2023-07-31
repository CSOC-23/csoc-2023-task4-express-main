var passport = require("passport");
var User = require("../models/user")
var middleware = require("../middleware/index")

// ----------------------------------------------------------Login Functionality----------------------------------------------------------
var getLogin = (req, res) => {
  //TODO: render login page
  res.render("login");
}

var postLogin = (req, res, next) => {
  // TODO: authenticate using passport
  //On successful authentication, redirect to next page
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.error(err);
      return res.redirect("/login");
    }
    if (!user) {
      // Authentication failed, redirect back to the login page with an error message
      return res.render("login", { error: "Invalid username or password" });
    }

    // If authentication succeeds, log the user in and redirect to the Books page
    req.login(user, (err) => {
      if (err) {
        console.error(err);
        return res.redirect("/login");
      }
      return res.redirect("/books");
    });
  })(req, res, next);
};


// ----------------------------------------------------------Logout Functionality----------------------------------------------------------
var logout = (req, res) => {
  // TODO: write code to logout user and redirect back to the page
  req.logout();
  res.redirect("/");
};


// ----------------------------------------------------------Register Functionality----------------------------------------------------------
var getRegister = (req, res) => {
  // TODO: render register page
  res.render("register");
};

var postRegister = (req, res) => {
  console.log("request :", req.body)
  // TODO: Register user to User db using passport
  //On successful authentication, redirect to next page
  User.register(
    new User({ username: req.body.username, password: req.body.password }), // Provide all the required fields of User schema here
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.error(err);
        return res.redirect("/register");
      }
      // On successful authentication, redirect to the Books page
      passport.authenticate("local")(req, res, () => {
        res.redirect("/books")
      });
    }
  );

};



module.exports = {
  getLogin,
  postLogin,
  logout,
  getRegister,
  postRegister,
};
