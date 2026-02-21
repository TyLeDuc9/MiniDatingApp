const Match = require("../models/Match"); 
exports.getMyMatches = async (req, res) => {
  try {
    const userId = req.user.id;

    const matches = await Match.find({
      users: userId,
    }).populate("users", "name email gender bio age");

    res.status(200).json(matches);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};