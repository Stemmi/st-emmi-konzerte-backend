const express = require("express");
const router = express.Router();

const showController = require("../controllers/showController");

router.get("/", showController.allShowsHandler);
router.get("/latest", showController.latestShowHandler);
router.get("/at/:locationId", showController.showsByLocationHandler);
router.get("/:id", showController.showByIdHandler);

module.exports = router;