const io = require("socket.io")(8081, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log(`Socket connected!`);
});

module.exports = io;
