const express = require("express");
const router = express.Router();

const locationController = require("../controllers/locationController.js");

router.get("/", locationController.allLocationsHandler);
router.get("/:id", locationController.locationByIdHandler);

module.exports = router;