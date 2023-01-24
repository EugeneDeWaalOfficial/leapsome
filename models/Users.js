var mongoose = require("mongoose");

var UserSchema = new mongoose.Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
