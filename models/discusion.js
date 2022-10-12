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
    }
  ],
  messages: [
    {
      content: { type: String },
      isPicture: { type: Boolean },
      delete: { type: Boolean },
      vue: { type: Boolean },
      sendDate: { type: Date },
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
