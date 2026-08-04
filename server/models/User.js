const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      default: "",
    },

    avatar: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    location: {
      type: String,
      default: "",
    },

    targetRole: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    github: {
      type: String,
      default: "",
    },

    linkedin: {
      type: String,
      default: "",
    },

    website: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    // ==========================
    // Authentication
    // ==========================

    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    verificationOTP: {
      type: String,
      default: "",
    },

    verificationOTPExpires: {
      type: Date,
    },

    resetPasswordOTP: {
      type: String,
      default: "",
    },

    resetPasswordOTPExpires: {
      type: Date,
    },

    lastLogin: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);