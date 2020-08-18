const router = require("express").Router()
const Conversation = require("../models/conversationModel");

router.post("/newconversation", async (req, res) => {

    const firstUser = req.body.params.firstUser;
    const secondUser = req.body.params.secondUser;
    const messages = [];

    const conversation = new Conversation({
        firstUser,
        secondUser,
        messages
    })

    const conversationSaved = await conversation.save()

    res.json(conversationSaved)
})

module.exports = router