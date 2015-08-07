var express = require("express");
var passport = require("./auth.js");
var passportLocal = require("passport-local");
var app = express();

//routes
var routes = require("./routes.js");

//models


//utilities
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");




app.set("view engine","ejs");


//use utilities
app.use(bodyParser.urlencoded({
	extended:false
}));
app.use(cookieParser());
app.use(expressSession({
	secret:"secret key",
	resave:false,
	saveUninitialized:false
}));

app.use(passport.initialize());
app.use(passport.session());


//routes
routes(app,passport);
