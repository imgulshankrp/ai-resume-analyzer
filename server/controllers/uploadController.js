const fs = require("fs");
const pdf = require("pdf-parse");

const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/resumeAnalyzer");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded.",
      });
    }

    const buffer = fs.readFileSync(req.file.path);
    const pdfData = await pdf(buffer);

    const resumeText = pdfData.text;
    const jobDescription = req.body.jobDescription || "";

    const analysis = analyzeResume(resumeText, jobDescription);

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
      extractedText: analysis.extractedText,
    });

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      analysis: {
        id: savedResume._id,
        fileName: savedResume.fileName,
        filePath: savedResume.filePath,
        score: analysis.score,
        jobMatch: analysis.jobMatch,
        skills: analysis.skills,
        foundSkills: analysis.foundSkills,
        missingSkills: analysis.missingSkills,
        suggestions: analysis.suggestions,
        summary: analysis.summary,
        extractedText: analysis.extractedText,
      },
    });
  } catch (error) {
    console.error("Upload Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Resume analysis failed.",
    });
  }
};

module.exports = { uploadResume };