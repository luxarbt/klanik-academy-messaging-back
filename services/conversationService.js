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