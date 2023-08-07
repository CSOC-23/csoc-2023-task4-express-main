const express = require("express");
const app = express();

//database
var mongoose = require("mongoose");
const db=require('./config/mongoose');
const user = require("./models/user");
var books = require("./models/book");
var BookCopy = require("./models/bookCopy");

//Authentication
var passport = require("passport");
var localStrategy = require("passport-local");
var passportLocal=require('./config/passport-local-strategy');


var port = process.env.PORT || 3000;

app.use(express.static("public"));

/*  CONFIGURE WITH PASSPORT */
app.use(
  require("express-session")({
    secret: "decryptionkey", //This is the secret used to sign the session ID cookie.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({ extended: true })); //parses incoming url encoded data from forms to json objects
app.set("view engine", "ejs");
app.set('views', './views');

//THIS MIDDLEWARE ALLOWS US TO ACCESS THE LOGGED IN USER AS currentUser in all views
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use((req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  next();
});

app.use('/', require('./routes'));


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
