const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Profile",
      required: true,
    },
    match: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: true,
    },
    slots: [
      {
        date: {
          type: String,
          required: true,
        },
        from: {
          type: String,
          required: true,
        },
        to: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Availability", availabilitySchema);