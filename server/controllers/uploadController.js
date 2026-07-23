const fs = require("fs");
const pdf = require("pdf-parse");
const Resume = require("../models/Resume");

const uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No PDF uploaded.",
      });
    }

    // Read uploaded PDF
    const dataBuffer = fs.readFileSync(req.file.path);

    // Extract text
    const data = await pdf(dataBuffer);

    const resumeText = data.text.toLowerCase();
    const jobDescription = (req.body.jobDescription || "").toLowerCase();

    const skills = [
      "html",
      "css",
      "javascript",
      "typescript",
      "react",
      "nextjs",
      "node",
      "express",
      "mongodb",
      "mysql",
      "sql",
      "python",
      "java",
      "c",
      "c++",
      "git",
      "github",
      "docker",
      "aws",
      "tailwind",
      "bootstrap",
      "redux",
      "firebase",
      "api",
      "rest",
      "graphql",
    ];

    // Resume Skills
    const foundSkills = skills.filter((skill) =>
      resumeText.includes(skill)
    );

    // JD Skills
    const jdSkills = skills.filter((skill) =>
      jobDescription.includes(skill)
    );

    // Matching Skills
    const matchedSkills = jdSkills.filter((skill) =>
      foundSkills.includes(skill)
    );

    // Missing Skills
    const missingSkills = jdSkills.filter(
      (skill) => !foundSkills.includes(skill)
    );

    // Job Match %
    const jdMatch =
      jdSkills.length > 0
        ? Math.round((matchedSkills.length / jdSkills.length) * 100)
        : 0;

    // ATS Score
    let score = 0;

    if (foundSkills.length >= 10) score += 40;
    else if (foundSkills.length >= 5) score += 30;
    else if (foundSkills.length >= 2) score += 20;
    else score += 10;

    if (resumeText.includes("project")) score += 15;
    if (resumeText.includes("education")) score += 15;
    if (resumeText.includes("experience")) score += 15;
    if (resumeText.includes("certification")) score += 10;
    if (resumeText.includes("github")) score += 5;

    if (score > 100) score = 100;

    // Suggestions
    const suggestions = [];

    if (!resumeText.includes("projects")) {
      suggestions.push("Add Projects section.");
    }

    if (!resumeText.includes("education")) {
      suggestions.push("Add Education section.");
    }

    if (!resumeText.includes("skills")) {
      suggestions.push("Add Skills section.");
    }

    if (!resumeText.includes("experience")) {
      suggestions.push("Add Experience section.");
    }

    // Resume Summary
    const summary =
      data.text.length > 350
        ? data.text.substring(0, 350) + "..."
        : data.text;

    // Save in MongoDB
   const savedResume = await Resume.create({
  user: req.user._id,

  fileName: req.file.originalname,
  fileSize: req.file.size,
  filePath: `/uploads/${req.file.filename}`,

  score,
  jobMatch: jdMatch,

  skills: foundSkills,
  missingSkills,
  suggestions,

  summary,
  extractedText: data.text,
});

    // Send Response
    res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",

      id: savedResume._id,
      filePath: savedResume.filePath,

      score,
      jobMatch: jdMatch,
      skills: foundSkills,
      summary,
      missingSkills,
      suggestions,

      // Extra fields
      foundSkills,
      jdMatch,
      text: data.text,
     
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  uploadResume,
};