const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const { createServer } = require("http");
const PORT = process.env.PORT || 4000;
const socket = require("./Controllers/socket") 

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
	.then(() => console.log("Connexion à MongoDB réussie !", process.env.DATABASE_URL))
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

io.on("connection", socket);

httpServer.listen(4000, () => {
	console.log("listen on port", " ", PORT);
});
