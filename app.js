const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { createServer } = require("http");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const socket = require("./Controllers/socket");
const userRoute = require("./Routes/user");
const messageRoute = require("./Routes/message");
const discusionRouter = require("./Routes/discussions");

const app = express();

const httpServer = createServer(app);

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() =>
		console.log("Connexion à MongoDB réussie !", process.env.DATABASE_URL)
	)
	.catch(() =>
		console.log("Connexion à MongoDB échouée !", process.env.DATABASE_URL)
	);

app.use(express.json());
app.use(
	session({
		secret: "Your_Secret_Key",
		resave: true,
		saveUninitialized: true,
	})
);

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);
app.use("/api/discussion", discusionRouter);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: process.env.CLIENT_ORIGIN,
		methods: ["GET", "POST"],
	},
});

const users = [];
const rooms = [];
const sending = [];

io.on("connection", function sockets(socket) {
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
	});

	socket.on("send", (msg) => {
		msg._id = msg.content;
		io.to(room).emit("new message", msg);
	});
});

httpServer.listen(4000, () => {
	console.log("listen on port", " ", PORT);
});
