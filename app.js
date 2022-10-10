const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const User = require("./models/users");

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

app.get("/api/user", (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json({ error }));
});
app.post("/api/signup", (req, res) => {
  const user = new User({ ...req.body });
  user
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((err) => res.status(500).json({ err }));
});
app.post("/api/user/:id", (req, res) => {
    User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
        .then(res.status(201).json({ message : "User update"}))
        .catch(err => res.status(404).json({ err }))
})

app.listen(3000, (err) => {
  if (err) throw err;
  console.log("sever start on port 3000");
});
