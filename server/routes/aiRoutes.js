const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const { analyzeWithAI } = require("../controllers/aiController");

router.post("/analyze", protect, analyzeWithAI);

module.exports = router;