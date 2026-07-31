const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getResumeHistory,
  deleteResume,
  getStats,
  clearAllHistory,
} = require("../controllers/historyController");

// Get logged-in user's resume history
router.get("/", protect, getResumeHistory);

// Dashboard statistics
router.get("/stats", protect, getStats);

// Clear all resume history
router.delete("/clear", protect, clearAllHistory);

// Delete resume
router.delete("/:id", protect, deleteResume);

module.exports = router;