const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const dotenv = require("dotenv");
const { Server } = require("socket.io");
const routes = require("./routes");

dotenv.config();

// Create express app instance
const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
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

  socket.on("disconnect", () => {
    console.log("socket.io: User disconnected =>", socket.id);
  });
});

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const connection = mongoose.connection;

connection.once("open", () => {
  console.log(`MongoDB Connected.`);

  // Set up change streams
  console.log("MongoDB: Setting up change streams...");

  const playerChangeStreams = connection.collection("players").watch();
  const deckChangeStreams = connection
    .collection("decks")
    .watch([], { fullDocument: "updateLookup" });

  playerChangeStreams.on("change", (change) => {
    io.emit("get-players", JSON.stringify(change.fullDocument));
  });

  deckChangeStreams.on("change", (change) => {
    io.emit("get-deck", JSON.stringify(change.fullDocument));
  });
});

// Start server
const PORT = 5000 || process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
