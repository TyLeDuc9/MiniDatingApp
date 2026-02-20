const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
  {
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserProfile",
        required: true,
      },
    ],
    matchedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

matchSchema.index({ users: 1 }, { unique: true });

module.exports = mongoose.model("Match", matchSchema);