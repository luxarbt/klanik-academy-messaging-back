const router = require("express").Router()
const ChatRequest = require("../models/chatRequestModel")
const User = require("../models/userModel")

router.post("/newrequest", async (req, res) => {

    const userRequesting = await User.findById(req.query.userRequestingId)
    const userRequested = await User.findById(req.query.userRequestedId)
    const status = req.body.status

    const chatRequest = new ChatRequest({
        userRequesting,
        userRequested,
        status
    })

    const savedChatRequest = await chatRequest.save()

    res.json(savedChatRequest)
})

router.put("/updaterequest", async (req, res) =>  {
    const status = req.body.status

    const updatedChatRequest = await ChatRequest.findByIdAndUpdate(req.query.chatRequestId, {"status": status})
    res.json(updatedChatRequest)
})

module.exports = router