const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  deleteAccount,
  deleteAllResumes,
  deleteAllNotifications,
} = require("../controllers/dangerController");

// =====================================
// Delete Account
// =====================================

router.delete(
  "/account",
  protect,
  deleteAccount
);

// =====================================
// Delete Resume History
// =====================================

router.delete(
  "/resumes",
  protect,
  deleteAllResumes
);

// =====================================
// Delete Notifications
// =====================================

router.delete(
  "/notifications",
  protect,
  deleteAllNotifications
);

module.exports = router;