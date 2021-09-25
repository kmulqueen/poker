const DeckModel = require("../models/DeckModel");
const newDeck = require("../deck.json");

module.exports = {
  createNewDeck: async function (req, res) {
    try {
      const deck = new DeckModel(req.body);
      const newDeck = await deck.save();
      res.json(newDeck).status(201);
    } catch (error) {
      res.json({ msg: "Error creating new deck.", eror }).status(422);
    }
  },
  getAllDecks: async function (req, res) {
    try {
      const decks = await DeckModel.find({});

      if (decks.length) {
        res.json(decks).status(200);
      } else {
        res.json({ msg: "No decks found." }).status(404);
      }
    } catch (error) {
      res.json({ msg: "Error getting all decks.", error }).status(500);
    }
  },
  getDeckByID: async function (req, res) {
    try {
      const deck = await DeckModel.findById(req.params.id);

      if (Object.keys(deck).length) {
        res.status(200).json(deck);
      } else {
        res.status(404).json({ msg: "No deck found." }).status(404);
      }
    } catch (error) {
      res.json({ msg: "Error finding deck.", error }).status(500);
    }
  },
  updateDeck: async function (req, res) {
    DeckModel.findByIdAndUpdate(
      req.params.id,
      { deck: req.body },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ msg: "Error updating deck.", err }).status(500);
        } else {
          res.json(doc).status(200);
        }
      }
    );
  },
  deleteAllDecks: async function (req, res) {
    try {
      await DeckModel.deleteMany();
      res.json({ msg: "All decks deleted." });
    } catch (error) {
      res.json({ msg: "Error deleting all decks.", error }).status(500);
    }
  },
  deleteDeckByID: async function (req, res) {
    try {
      await DeckModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Deck deleted." }).status(200);
    } catch (error) {
      res.json({ msg: "Error deleting deck.", error }).status(500);
    }
  },
};
