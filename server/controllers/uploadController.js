const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/resumeAnalyzer");

const uploadResume = async (req, res) => {
  try {
    // Check file
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    // Check authenticated user
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "User authentication failed.",
      });
    }

    // Check file exists
    if (!fs.existsSync(req.file.path)) {
      return res.status(500).json({
        success: false,
        message: "Uploaded file not found on server.",
      });
    }

    // Read PDF
    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(buffer);

    if (!pdfData.text || pdfData.text.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from PDF.",
      });
    }

    const resumeText = pdfData.text;
    const jobDescription = req.body.jobDescription || "";

    // Analyze Resume
    const analysis = analyzeResume(resumeText, jobDescription);

    // Save to MongoDB
    const savedResume = await Resume.create({
      user: req.user._id,
      fileName: req.file.originalname,
      fileSize: req.file.size,
      filePath: `/uploads/${req.file.filename}`,
      score: analysis.score,
      jobMatch: analysis.jobMatch,
      skills: analysis.skills,
      missingSkills: analysis.missingSkills,
      suggestions: analysis.suggestions,
      summary: analysis.summary,
      extractedText: resumeText,
    });

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: {
        id: savedResume._id,
        fileName: savedResume.fileName,
        filePath: savedResume.filePath,
        score: savedResume.score,
        jobMatch: savedResume.jobMatch,
        skills: savedResume.skills,
        missingSkills: savedResume.missingSkills,
        suggestions: savedResume.suggestions,
        summary: savedResume.summary,
        extractedText: resumeText,
      },
    });
  } catch (error) {
    console.error("========== UPLOAD ERROR ==========");
    console.error(error);
    console.error("==================================");

    return res.status(500).json({
      success: false,
      message: error.message,
      error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

module.exports = { uploadResume };