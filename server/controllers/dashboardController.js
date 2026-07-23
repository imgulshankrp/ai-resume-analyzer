const Resume = require("../models/Resume");

exports.getLatestAnalysis = async (req, res) => {
  try {
    const latest = await Resume.findOne({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    if (!latest) {
      return res.status(404).json({
        success: false,
        message: "No analysis found.",
      });
    }

    res.status(200).json({
      success: true,
      analysis: latest,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard.",
    });
  }
};
