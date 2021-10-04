const PlayerModel = require("../models/PlayerModel");

module.exports = {
  getAllPlayers: async function (req, res) {
    const players = await PlayerModel.find({});

    if (players.length) {
      res.json(players);
    } else {
      res.status(404).json({ msg: "No players found." });
    }
  },
  createPlayer: async function (req, res) {
    try {
      const { name, clientID, turn, hand, chips, bet, fold, position } =
        req.body;
      const newPlayer = new PlayerModel({
        name,
        clientID,
        turn,
        hand,
        chips,
        bet,
        fold,
        position,
      });

      const playerEntry = await newPlayer.save();
      res.json(playerEntry);
    } catch (error) {
      res.status(422).json({ msg: "Problem trying to create player.", error });
    }
  },
  deleteAllPlayers: async function (req, res) {
    await PlayerModel.deleteMany();
    res.json({ msg: "All players deleted." });
  },
  deletePlayerByID: async function (req, res) {
    const playerID = req.params.id;

    try {
      await PlayerModel.findByIdAndDelete(playerID);
      res.json({ msg: "Player deleted." });
    } catch (error) {
      res.json({ msg: "Error deleting player.", error });
    }
  },
  updatePlayer: async function (req, res) {
    PlayerModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
      (err, doc) => {
        if (err) {
          res.json({ msg: "Error updating player.", err });
        } else {
          res.json(doc);
        }
      }
    );
  },
};
