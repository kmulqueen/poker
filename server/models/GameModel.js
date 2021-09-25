const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  board: { type: [Object] },
  street: { type: String },
  pot: { type: Number },
});

const GameModel = new mongoose.model("Game", gameSchema);
module.exports = GameModel;
