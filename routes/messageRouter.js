const router = require("express").Router();
const MessageController = require("../controllers/messageController");

router.post("/send", MessageController.sendMessage);

router.get("/get", MessageController.getMessages);
router.get("/get-last-message", MessageController.getLastMessage);

module.exports = router;
