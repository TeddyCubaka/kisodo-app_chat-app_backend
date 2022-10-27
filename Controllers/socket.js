const discussion = [];
const userOnline = [];

module.exports = function sockets(socket) {
	console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
			userOnline.filter((user) => {
				return user.socketId != socket.id;
			}
		);
		console.log(userOnline);
	});

	socket.on("message", (msg) => {
		discussion.push(msg);
		discussion.push(socket.id);
		socket.broadcast.emit("discussion", discussion);
		socket.emit("discussion", discussion);
	});

	socket.broadcast.emit("discussion", discussion);
	socket.emit("discussion", discussion);
	socket.on("online", (user) => {
		user.socketId = socket.id;
		userOnline.push(user);
		socket.emit("userOnline", userOnline);
	});
	console.log(userOnline);
};
