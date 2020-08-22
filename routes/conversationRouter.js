const router = require("express").Router();
const ConversationController = require("../controllers/conversationController");

router.post("/newconversation", ConversationController.createConversation)

module.exports = router;