const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const { createServer } = require("http");
const { Server } = require("socket.io");

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
  .then(() => console.log("Connexion à MongoDB réussie !"))
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

const io = new Server(httpServer, {});

io.on("connection", (socket) => {
  console.log(socket);
});

io.engine.on("initial_headers", (headers, req) => {
  headers["test"] = "123";
  headers["set-cookie"] = "mycookie=456";
});

io.engine.on("headers", (headers, req) => {
  headers["test"] = "789";
});

io.engine.on("connection_error", (err) => {
  console.log(err.req);
  console.log(err.code);
  console.log(err.message);
  console.log(err.context);
});

httpServer.listen(3000);
