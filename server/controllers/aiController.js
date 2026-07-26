const {
  analyzeResume,
  analyzeJobDescription,
  chatWithResumeAI,
} = require("../services/geminiService");

/* =====================================================
   Resume Analysis
===================================================== */

const analyzeWithAI = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    const result = await analyzeResume(resumeText);

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Resume AI Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Job Description Matcher
===================================================== */

const analyzeJD = async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;

    if (!resumeText || !jobDescription) {
      return res.status(400).json({
        success: false,
        message: "Resume text and Job Description are required.",
      });
    }

    const result = await analyzeJobDescription(
      resumeText,
      jobDescription
    );

    return res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("JD Match Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* =====================================================
   Resume Chat Assistant
===================================================== */

const chatWithAI = async (req, res) => {
  try {
    const { resumeText, question } = req.body;

    if (!resumeText || !question) {
      return res.status(400).json({
        success: false,
        message: "Resume text and question are required.",
      });
    }

    const answer = await chatWithResumeAI(
      resumeText,
      question
    );

    return res.status(200).json({
      success: true,
      answer,
    });
  } catch (error) {
    console.error("Resume Chat Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeWithAI,
  analyzeJD,
  chatWithAI,
};