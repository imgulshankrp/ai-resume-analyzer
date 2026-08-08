const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getLatestAnalysis,
  getActivities,
} = require("../controllers/dashboardController");


// Latest resume analysis
router.get("/latest", protect, getLatestAnalysis);


// Recent dashboard activities
router.get("/activities", protect, getActivities);


module.exports = router;