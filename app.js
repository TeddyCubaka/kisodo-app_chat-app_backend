const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const { createServer } = require("http");

require("dotenv").config();

const PORT = process.env.PORT || 4000;

const userRoute = require("./Routes/user");
const discusionRouter = require("./Routes/discussions");
const sockets = require("./Controllers/socket");

const app = express();

const httpServer = createServer(app);

mongoose
	.connect(process.env.DATABASE_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("Connexion à MongoDB réussie !", process.env.DATABASE_URL);
	})
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
app.use(express.static("files"));

app.use("/api/user", userRoute);
app.use("/api/discussion", discusionRouter);

const io = require("socket.io")(httpServer, {
	cors: {
		origin: process.env.CLIENT_ORIGIN,
		methods: ["GET", "POST"],
	},
});

exports.io = io;

io.on("connection", sockets);

httpServer.listen(4000, () => {
	console.log("listen on port", " ", PORT);
});
