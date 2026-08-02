const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/resumeAnalyzer");

// =====================================
// Upload Resume
// =====================================

const uploadResume = async (req, res) => {
  try {
    // Validate uploaded file

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Validate authenticated user

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // Check uploaded file exists

    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file not found.",
      });
    }

    // Read PDF

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

    // =====================================
    // AI / Rule Based Analysis
    // =====================================

    const analysis = analyzeResume(
      extractedText,
      jobDescription
    );

    // =====================================
    // Save Resume
    // =====================================

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

    // =====================================
    // Response
    // =====================================

    return res.status(201).json({
      success: true,

      message: "Resume analyzed successfully.",

      resumeId: resume._id,

      analysis: resume.analysis,

      resume,
    });

  } catch (error) {

    console.error("UPLOAD ERROR");
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