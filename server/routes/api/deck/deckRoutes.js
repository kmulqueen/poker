const router = require("express").Router();
const deckController = require("../../../controllers/deckController");

router.route("/reset").get(deckController.resetDeck);

router.route("/").get(deckController.getDeck).post(deckController.updateDeck);
