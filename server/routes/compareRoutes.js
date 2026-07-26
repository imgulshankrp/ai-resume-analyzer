const express = require("express");
const multer = require("multer");

const {
  compareController,
} = require("../controllers/compareController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
});

router.post(
  "/",
  protect,
  upload.fields([
    {
      name: "resume1",
      maxCount: 1,
    },
    {
      name: "resume2",
      maxCount: 1,
    },
  ]),
  compareController
);

module.exports = router;