const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileSize: {
      type: Number,
      default: 0,
    },

    filePath: {
      type: String,
      default: "",
    },

    extractedText: {
      type: String,
      default: "",
    },

    jobDescription: {
      type: String,
      default: "",
    },

    score: {
      type: Number,
      default: 0,
    },

    jobMatch: {
      type: Number,
      default: 0,
    },

    skills: {
      type: [String],
      default: [],
    },

    missingSkills: {
      type: [String],
      default: [],
    },

    suggestions: {
      type: [String],
      default: [],
    },

    summary: {
      type: String,
      default: "",
    },

    // Store complete analysis object
    analysis: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    aiProvider: {
      type: String,
      default: "Gemini",
    },

    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "completed",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Resume", resumeSchema);