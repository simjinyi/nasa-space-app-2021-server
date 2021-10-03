const io = require("socket.io")(8081, {
  cors: { origin: "*" },
});

const mongoose = require("mongoose");
const Log = require("../models/Log");

const Mission = require("../models/Mission");
const { authenticateTokenWS } = require("../middlewares/auth");

const filtering = {};

io.on("connection", (socket) => {
  io.use(authenticateTokenWS);

  io.use(async (socket, next) => {
    try {
      if (socket.handshake.query && socket.handshake.query.missionID) {
        const missionID = socket.handshake.query.missionID;
        socket.mission = await getMissionFromID(missionID);
        next();
      } else {
        next(new Error("Missing Mission ID"));
      }
    } catch (err) {
      next(new Error("Invalid Mission ID"));
    }
  });

  const getMissionFromID = async (missionID) => {
    return await Mission.findById(
      new mongoose.Types.ObjectId(missionID)
    ).exec();
  };

  socket.on("initialize", (data) => {
    try {
      const { filterID } = data;
      const mission = socket.mission;
      const logs = mission ? mission.logs : null;

      let filteredLogs = logs;

      if (logs && filterID) {
        filteredLogs = logs.filter((log) => {
          return log.userID === filterID;
        });
      }

      if (!(mission.id in filtering)) {
        filtering[mission.id] = {};
      }

      // To identify which other party is being focused
      filtering[mission.id][socket.id] = filterID ? filterID : null;

      // Return the data back to the sender
      socket.emit("messagesLoaded", filteredLogs);
    } catch (err) {
      socket.emit("messagesLoaded", null);
    }
  });

  socket.on("createMessage", async (data) => {
    try {
      const { content } = data;
      const mission = socket.mission;

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

      const roomUsers = Object.entries(filtering[mission.id]);

      for (const [socketID, focusedID] of roomUsers) {
        if (focusedID == socket.id || !focusedID) {
          io.to(socketID).emit("messageCreated", newLog);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });

  socket.on("disconnect", () => {
    const mission = socket.mission;
    // delete filtering[mission.id][socket.id];
  });
});

module.exports = io;
