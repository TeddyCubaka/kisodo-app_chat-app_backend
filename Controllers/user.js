const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

module.exports.getAllUsers = (req, res) => {
  User.find()
    .then((users) => res.status(200).json(users))
    .catch((err) => res.status(404).json({ error }));
};

// module.exports.signup = (req, res) => {
//   const user = new User({ ...req.body });
//   user
//     .save()
//     .then(() => res.status(201).json({ message: "Objet enregistré !" }))
//     .catch((err) => res.status(500).json({ err }));
// };

module.exports.updateUser = (req, res) => {
  User.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(res.status(201).json({ message: "User update" }))
    .catch((err) => res.status(404).json({ err }));
};

module.exports.signup = (req, res) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const userModel = req.body;
      userModel.password = hash;
      const user = new User({
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        mail: req.body.mail,
        password: hash,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: "utilisateur ajouté !" }))
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
