const mongoose = require("mongoose");

const LogSchema = new mongoose.Schema(
  {
    payload: [
      {
        contentType: mongoose.Schema.Types.String,
        contentBody: mongoose.Schema.Types.Mixed,
      },
    ],
    userID: mongoose.Schema.Types.Number,
    username: mongoose.Schema.Types.String,
    timestamp: mongoose.Schema.Types.Date,
    isApproved: mongoose.Schema.Types.Boolean,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", LogSchema);
