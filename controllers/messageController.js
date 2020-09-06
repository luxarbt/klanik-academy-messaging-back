const MessageService = require("../services/messageService");

exports.sendMessage = async function (req, res, next) {
  try {
    const { sender, receiver, message, conversation } = req.body;
    const savedMessage = await MessageService.sendMessage(
      sender,
      receiver,
      message,
      conversation
    );
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async function (req, res, next) {
  try {
    const { conversation } = req.query;
    const messages = await MessageService.getMessages(conversation);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLastMessage = async function (req, res, next) {
  try {
    const { conversation } = req.query;
    const message = await MessageService.getLastMessage(conversation);
    res.json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
