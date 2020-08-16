const router = require("express").Router()
const ChatRequest = require("../models/chatRequestModel")
const User = require("../models/userModel")

router.post("/newrequest", async (req, res) => {

    const { userRequesting, userRequested, status } = req.body

    const chatRequest = new ChatRequest({
        userRequesting,
        userRequested,
        status
    })

    const savedChatRequest = await chatRequest.save()

    res.json(savedChatRequest)
})

router.put("/updaterequest", async (req, res) =>  {
    const status = req.body.status;
    const idRequest = req.body.chatRequestId;

    const updatedChatRequest = await ChatRequest.findByIdAndUpdate(idRequest, {"status": status});
    res.json(updatedChatRequest);
})

router.get("/requestget", async (req, res) =>  {
    let userData = JSON.parse(req.query.userRequested);
    const chatRequest = await ChatRequest.find({userRequested: userData.user._id});
    res.json(chatRequest);
})

router.get("/requestsent", async (req, res) => {
    const chatRequest = await ChatRequest.find({userRequesting: req.query.userRequesting});
    res.json(chatRequest);
})

router.get("/requests", async (req, res) => {
    const chatRequest = await ChatRequest.find();
    res.json(chatRequest);
})

module.exports = router