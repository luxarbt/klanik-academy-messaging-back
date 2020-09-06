const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  message: {
    type: String,
    required: true,
  },
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Conversation",
  },
});

// eslint-disable-next-line no-undef
module.exports = Message = mongoose.model("message", messageSchema);
