console.log("message.js loaded");

var mongoose = require("mongoose");



var messageSchema = new mongoose.Schema({
	content:String,
	from:String,
	to:String,
	date:Number
})

var Message = mongoose.model("messages",messageSchema);

module.exports = Message;