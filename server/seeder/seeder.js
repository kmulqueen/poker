const dotenv = require("dotenv");
const players = require("./data").players;
const Player = require("../models/PlayerModel");
const connectDB = require("../db/connectDB");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear collections of any pre-existing data
    await Player.deleteMany();

    // Populate DB with test players
    await Player.insertMany(players);

    console.log("Seed data imported.");
    process.exit();
  } catch (error) {
    console.error(`Seed data import error: ${error}`);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    // Clear collections of any pre-existing data
    await Player.deleteMany();

    console.log("Seed data deleted.");
    process.exit();
  } catch (error) {
    console.error(`Seed data delete error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
