const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", userController.allUsersHandler);
router.get("/:id", userController.userByIdHandler);

module.exports = router;