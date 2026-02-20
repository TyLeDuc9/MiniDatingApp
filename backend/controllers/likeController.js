const Like = require("../models/Like");
exports.likeUser = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;

    if (!fromUser || !toUser) {
      return res.status(400).json({ message: "Missing user id" });
    }

    if (fromUser === toUser) {
      return res.status(400).json({ message: "You cannot like yourself" });
    }

    const like = await Like.create({ fromUser, toUser });

    res.status(201).json({
      message: "Like successfully",
      data: like,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "You already liked this user",
      });
    }

    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.unlikeUser = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;

    const result = await Like.findOneAndDelete({ fromUser, toUser });

    if (!result) {
      return res.status(404).json({ message: "Like not found" });
    }

    res.status(200).json({ message: "Unlike successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

