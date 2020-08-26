const Conversation = require("../models/conversationModel");

exports.createConversation = async function (firstUser, secondUser, messages) {
    try {
        const conversation = new Conversation({
            firstUser,
            secondUser,
            messages,
        });

        const conversationSaved = await conversation.save();
        return conversationSaved;
    } catch (err) {
        throw Error("Error when creating new conversation" + err);
    }
}

exports.getAllConversations = async function () {
    try {
        const conversations = await Conversation.find();
        return conversations;
    } catch (err) {
        throw Error("Error when getting all conversations" + err);
    }
}