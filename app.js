const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/users");
const userRoute = require("./Routes/user");

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

app.use("/api/user", userRoute);

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever start on port 3000");
});
