const express = require("express");
const router = express.Router();

const showController = require("../controllers/showController");
const bandController = require("../controllers/bandController");

router.get("/", showController.allShowsHandler);
router.get("/:id", showController.showByIdHandler);
router.get("/:id/bands", bandController.bandsByShowHandler);

router.post("/", showController.postShowHandler);
router.put("/:id", showController.putShowHandler);
router.delete("/:id", showController.deleteShowHandler);

module.exports = router;