const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const avatarUpload = require("../middleware/avatarUpload");

const {
  getProfile,
  updateProfile,
  uploadAvatar,
} = require("../controllers/profileController");

// =====================================
// Get Logged In User Profile
// =====================================
router.get(
  "/",
  protect,
  getProfile
);

// =====================================
// Update Profile
// =====================================
router.put(
  "/",
  protect,
  updateProfile
);

// =====================================
// Upload Profile Avatar
// =====================================
router.post(
  "/avatar",
  protect,
  avatarUpload.single("avatar"),
  uploadAvatar
);

module.exports = router;