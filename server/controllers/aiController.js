const { analyzeResume } = require("../services/geminiService");

const analyzeWithAI = async (req, res) => {
  console.log("AI endpoint hit");
  console.log(req.body);

  try {
    // existing code...
    const { resumeText } = req.body;

    if (!resumeText) {
      return res.status(400).json({
        success: false,
        message: "Resume text is required.",
      });
    }

    const result = await analyzeResume(resumeText);

    res.status(200).json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("AI Controller Error:");
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  analyzeWithAI,
};