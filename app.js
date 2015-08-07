var express = require("express");
var passport = require("./auth.js");
var passportLocal = require("passport-local");
var app = express();
var io = require("socket.io");

var http = require('http').Server(app);
var io = require('socket.io')(http);

//routes
var routes = require("./routes.js");

//sockets function
var addSockets = require("./socketEvents.js");

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

//add socket events
addSockets(io);




http.listen(3000,function(){
	console.log("listenning");
})