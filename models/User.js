const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: mongoose.Schema.Types.String,
    password: mongoose.Schema.Types.String,
    email: mongoose.Schema.Types.String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
