const Message = require("../models/messageModel");

exports.sendMessage = async function (sender, receiver, message) {
    try {    
        const msg = new Message({
          sender,
          receiver,
          message,
        });
    
        const savedMessage = await msg.save();
        return savedMessage;
    } catch (err) {
        throw Error("Error when sending message : " + err);
    }
}