const express = require("express");
const router = express.Router();

const bandController = require("../controllers/bandController");

// router.get("/", bandController.allBandsHandler);
// router.get("/:id", bandController.bandByIdHandler);

router.post("/", bandController.postBandHandler);


module.exports = router;