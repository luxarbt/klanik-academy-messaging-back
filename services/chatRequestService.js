const ChatRequest = require("../models/chatRequestModel");

exports.newChatRequest = async function (
  userRequesting,
  userRequested,
  status
) {
  try {
    const chatRequest = new ChatRequest({
      userRequesting,
      userRequested,
      status,
    });

    const savedChatRequest = await chatRequest.save();
    return savedChatRequest;
  } catch (err) {
    throw Error(`Error when creating chat request : ${err}`);
  }
};

exports.updateChatRequest = async function (chatRequestId, status) {
  try {
    const updatedChatRequest = await ChatRequest.findByIdAndUpdate(
      chatRequestId,
      {
        status: status,
      }
    );
    return updatedChatRequest;
  } catch (err) {
    throw Error(`Error when updating chat request : ${err}`);
  }
};

exports.getChatRequestsByUserRequested = async function (userRequested) {
  try {
    const chatRequests = await ChatRequest.find({
      userRequested: userRequested.user._id,
    });
    return chatRequests;
  } catch (err) {
    throw Error(`Error when getting chat requests by user requested : ${err}`);
  }
};

exports.getChatRequestsByUserRequesting = async function (userRequesting) {
  try {
    const chatRequests = await ChatRequest.find({
      userRequesting: userRequesting.user._id,
    });
    return chatRequests;
  } catch (err) {
    throw Error(`Error when getting chat requests by user requesting : ${err}`);
  }
};

exports.getAllChatRequests = async function () {
  try {
    const chatRequests = await ChatRequest.find();
    return chatRequests;
  } catch (err) {
    throw Error(`Error when getting chat requests : ${err}`);
  }
};
