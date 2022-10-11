const Message = require("../models/message");

exports.writeMessage = (req, res, next) => {
  req.body.sendDate = new Date();
  const message = new Message({ ...req.body });
  message
    .save()
    .then(() =>
      res.status(201).json({
        message: "Message ajouté avec succès !",
      })
    )
    .catch((err) => res.status(400).json({ err }));
};

exports.fingAllMessage = (req, res) => {
  Message.find()
    .then((message) => {
      res.status(200).json({ message });
    })
    .catch((err) => res.status(500).json({ err }));
};
