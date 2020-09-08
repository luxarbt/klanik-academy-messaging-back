const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");

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

const encKey = process.env.ENCKEY;
const sigKey = process.env.SIGKEY;

messageSchema.plugin(encrypt, {
  encryptionKey: encKey,
  signingKey: sigKey,
  encryptedFields: ["sender", "receiver", "message"],
});

// eslint-disable-next-line no-undef
module.exports = Message = mongoose.model("message", messageSchema);
