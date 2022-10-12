const Discussion = require("../models/discusion");

exports.createDiscussion = (req, res) => {
  const discussion = new Discussion({ ...req.body });
  discussion
    .save()
    .then(() =>
      res.status(201).json({
        message: "Discussion créé avec succès !",
      })
    )
    .catch((err) =>
      res.status(400).json({
        type: err,
        cause: req,
      })
    );
};

exports.findAlldiscussion = (req, res) => {
  Discussion.find()
    .then((discussions) => res.status(200).json({ discussions }))
    .catch((err) => res.status(400).json({ err }));
};
