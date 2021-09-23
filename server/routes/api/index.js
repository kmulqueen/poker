const router = require("express").Router();
const playersRoutes = require("./players/playersRoutes");
const deckRoutes = require("./deck/deckRoutes");

router.use("/players", playersRoutes);
router.use("/deck", deckRoutes);

module.exports = router;
