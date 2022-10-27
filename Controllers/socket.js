const discussion = []; 

module.exports = function sockets (socket) {
    console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("message", (msg) => {
		discussion.push(msg);
		discussion.push(socket.id);
		socket.broadcast.emit("discussion", discussion);
		socket.emit("discussion", discussion);
	});

	socket.broadcast.emit("discussion", discussion);
	socket.emit("discussion", discussion);
}