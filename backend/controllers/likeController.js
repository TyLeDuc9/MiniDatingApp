
const Like = require("../models/Like");
const Match = require("../models/Match");

exports.getMyLikes = async (req, res) => {
  try {
    const userId = req.user.id;

    const likes = await Like.find({ fromUser: userId }).select("toUser");

    const likedUserIds = likes.map((like) => like.toUser.toString());

    res.status(200).json({ likedUserIds });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
exports.likeUser = async (req, res) => {
  try {
    const { fromUser, toUser } = req.body;
    if (!fromUser || !toUser) {
      return res.status(400).json({ message: "Thiếu fromUser hoặc toUser" });
    }

    if (fromUser === toUser) {
      return res.status(400).json({ message: "Không thể like chính mình" });
    }

    const existedLike = await Like.findOne({ fromUser, toUser });
    if (existedLike) {
      return res.status(200).json({
        match: false,
        message: "Bạn đã like người này rồi",
      });
    }

    await Like.create({ fromUser, toUser });

    const reverseLike = await Like.findOne({
      fromUser: toUser,
      toUser: fromUser,
    });

    if (reverseLike) {
      const users = [fromUser, toUser].sort();
      const usersHash = users.join("_");
      const match = await Match.findOneAndUpdate(
        { usersHash },
        {
          $setOnInsert: {
            users,
            usersHash,
            matchedAt: new Date(),
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      return res.status(200).json({
        match: true,
        message: "It's a Match",
        matchData: match,
      });
    }
    return res.status(200).json({
      match: false,
      message: "Like thành công",
    });
  } catch (error) {
    console.error("LIKE ERROR:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};