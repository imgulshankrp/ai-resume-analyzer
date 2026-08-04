const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Notification = require("../models/Notification");
const sendEmail = require("../utils/sendEmail");

// =====================================
// Register
// =====================================

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate 6-digit OTP
    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isVerified: false,
      verificationOTP: otp,
      verificationOTPExpires: new Date(
        Date.now() + 10 * 60 * 1000
      ),
    });

    await sendEmail({
      to: email,
      subject: "ResumeAI - Verify Your Email",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px;">
          <h2>Welcome to ResumeAI 👋</h2>

          <p>Hello <strong>${name}</strong>,</p>

          <p>Your verification code is:</p>

          <h1 style="letter-spacing:6px;color:#2563eb;">
            ${otp}
          </h1>

          <p>This code will expire in <b>10 minutes</b>.</p>

          <hr>

          <small>
            If you didn't create this account,
            you can safely ignore this email.
          </small>
        </div>
      `,
    });

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please verify your email.",
      email,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Registration failed.",
    });
  }
};

// =====================================
// Login
// =====================================

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        verified: false,
        message:
          "Please verify your email before logging in.",
      });
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET ||
        "resumeanalyzer",
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Login failed.",
    });
  }
};
// =====================================
// Verify Email
// =====================================

const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message: "Email already verified.",
      });
    }

    if (
      user.verificationOTP !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (
      new Date() >
      user.verificationOTPExpires
    ) {
      return res.status(400).json({
        success: false,
        message: "OTP has expired.",
      });
    }

    user.isVerified = true;

    user.verificationOTP = null;

    user.verificationOTPExpires =
      null;

    await user.save();

    await Notification.create({
      user: user._id,
      title: "Email Verified",
      message:
        "Your email has been verified successfully.",
      type: "profile",
    });

    res.status(200).json({
      success: true,
      message:
        "Email verified successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Email verification failed.",
    });
  }
};

// =====================================
// Resend OTP
// =====================================

const resendOTP = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        success: false,
        message:
          "Email is already verified.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationOTP = otp;

    user.verificationOTPExpires =
      new Date(
        Date.now() +
          10 * 60 * 1000
      );

    await user.save();

    await sendEmail({
      to: email,
      subject:
        "ResumeAI - New Verification OTP",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">

          <h2>ResumeAI</h2>

          <p>Your new verification code is</p>

          <h1 style="letter-spacing:6px;color:#2563eb">

            ${otp}

          </h1>

          <p>
            This OTP expires in
            <strong>10 minutes</strong>.
          </p>

        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "New OTP sent successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to resend OTP.",
    });
  }
};
// =====================================
// Forgot Password
// =====================================

const forgotPassword = async (
  req,
  res
) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const otp = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    user.verificationOTP = otp;

    user.verificationOTPExpires =
      new Date(
        Date.now() +
          10 * 60 * 1000
      );

    await user.save();

    await sendEmail({
      to: email,
      subject:
        "ResumeAI - Reset Password OTP",
      html: `
        <div style="font-family:Arial,sans-serif;padding:20px">

          <h2>ResumeAI Password Reset</h2>

          <p>Your password reset code is</p>

          <h1 style="letter-spacing:6px;color:#2563eb">

            ${otp}

          </h1>

          <p>
            This OTP expires in
            <strong>10 minutes</strong>.
          </p>

        </div>
      `,
    });

    res.status(200).json({
      success: true,
      message:
        "Password reset OTP sent.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to send OTP.",
    });
  }
};

// =====================================
// Verify Reset OTP
// =====================================

const verifyResetOTP = async (
  req,
  res
) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (
      user.verificationOTP !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (
      new Date() >
      user.verificationOTPExpires
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP has expired.",
      });
    }

    res.status(200).json({
      success: true,
      message: "OTP verified.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "OTP verification failed.",
    });
  }
};

// =====================================
// Reset Password
// =====================================

const resetPassword = async (
  req,
  res
) => {
  try {
    const {
      email,
      otp,
      password,
    } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (
      user.verificationOTP !== otp
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP.",
      });
    }

    if (
      new Date() >
      user.verificationOTPExpires
    ) {
      return res.status(400).json({
        success: false,
        message:
          "OTP has expired.",
      });
    }

    user.password =
      await bcrypt.hash(
        password,
        10
      );

    user.verificationOTP = null;

    user.verificationOTPExpires =
      null;

    await user.save();

    await Notification.create({
      user: user._id,
      title: "Password Reset",
      message:
        "Your password has been reset successfully.",
      type: "security",
    });

    res.status(200).json({
      success: true,
      message:
        "Password reset successful.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to reset password.",
    });
  }
};
// =====================================
// Change Password
// =====================================

const changePassword = async (
  req,
  res
) => {
  try {
    const {
      currentPassword,
      newPassword,
    } = req.body;

    if (
      !currentPassword ||
      !newPassword
    ) {
      return res.status(400).json({
        success: false,
        message:
          "All fields are required.",
      });
    }

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message:
          "Current password is incorrect.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    await Notification.create({
      user: user._id,
      title: "Password Changed",
      message:
        "Your password was changed successfully.",
      type: "security",
    });

    res.status(200).json({
      success: true,
      message:
        "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message:
        "Failed to update password.",
    });
  }
};

// =====================================
// Exports
// =====================================

module.exports = {
  register,
  login,

  verifyEmail,
  resendOTP,

  forgotPassword,
  verifyResetOTP,
  resetPassword,

  changePassword,
};