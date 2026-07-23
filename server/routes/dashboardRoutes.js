const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getLatestAnalysis,
} = require("../controllers/dashboardController");

// Get latest analysis of logged-in user
router.get("/latest", protect, getLatestAnalysis);

module.exports = router;