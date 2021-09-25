const router = require("express").Router();
const playersRoutes = require("./players/playersRoutes");
const deckRoutes = require("./deck/deckRoutes");
const gameRoutes = require("./game/gameRoutes");

router.use("/players", playersRoutes);
router.use("/deck", deckRoutes);
router.use("/game", gameRoutes);

module.exports = router;
