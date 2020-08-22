const router = require("express").Router();
const Message = require("../models/messageModel");
const MessageController = require("../controllers/messageController");

router.post("/send", MessageController.sendMessage);

module.exports = router;
