const MessageService = require("../services/messageService");

exports.sendMessage = async function (req, res, next) {
  try {
    const { sender, receiver, message } = req.body;
    const savedMessage = await MessageService.sendMessage(
      sender,
      receiver,
      message
    );
    res.json(savedMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async function (req, res, next) {
  try {
    const { conversationId } = req.query;
    const messages = await MessageService.getMessages(conversationId);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
