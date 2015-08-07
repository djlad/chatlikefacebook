console.log("socketEvents.js loaded")
module.exports = function(io){
	console.log("socket events have been added");

	io.on("connection",function(socket){
		socket.on("newChatListener",function(data){
			console.log("making new chat listener"+data);
		});
	});
}