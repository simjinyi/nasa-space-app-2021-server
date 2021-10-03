const mongoose = require("mongoose");
const Log = require("./Log").schema;

const MissionSchema = new mongoose.Schema(
  {
    logs: [Log],
    roomOwner: {type: String},
    roomName:{type:String}
  },
  {
    timestamps: true,
    typeKey: "$type",
  }
);

module.exports = mongoose.model("Mission", MissionSchema);
