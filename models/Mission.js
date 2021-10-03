const mongoose = require("mongoose");
const Log = require("./Log").schema;

const MissionSchema = new mongoose.Schema(
  {
    logs: [Log],
  },
  {
    timestamps: true,
    typeKey: "$type",
  }
);

module.exports = mongoose.model("Mission", MissionSchema);
