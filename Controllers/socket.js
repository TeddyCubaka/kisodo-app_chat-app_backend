const users = [];
const disc = [];
const rooms = [];

module.exports = function sockets(socket) {
	console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("online", (user) => {
		user.socketId = socket.id;
		users.push(user);
		socket.emit("userOnline", users);
	});

	socket.on("join rooms", (disc) => {
		disc.map((d) => {
			if (rooms.indexOf(d._id) == -1) rooms.push(d._id);
		});
		console.log(rooms)
	});

	socket.on("send", async (msg) => {
		const room = await rooms.find((room) => room == msg.discussionId);
		socket.join(room);
		socket.to(room).emit("message", msg);
		console.log(room);
	});
};
