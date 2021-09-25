const GameModel = require("../models/GameModel");

module.exports = {
  createNewGame: async (req, res) => {
    try {
      const newGame = await GameModel.create({
        board: [],
        street: "pre-flop",
        pot: 150,
      });
      res.json(newGame).status(201);
    } catch (error) {
      res.json({ msg: "Error creating new game.", error }).status(422);
    }
  },
  getAllGames: async (req, res) => {
    try {
      const games = await GameModel.find({});
      if (games.length) {
        res.json(games).status(200);
      } else {
        res.json({ msg: "No games found." }).status(404);
      }
    } catch (error) {
      res.json({ msg: "Error getting all games.", error }).status(500);
    }
  },
  getGameByID: async (req, res) => {
    try {
      const game = await GameModel.findById(req.params.id);
      if (game !== null) {
        res.json(game).status(200);
      } else {
        res.json({ msg: "Game not found." }).status(404);
      }
    } catch (error) {
      res.json({ msg: "Error finding game by ID.", error }).status(500);
    }
  },
  updateGameByID: async (req, res) => {
    const { board, street, pot } = req.body;
    GameModel.findByIdAndUpdate(
      req.params.id,
      { board, street, pot },
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ msg: "Error updating game by ID.", err }).status(500);
        } else {
          res.json(doc).status(200);
        }
      }
    );
  },
  deleteGameByID: async (req, res) => {
    try {
      await GameModel.findByIdAndDelete(req.params.id);
      res.json({ msg: "Game deleted." }).status(200);
    } catch (error) {
      res.json({ msg: "Error deleting game by ID.", error }).status(500);
    }
  },
  deleteAllGames: async (req, res) => {
    try {
      await GameModel.deleteMany({});
      res.json({ msg: "All games deleted." }).status(200);
    } catch (error) {
      res.json({ msg: "Error deleting all games.", error }).status(500);
    }
  },
};
