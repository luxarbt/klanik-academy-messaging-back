const ChatRequestService = require("../services/chatRequestService");

exports.newChatRequest = async function (req, res, next) {
  try {
    const { userRequesting, userRequested, status } = req.body;

    const savedChatRequest = await ChatRequestService.newChatRequest(
      userRequesting,
      userRequested,
      status
    );
    res.json(savedChatRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateChatRequest = async function (req, res, next) {
  try {
    console.log(req.body);
    const { chatRequestId, status } = req.body;

    const updatedChatRequest = await ChatRequestService.updateChatRequest(
      chatRequestId,
      status
    );
    res.json(updatedChatRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChatRequestsByUserRequested = async function (req, res, next) {
  try {
    const userData = JSON.parse(req.query.userRequested);
    const chatRequests = await ChatRequestService.getChatRequestsByUserRequested(
      userData
    );
    res.json(chatRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getChatRequestsByUserRequesting = async function (req, res, next) {
  try {
    const userData = JSON.parse(req.query.userRequesting);
    const chatRequests = await ChatRequestService.getChatRequestsByUserRequesting(
      userData
    );
    res.json(chatRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllChatRequests = async function (req, res, next) {
  try {
    const chatRequests = await ChatRequestService.getAllChatRequests();
    res.json(chatRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
