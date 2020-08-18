const router = require("express").Router();
const bcrypt = require("bcryptjs");
const Message = require("../models/messageModel");

router.post("/send", async (req, res) => {

    const { sender, receiver, message } = req.body;

    const salt = await bcrypt.genSalt();
    const messageHash = await bcrypt.hash(message, salt);

    const msg = new Message({
        sender,
        receiver,
        message: messageHash
    });

    const savedMessage = await msg.save();

    res.json(savedMessage);
});

router.get("/messagesget", async (req, res) =>  {
    const messages = await Message.find({sender: req.query.sender, receiver: req.query.receiver});
    res.json(messages);
})

module.exports = router;