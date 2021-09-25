const router = require("express").Router();
const deckController = require("../../../controllers/deckController");

router
  .route("/:id")
  .get(deckController.getDeckByID)
  .post(deckController.updateDeck)
  .delete(deckController.deleteDeckByID);

router
  .route("/")
  .get(deckController.getAllDecks)
  .post(deckController.createNewDeck)
  .delete(deckController.deleteAllDecks);

module.exports = router;
