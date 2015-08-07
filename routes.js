console.log("routes loaded");

var Account = require("./models/account.js");
var Message = require("./models/message.js");
var url = require("url");

module.exports = function(app,passport){
	//check if logged in send to login if not else go to user
	function checkAuth(req,res){
		if(req.isAuthenticated())res.redirect("/user");
		else res.redirect("/login");
	}

	function makeAccount(username,password,res){
		Account.count({username:username},function(er,count){
			if(!count==0){
				res.send("username already exists");
				return false;
			}else{
				newAccount = new Account();
				newAccount.username = username;
				newAccount.password = newAccount.generateHash(password);
				newAccount.save();
				res.send("new account created probably <a href = '/login'>login here</a>");
				return true;
			}
		})
	}

	function sendMessage(to,from,content){
		newMessage = new Message();
		newMessage.to = to;
		newMessage.from = from;
		newMessage.content = content;
		newMessage.date = (new Date()).getTime();
		newMessage.save();
	};

	
	app.get("/",function(req,res){
		checkAuth(req,res);
	});

	//login screen obviously
	app.get("/login",function(req,res){
		
		res.render("index");
	});

	//create session after login
	app.post("/login",passport.authenticate("local"),function(req,res){
		res.send(req.user.id + " has logged in <br><a href='/user'>user page</a>");
	});

	//create account
	app.get("/signup",function(req,res){
		res.render("signup");
	})

	app.post("/signup",function(req,res){
		makeAccount(req.body.username,req.body.password,res);
		
	});

	//main page
	app.get("/user",function(req,res){
		res.render("user",{username:req.user.id});
	});

	//get messages
	app.get("/getAllMessages",function(req,res){
		urlGetData = url.parse(req.url,true).query;

		Message.find({to:req.user.id,date:{$gt:urlGetData.lastUpdateDate}},function(er,messages){
			res.send(messages);
		});
	});
	//get conversation
	app.get("/getConversation",function(req,res){
		urlGetData = url.parse(req.url,true).query;
		Message.find({to:req.user.id,from:urlGetData.from},function(er,messages){
			res.send(messages);
		});
	});

	//send message
	app.get("/sendMessage",function(req,res){
		//checkAuth(req,res);
		urlGetData = url.parse(req.url,true).query;
		var to = urlGetData.to;//req.body.to;
		var from = req.user.id;
		var content = urlGetData.content;//req.body.content;
		res.send(to + from + content);
		sendMessage(to,from,content);
	});

	//logout
	app.get("/logout",function(req,res){
		req.logout();
		res.redirect("/");
	})

	//javascript files
	app.get("/javascript/chatLibrary.js",function(req,res){
		res.sendfile("./views/javascript/chatLibrary.js");
	});



}