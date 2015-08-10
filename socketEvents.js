console.log("socketEvents.js loaded")
module.exports = function(io){
	console.log("socket events have been added");

	io.on("connection",function(socket){
		socket.on("newChatListener",function(data){
			console.log(user2Sock);
			console.log(sock2User);
		});
		socket.on("disconnect",function(){
			var username = sock2User[socket.id];
			if(! typeof(username) == "undefined"){
				delete sock2User[socket.id];
				delete user2Sock[username][socket.id];
			}
		})
	});
}