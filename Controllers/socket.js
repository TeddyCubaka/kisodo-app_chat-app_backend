const { io } = require("../app");
const users = [];
const rooms = [];
const sending = [];
module.exports = function sockets(socket) {
	let room = "";
	console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("online", (user) => {
		user.socketId = socket.id;
		users.push(user);
		socket.emit("userOnline", users);
	});

	socket.on("send rooms", (disc) => {
		disc.map((d) => {
			if (rooms.indexOf(d._id) == -1) rooms.push(d._id);
		});
		rooms.map((room) => {
			socket.join(room);
		});
	});

	socket.on("join room", (id) => {
		room = rooms.find((room) => room == id);
		socket.join(room);
		const salon = sending.filter((msgs) => msgs.discussionId == id);
		const roomMessage = [];
		salon.map((msgs) => {
			roomMessage.push(msgs.message);
		});
		// io.to(room).emit("message", roomMessage);
		// socket.of(room).emit("message", roomMessage);
	});

	socket.on("send", (msg) => {
		sending.unshift(msg);
		socket.to(room).emit("message", msg.message);
	});
};
