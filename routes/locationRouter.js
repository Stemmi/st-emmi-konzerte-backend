const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController.js");
const showController = require("../controllers/showController.js");

router.get("/", locationController.allLocationsHandler);
router.get("/latest", locationController.latestLocationHandler);
router.get("/:id/shows", showController.showsByLocationHandler);
// router.get("/:id", locationController.locationByIdHandler);

router.post("/", locationController.postLocationHandler);

module.exports = router;