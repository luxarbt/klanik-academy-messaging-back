const router = require("express").Router();
const ConversationController = require("../controllers/conversationController");

router.post("/newconversation", ConversationController.createConversation);

router.get("/all", ConversationController.getAllConversations);

module.exports = router;