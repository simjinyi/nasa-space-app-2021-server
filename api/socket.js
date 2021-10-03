const io = require("socket.io")(8081, {
  cors: { origin: "*" },
});

const mongoose = require("mongoose");
const Log = require("../models/Log");

const Mission = require("../models/Mission");
const { authenticateTokenWS } = require("../middlewares/auth");

io.on("connection", (socket) => {
  io.use(authenticateTokenWS);

  const getMissionFromID = async (missionID) => {
    return await Mission.findById(
      new mongoose.Types.ObjectId(missionID)
    ).exec();
  };

  socket.on("loadMessage", async (data) => {
    try {
      const { missionID } = data;
      const mission = await getMissionFromID(missionID);
      const logs = mission ? mission.logs : null;
      socket.emit("messageLoaded", logs);
    } catch (err) {
      socket.emit("messageLoaded", null);
    }
  });

  socket.on("createMessage", async (data) => {
    try {
      const { missionID, content } = data;
      const mission = await getMissionFromID(missionID);

      const newLog = new Log({
        payload: [
          {
            contentType: "string",
            contentBody: content,
          },
        ],
        userID: 1,
        username: "simjinyi",
        timestamp: new Date(),
        isApproved: false,
      });

      const newLogs = [...mission.logs, newLog];
      const result = await mission.updateOne({ logs: newLogs });

      io.emit("messageCreated", newLog);
    } catch (err) {
      console.log(err);
    }
  });
});

module.exports = io;
