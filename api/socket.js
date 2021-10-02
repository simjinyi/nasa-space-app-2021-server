const io = require("socket.io")(8081, {
  cors: { origin: "*" },
});

const mongoose = require("mongoose");
const Mission = require("../models/Mission");

io.on("connection", (socket) => {
  socket.on("room", (data) => {
    console.log(data);
  });

  socket.on("messageSent", async (data) => {
    io.emit("messageReceived", data);
  });

  socket.on("message", async (data) => {
    const mission = await Mission.findById(
      new mongoose.Types.ObjectId(data.missionID)
    ).exec();

    socket.emit("response", mission);
  });

  socket.on("mission", async () => {
    const mission = new Mission({});

    const data = await mission.save();
    console.log(data);
  });

  socket.on("change", (msg) => {
    socket.broadcast.emit("hello", msg);
  });
});

module.exports = io;
