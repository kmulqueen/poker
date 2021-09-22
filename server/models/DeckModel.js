const mongoose = require("mongoose");

const deckSchema = new mongoose.Schema({
  deck: { type: [Object] },
});

const DeckModel = mongoose.model("Deck", deckSchema);
module.exports = DeckModel;
