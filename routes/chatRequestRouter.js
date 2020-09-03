const router = require("express").Router();
const ChatRequestController = require("../controllers/chatRequestController");

/* Post requests */
router.post("/newrequest", ChatRequestController.newChatRequest);

/* Put requests */
router.put("/updaterequest", ChatRequestController.updateChatRequest);

/* Get requests */
router.get("/requestget", ChatRequestController.getChatRequestsByUserRequested);
router.get(
  "/requestsent",
  ChatRequestController.getChatRequestsByUserRequesting
);
router.get("/requests", ChatRequestController.getAllChatRequests);

module.exports = router;
