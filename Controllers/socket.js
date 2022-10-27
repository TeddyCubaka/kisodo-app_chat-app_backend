const discutCtrl = require("../Controllers/discussions");
const discussion = [];
const Discussion = require("../models/discusion");
const userOnline = [];

const getDiscussion = async (id) => {
	const discussion = await Discussion.findOne({_id: id});
	if(!discussion) return null;
	return discussion
}

module.exports = function sockets(socket) {
	console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
		userOnline.filter((user) => {
			return user.socketId != socket.id;
		});
		console.log(userOnline);
	});

	socket.on("message", (msg) => {
		discussion.push(msg);
		discussion.push(socket.id);
		socket.broadcast.emit("discussion", discussion);
		socket.emit("discussion", discussion);
	});

	socket.broadcast.emit("discussion", discussion);
	socket.emit("discussion", discutCtrl.findAlldiscussion);

	socket.on("online", (user) => {
		user.socketId = socket.id;
		userOnline.push(user);
		socket.emit("userOnline", userOnline);
	});
	console.log(userOnline);

	socket.on("getUser", (id)=>{
		const discussion = getDiscussion(id)
		
	})
};
