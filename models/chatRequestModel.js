const mongoose = require("mongoose");

const chatRequestSchema = new mongoose.Schema({
  userRequesting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userRequested: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  status: {
    type: String,
    enum: ["pending", "approved", "declined"],
  },
});

// eslint-disable-next-line no-undef
module.exports = ChatRequest = mongoose.model("chatrequest", chatRequestSchema);
