const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  analyzeWithAI,
  analyzeJD,
  chatWithAI,
} = require("../controllers/aiController");

/* ==========================================
   Resume AI Analysis
========================================== */
router.post("/analyze", protect, analyzeWithAI);

/* ==========================================
   Job Description Matcher
========================================== */
router.post("/jd-match", protect, analyzeJD);

/* ==========================================
   Resume AI Chat
========================================== */
router.post("/chat", protect, chatWithAI);

module.exports = router;