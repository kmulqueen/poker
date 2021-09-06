const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
app.use(cors());
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

const PORT = 5000 || process.env.PORT;

io.on("connection", (socket) => {
  console.log("socket.io: New user connected =>", socket.id);

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected =>", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
