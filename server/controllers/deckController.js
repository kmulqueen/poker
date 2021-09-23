const DeckModel = require("../models/DeckModel");
const newDeck = require("../deck.json");

module.exports = {
  resetDeck: async function (req, res) {
    try {
      await DeckModel.deleteMany();

      res.json({ msg: "Deck reset.", deck: newDeck });
    } catch (error) {
      res.json({ msg: "Error reseting deck.", error });
    }
  },
  getDeckByID: async function (req, res) {
    try {
      const deck = await DeckModel.findById(req.params.id);

      if (Object.keys(deck).length) {
        res.status(200).json(deck);
      } else {
        res.status(404).json({ msg: "No deck found." });
      }
    } catch (error) {
      res.json({ msg: "Error finding deck.", error });
    }
  },
  updateDeck: async function (req, res) {
    DeckModel.findByIdAndUpdate(
      req.params.id,
      { deck: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ msg: "Error updating deck.", err });
        } else {
          res.json({ msg: "Deck updated.", deck: doc });
        }
      }
    );
  },
};
