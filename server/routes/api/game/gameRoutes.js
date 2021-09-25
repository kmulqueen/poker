const router = require("express").Router();
const gameController = require("../../../controllers/gameController");

router
  .route("/:id")
  .get(gameController.getGameByID)
  .post(gameController.updateGameByID)
  .delete(gameController.deleteGameByID);

router
  .route("/")
  .get(gameController.getAllGames)
  .post(gameController.createNewGame)
  .delete(gameController.deleteAllGames);

module.exports = router;
