const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
  firstUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  secondUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  messages: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
  ],
});

// eslint-disable-next-line no-undef
module.exports = Conversation = mongoose.model(
  "conversation",
  conversationSchema
);
