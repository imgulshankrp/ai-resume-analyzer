const express = require("express");

const router = express.Router();

const {
  getResumeById,
  getResumeHistory,
  deleteResume,
} = require("../controllers/resumeController");

const protect = require("../middleware/authMiddleware");

// =========================
// Resume History
// =========================

router.get(
  "/history",
  protect,
  getResumeHistory
);

// =========================
// Resume By ID
// =========================

router.get(
  "/:id",
  protect,
  getResumeById
);

// =========================
// Delete Resume
// =========================

router.delete(
  "/:id",
  protect,
  deleteResume
);

module.exports = router;