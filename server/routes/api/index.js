const router = require("express").Router();
const playersRoutes = require("./players/playersRoutes");

router.use("/players", playersRoutes);

module.exports = router;
