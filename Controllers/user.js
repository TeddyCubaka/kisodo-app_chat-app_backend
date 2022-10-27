const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

module.exports.getAllUsers = (req, res) => {
	User.find({}, { password: 0, inbox: 0 })
		.then((users) => res.status(200).json(users))
		.catch((err) => res.status(404).json({ err }));
};

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
				joinDate: new Date(),
			});
			user
				.save()
				.then(() => res.status(201).json({ message: "utilisateur ajouté !" }))
				.catch((err) => res.status(400).json({ err }));
		})
		.catch((err) => res.status(500).json({ message: "sheeesh", err }));
};

module.exports.login = (req, res) => {
	User.findOne({ mail: req.body.mail })
		.then((user) => {
			if (!user)
				return res.status(401).json({ message: "Incorrect password !" });
			bcrypt
				.compare(req.body.password, user.password)
				.then((valid) => {
					if (!valid)
						return res.status(401).json({ message: "Incorrect password !" });
					res.status(200).json({
						userId: user._id,
						token: jwt.sign({ userId: user._id }, "birh-cub_04", {
							expiresIn: "24h",
						}),
					});
				})
				.catch((err) => res.status(500).json({ err }));
		})
		.catch((err) => res.status(500).json({ err }));
};

module.exports.findOneUser = (req, res) => {
	User.findOne({ _id: req.params.id }, { password: 0 })
		.then((user) => {
			res.status(200).json(user);
		})
		.catch((err) => res.status(404).json({ err }));
};

module.exports.findUserDiscussions = (req, res) => {
	User.findOne({ _id: req.params.id })
		.then((user) => {
			res.status(200).json(user.inbox);
		})
		.catch((err) => res.status(404).json({ err }));
};

module.exports.updateInbox = (req, res) => {
	User.updateOne(
		{ _id: req.params.id },
		{ $push: { inbox: req.body.data } }
	)
		.then((data) => res.status(201).json({ message: "User update", data }))
		.catch((err) => res.status(404).json({ err }));
};
