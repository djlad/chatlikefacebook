console.log("account.js loaded");

var mongoose = require("mongoose");

var bcrypt = require("bcrypt");

mongoose.connect('mongodb://localhost/chatdb');


var userSchema = new mongoose.Schema({
	username:String,
	password:String
})


userSchema.methods.generateHash = function(password){
	return bcrypt.hashSync(password, bcrypt.genSaltSync(9));
}

userSchema.methods.validPassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

var User = mongoose.model("accounts",userSchema);

module.exports = User;