const messageModel = require("../models/messageModel");

module.exports.toMessage = async (req, res) => {
  try {
    const { sender, receiver, jobOrContract, contextType, message } = req.body;
    const newMessage = new messageModel({
      sender,
      receiver,
      jobOrContract,
      contextType,
      message,
    });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error("Error message", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports.toGetMessage = async (req, res) => {
  try {
    const messages = await messageModel
      .find({
        $or: [
          { sender: req.params.user1, receiver: req.params.user2 },
          { sender: req.params.user2, receiver: req.params.user1 },
        ],
      })
      .sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    console.error("Error message", err);
    res.status(500).json({ message: "Internal server error" });
  }
};
