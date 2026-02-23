const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      min: 16,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    bio: {
      type: String,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", profileSchema);