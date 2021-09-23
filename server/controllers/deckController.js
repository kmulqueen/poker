const DeckModel = require("../models/DeckModel");
const newDeck = require("../deck.json");

module.exports = {
  resetDeck: async function (req, res) {
    await DeckModel.deleteMany();

    res.json({ msg: "Deck reset.", deck: newDeck });
  },
  getDeck: async function (req, res) {
    const deck = await DeckModel.find();

    res.json(deck);
  },
  updateDeck: async function (req, res) {},
};
