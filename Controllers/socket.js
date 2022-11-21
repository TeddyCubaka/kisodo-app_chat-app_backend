const app = require("../app");
// const io = app.io;
let users = [];
const rooms = [];
const sending = [];
const connected = [];

module.exports = function sockets(socket) {
	let room = "";
	connected.push(socket.id);

	socket.on("disconnect", () => {
		users = users.filter((user) => {
			return user.socketId !== socket.id;
		});
	});

	socket.on("online", (user) => {
		user.socketId = socket.id;
		users = users.filter((usr) => {
			return usr.userId !== user.userId;
		});
		user.onLine = true;
		users.push(user);
		socket.emit("userOnline", users);
	});

	socket.emit("userOnline", users);

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
	});

	socket.on("send", (msg) => {
		msg._id = msg.content;
		app.io.to(room).emit("new message", msg);
	});

	socket.on("image", (img) => {
		console.log(img);
	});
};
