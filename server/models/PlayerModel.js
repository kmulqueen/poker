const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  clientID: { type: String },
  turn: { type: Boolean },
  hand: { type: [Object] },
  chips: { type: Number },
  fold: { type: Boolean },
  postion: { type: String },
});

const PlayerModel = mongoose.model("Player", playerSchema);
module.exports = PlayerModel;
