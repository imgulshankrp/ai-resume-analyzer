const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");

const {
  analyzeResume,
} = require("../services/resumeAnalyzer");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded.",
      });
    }

    // Read uploaded PDF
    const buffer = fs.readFileSync(req.file.path);

    // Extract PDF text
    const pdfData = await pdf(buffer);

    const resumeText = pdfData.text;

    const jobDescription =
      req.body.jobDescription || "";

    // Analyze Resume
    const analysis = analyzeResume(
      resumeText,
      jobDescription
    );

    // Save analysis to MongoDB
    const savedResume = await Resume.create({
      user: req.user._id,

      fileName: req.file.originalname,

      fileSize: req.file.size,

      filePath: `/uploads/${req.file.filename}`,

      score: analysis.score,

      jobMatch: analysis.jobMatch,

      skills: analysis.skills,

      missingSkills:
        analysis.missingSkills,

      suggestions:
        analysis.suggestions,

      summary: analysis.summary,

      extractedText:
        analysis.extractedText,
    });
        // Delete uploaded file after processing
    if (fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    // Send response
    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",

      id: savedResume._id,

      filePath: savedResume.filePath,

      score: analysis.score,

      jobMatch: analysis.jobMatch,

      skills: analysis.skills,

      foundSkills: analysis.foundSkills,

      missingSkills: analysis.missingSkills,

      suggestions: analysis.suggestions,

      summary: analysis.summary,

      text: analysis.extractedText,
    });
  } catch (error) {
    console.error(error);

    // Delete uploaded file even if an error occurs
    if (
      req.file &&
      req.file.path &&
      fs.existsSync(req.file.path)
    ) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      message:
        error.message ||
        "Resume analysis failed.",
    });
  }
};

module.exports = {
  uploadResume,
};