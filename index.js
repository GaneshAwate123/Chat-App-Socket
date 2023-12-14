const httpServer = require("http").createServer();
const io = require("socket.io")(httpServer, {
  cors: {
    origin: "http://192.168.0.139:5500",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("join-room", (room, name) => {
    socket.join(room); 
    io.to(room).emit("user-joined", name);

    socket.on("send", (message) => {

      io.to(room).emit("receive", { message: message, name: name });
    });

    socket.on("disconnect", () => {
      io.to(room).emit("left", name);
    });
  });
});

const PORT = 8000;
const SERVER_IP ="0.0.0.0";
httpServer.listen(PORT,SERVER_IP, () => {
  console.log(`Socket.IO server is listening on port ${PORT}`);
});

