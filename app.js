const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
require("dotenv").config();
const { createServer } = require("http");
const PORT = process.env.PORT || 3000

const userRoute = require("./Routes/user");
const messageRoute = require("./Routes/message");
const discusionRouter = require("./Routes/discussions");

const path = require("path");

const app = express();
const http = require("http").Server(app);

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

const io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });

  socket.on("message", (msg) => {
    console.log("client message " + msg);
  });
});

httpServer.listen(PORT, ()=>{
  console.log("listen on port", " ", PORT)
});