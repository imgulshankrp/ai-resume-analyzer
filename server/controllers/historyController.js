const Resume = require("../models/Resume");

// Get logged-in user's resume history
const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch resume history.",
    });
  }
};

// Delete logged-in user's resume
const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete resume.",
    });
  }
};

// Dashboard statistics
const getStats = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    });

    const totalResumes = resumes.length;

    const averageScore =
      totalResumes > 0
        ? Math.round(
            resumes.reduce((sum, resume) => sum + (resume.score || 0), 0) /
              totalResumes
          )
        : 0;

    const bestScore =
      totalResumes > 0
        ? Math.max(...resumes.map((resume) => resume.score || 0))
        : 0;

    res.status(200).json({
      success: true,
      totalResumes,
      averageScore,
      bestScore,
      totalAIAnalysis: totalResumes,
    });
  } catch (error) {
    console.error("Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard statistics.",
    });
  }
};
// Clear all resume history
const clearAllHistory = async (req, res) => {
  try {
    await Resume.deleteMany({
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: "All resume history deleted successfully.",
    });
  } catch (error) {
    console.error("Clear History Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to clear resume history.",
    });
  }
};

module.exports = {
  getResumeHistory,
  deleteResume,
  getStats,
  clearAllHistory,
};