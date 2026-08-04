const express = require("express");

const router = express.Router();

const {
  googleLogin,
} = require("../controllers/googleController");

// ======================================
// Google Sign In
// ======================================

router.post(
  "/login",
  googleLogin
);

module.exports = router;