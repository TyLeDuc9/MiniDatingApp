const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Profile",
        required: true,
      },
    ],
    usersHash: {
      type: String,
      required: true,
      unique: true,
    },

    matchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);