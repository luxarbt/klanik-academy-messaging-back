const Message = require("../models/messageModel");

exports.sendMessage = async function (sender, receiver, message, conversation) {
  try {
    const msg = new Message({
      sender,
      receiver,
      message,
      conversation,
    });

    const savedMessage = await msg.save();
    return savedMessage;
  } catch (err) {
    throw Error(`Error when sending message : ${err}`);
  }
};

exports.getMessages = async function (conversation) {
  try {
    const messages = await Message.find({
      conversation: conversation,
    });
    return messages;
  } catch (err) {
    throw Error(`Error when getting messages : ${err}`);
  }
};

exports.getLastMessage = async function (conversation) {
  try {
    const message = await Message.find({ conversation: conversation })
      .sort({ _id: -1 })
      .limit(1);
    return message;
  } catch (err) {
    throw Error(`Error when getting last message : ${err}`);
  }
};
