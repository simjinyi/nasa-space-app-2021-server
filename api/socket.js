const io = require("socket.io")(8081, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  socket.on("room", (data) => {
    data = JSON.parse(data);
    console.log(data);
  });

  socket.on("message", (data) => {
    data.room;
  });

  socket.on("change", (msg) => {
    socket.broadcast.emit("hello", msg);
  });
});

module.exports = io;
