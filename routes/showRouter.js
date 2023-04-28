const express = require("express");
const router = express.Router();

const showController = require("../controllers/showController");
const bandController = require("../controllers/bandController");

router.get("/", showController.allShowsHandler);
// router.get("/latest", showController.latestShowHandler);
router.get("/:id", showController.showByIdHandler);
router.get("/:id/bands", bandController.bandsByShowHandler);

module.exports = router;