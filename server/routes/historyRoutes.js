const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  getResumeHistory,
  deleteResume,
} = require("../controllers/historyController");

// Get logged-in user's history
router.get("/", protect, getResumeHistory);

// Delete logged-in user's resume
router.delete("/:id", protect, deleteResume);

module.exports = router;