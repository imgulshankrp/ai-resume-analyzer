const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const Notification = require("../models/Notification");

const {
  analyzeResume,
} = require("../services/resumeAnalyzer");

// =====================================
// Upload Resume
// =====================================

const uploadResume = async (req, res) => {
  try {

    // ==========================
    // Validate File
    // ==========================

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // ==========================
    // Validate User
    // ==========================

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // ==========================
    // File Exists
    // ==========================

    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file not found.",
      });
    }

    // ==========================
    // Read Resume
    // ==========================

    const buffer = fs.readFileSync(req.file.path);

    const pdfData = await pdf(buffer);

    if (!pdfData.text || pdfData.text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume.",
      });
    }

    const extractedText = pdfData.text;

    const jobDescription =
      req.body.jobDescription || "";

    // ==========================
    // Analyze Resume
    // ==========================

    const analysis = analyzeResume(
      extractedText,
      jobDescription
    );

    // ==========================
    // Highest Existing Score
    // ==========================

    const highestResume =
      await Resume.findOne({
        user: req.user._id,
      }).sort({
        score: -1,
      });

    const previousHighest =
      highestResume?.score || 0;

    // ==========================
    // Save Resume
    // ==========================

    const resume = await Resume.create({

      user: req.user._id,

      fileName: req.file.originalname,

      fileSize: req.file.size,

      filePath: `/uploads/${req.file.filename}`,

      extractedText,

      jobDescription,

      score: analysis.score,

      jobMatch: analysis.jobMatch,

      skills: analysis.skills,

      missingSkills: analysis.missingSkills,

      suggestions: analysis.suggestions,

      summary: analysis.summary,

      analysis,

      status: "completed",

      aiProvider: "Rule Based Analyzer",

    });

    // ==========================
    // Notification
    // Resume Uploaded
    // ==========================

    await Notification.create({

      user: req.user._id,

      title: "Resume Uploaded",

      message: `${req.file.originalname} uploaded successfully.`,

      type: "resume",

    });

    // ==========================
    // Notification
    // AI Analysis Completed
    // ==========================

    await Notification.create({

      user: req.user._id,

      title: "AI Analysis Completed",

      message: `ATS Score: ${analysis.score}%`,

      type: "analysis",

    });

    // ==========================
    // Notification
    // New Highest ATS
    // ==========================

    if (analysis.score > previousHighest) {

      await Notification.create({

        user: req.user._id,

        title: "New Highest ATS Score",

        message: `Congratulations! Your new highest ATS score is ${analysis.score}%.`,

        type: "analysis",

      });

    }
        // ==========================
    // Response
    // ==========================

    return res.status(201).json({

      success: true,

      message: "Resume analyzed successfully.",

      resumeId: resume._id,

      analysis: resume.analysis,

      resume,

    });

  } catch (error) {

    console.error("UPLOAD ERROR:");
    console.error(error);

    return res.status(500).json({

      success: false,

      message: "Resume upload failed.",

      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,

    });

  }

};

module.exports = {
  uploadResume,
};