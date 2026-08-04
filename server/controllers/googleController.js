const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID
);

// ======================================
// Google Sign In
// ======================================

const googleLogin = async (req, res) => {
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required.",
      });
    }

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const {
      email,
      name,
      picture,
      email_verified,
    } = payload;

    if (!email_verified) {
      return res.status(400).json({
        success: false,
        message: "Google account is not verified.",
      });
    }

    // Find existing user
    let user = await User.findOne({ email });

    // Create user if not found
    if (!user) {
      user = await User.create({
        name,
        email,
        avatar: picture,
        password: "",
        isVerified: true,
        provider: "google",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });

  } catch (error) {

    console.error("Google Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Google login failed.",
    });

  }
};

module.exports = {
  googleLogin,
};