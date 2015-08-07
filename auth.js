console.log("auth.js loaded");

var passport = require("passport");
var passportLocal = require("passport-local");

var Account = require("./models/account.js");

var bcrypt = require("bcrypt");

passport.use(new passportLocal.Strategy(function(username,password,done){
	Account.findOne({username:username},function(er,account){
		if(account.validPassword(password))done(null,{id : username});
		else done(null,null);
	})

}));

passport.serializeUser(function(user,done){
	done(null,user.id);
});

passport.deserializeUser(function(id,done){
	done(null,{id:id});
});

module.exports = passport;