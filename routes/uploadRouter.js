const express = require("express");
const router = express.Router();
const multer  = require('multer');
const uploadController = require("../controllers/uploadController");

const posterStorage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/posters/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})

const posters = multer({ storage: posterStorage })

router.post("/poster", posters.single('poster'), uploadController.postPosterHandler);

module.exports = router;