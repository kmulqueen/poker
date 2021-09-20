const router = require("express").Router();
const playersController = require("../../../controllers/playersController");

router.route("/:id/hand").post(playersController.dealPlayerHand);

router.route("/:id").delete(playersController.deletePlayerByID);

router
  .route("/")
  .get(playersController.getAllPlayers)
  .post(playersController.createPlayer)
  .delete(playersController.deleteAllPlayers);

module.exports = router;
