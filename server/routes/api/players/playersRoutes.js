const router = require("express").Router();
const playersController = require("../../../controllers/playersController");

router
  .route("/")
  .get(playersController.getAllPlayers)
  .post(playersController.createPlayer)
  .delete(playersController.deleteAllPlayers);

module.exports = router;
