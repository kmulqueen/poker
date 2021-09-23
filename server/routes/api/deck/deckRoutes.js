const router = require("express").Router();
const deckController = require("../../../controllers/deckController");

router.route("/reset").get(deckController.resetDeck);
router
  .route("/:id")
  .get(deckController.getDeckByID)
  .post(deckController.updateDeck);

module.exports = router;
