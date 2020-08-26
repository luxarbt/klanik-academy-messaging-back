const ConversationService = require("../services/conversationService");

exports.createConversation = async function (req, res, next) {
    try {
        const { firstUser, secondUser } = req.body.params;
        const messages = [];
    
        const conversationSaved = await ConversationService.createConversation(firstUser, secondUser, messages);
        res.json(conversationSaved);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getAllConversations = async function (req, res, next) {
    try {
        const conversations = await ConversationService.getAllConversations();
        res.json(conversations);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}