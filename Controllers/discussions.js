const Discussion = require("../models/discusion");

exports.createDiscussion = (req, res) => {
  const discussion = new Discussion({ ...req.body });
  discussion
    .save()
    .then((data) =>
      res.status(201).json({
        message: "Discussion créé avec succès !",
        discussionId: data._id,
      })
    )
    .catch((err) => res.status(400).json({ err }));
};

exports.findAlldiscussion = (req, res) => {
  Discussion.find()
    .then((discussions) => {
      res.status(200).json(discussions);
    })
    .catch((err) => res.status(400).json({ err }));
};

exports.insertMessage = (req, res) => {
  req.body.message.sendDate = new Date();
  Discussion.updateOne(
    { _id: req.body.discussionId },
    { $push: { messages: req.body.message } }
  )
    .then(() => {
      res.status(201).json({
        message: "Missage ajouté with succès !",
      });
    })
    .catch((err) => res.status(400).json({ message: err, hello: "Yian !" }));
};

exports.findOneDiscussion = (req, res) => {
  Discussion.findOne({ _id: req.params.id })
    .then((discussion) => {
      res.status(200).json(discussion);
    })
    .catch((err) => res.status(404).json({ err }));
};

exports.findInBox = (req, res) => {
  Discussion.find({ "membres.userId": req.params.id })
    .then((discussions) => res.status(200).json(discussions))
    .catch((err) => res.status(400).json({ err }));
};

exports.deleteDiscussion = (req, res, next) => {
  Discussion.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: "object supprimé !" }))
    .catch((error) => res.status(404).json({ error }));
};
