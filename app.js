const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoute = require("./Routes/user");
const messageRoute = require("./Routes/message");

const app = express();

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

app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


app.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever start on port 3000");
});
