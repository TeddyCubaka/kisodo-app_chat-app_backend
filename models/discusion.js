const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema({
	name: { type: String },
	isGroup: { type: Boolean },
	membres: [
		{
			userId: { type: String, required: true },
			fullName: { type: String, required: true },
			image: { type: String },
			isOnline: { type: Boolean },
			biography: { type: String },
		},
	],
	messages: [
		{
			content: { type: String },
			isPicture: { type: Boolean },
			image: {
				url: { type: String },
				width: { type: String },
				height: { type: String },
				originalFilename: { type: String },
				format: { type: String },
				createDate: { type: String },
			},
			delete: { type: Boolean },
			vue: { type: Boolean },
			sendDate: { type: String },
			sendDateBigFormat: { type: Date },
			sender: {
				userId: { type: String },
				fullName: { type: String },
				image: { type: String },
				isOnline: { type: Boolean },
				biography: { type: String },
			},
		},
	],
});

module.exports = mongoose.model("discussion", discussionSchema);
