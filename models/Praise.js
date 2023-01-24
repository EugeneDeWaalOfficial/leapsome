const mongoose = require("mongoose");

const PraiseSchema = new mongoose.Schema(
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Praise", PraiseSchema);
