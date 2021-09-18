const express = require("express");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const connectDB = require("./db/connectDB");

dotenv.config();

// Connect to DB
connectDB();

// Create express app instance
const app = express();
app.use(cors());
const server = http.createServer(app);

// Create socket.io connection
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("socket.io: New user connected =>", socket.id);

  socket.on("get-players", (data) => {
    io.emit("get-players", data);
  });

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected =>", socket.id);
  });
});

// Start server
const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
