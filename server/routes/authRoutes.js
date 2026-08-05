const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  register,
  login,
  verifyEmail,
  resendOTP,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
  changePassword,
} = require("../controllers/authController");

// Register
router.post("/register", register);

// Login
router.post("/login", login);

// Verify Email
router.post("/verify-email", verifyEmail);

// Resend OTP
router.post("/resend-otp", resendOTP);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Verify Reset OTP
router.post("/verify-reset-otp", verifyResetOTP);

// Reset Password
router.post("/reset-password", resetPassword);

// Change Password
router.put("/change-password", protect, changePassword);

module.exports = router;