// Controller.js  file

const express = require("express");
const router = express.Router();
const User = require("../Models/userModel");
const Chat = require("../Models/chatModel");
const createdChats = require("../Models/createdChat");

router.get("/getUsers", async (req, res) => {
  try {
    const user = await User.find();
    // console.log("Controller User:", user);
    res.json({ user });
  } catch (error) {
    console.log("Controller User Error:", error);
    res.send(error);
  }
});

router.get("/getChats", async (req, res) => {
  try {
    var chat = await createdChats.find().populate('receiverID', 'userName');
    res.json({ chat });
  } catch (error) {
    console.log("Controller Chat Error:", error);
    res.send(error);
  }
});

router.post("/sendMessage", async (req, res) => {
  const { UserID, upDateReceiver, content } = req.body;
  try {
    const chat = await createdChats.findOne({
      $or: [
        { senderID: UserID, receiverID: upDateReceiver },
        { senderID: upDateReceiver, receiverID: UserID },
      ],
    });
    if (chat) {
      let chatID = chat._id;
      const msg = new Chat({
        createdChatID: chatID,
        senderID: UserID,
        content: content,
      });
      await msg.save();
      res.status(200).json({ msg });
    } else {
      const newChat = new createdChats({ senderID:UserID, receiverID:upDateReceiver });
      await newChat.save();
      let chatID = newChat._id;
      const msg = new Chat({
        createdChatID: chatID,
        senderID: UserID,
        content: content,
      });
      await msg.save();
      res.status(200).json({ msg });
    }
  } catch (error) {
    res.status(500).json({ message: "Interval Server Error!" });
  }
});


router.get("/getMessages/:chatId", async(req,res)=>{
  const chatId = req.params.chatId;
  try {
    const messages = await Chat.find({createdChatID:chatId}).populate('senderID','userName').sort({date:1});
  res.status(200).json({messages});
  } catch (error) {
    console.error("Error Fetching messages:", error);
  res.status(500).json({error:'Internal Server Error'});
  }

})

module.exports = router;
