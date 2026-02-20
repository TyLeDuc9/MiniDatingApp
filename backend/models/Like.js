const mongoose = require("mongoose");
const likeSchema = new mongoose.Schema(
  {
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UserProfile",
      required: true,
    },
  },
  { timestamps: true }
);

likeSchema.index({ fromUser: 1, toUser: 1 }, { unique: true });
module.exports = mongoose.model("Like", likeSchema);