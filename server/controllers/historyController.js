const Resume = require("../models/Resume");

// ==========================================
// Search Resume History
// ==========================================

const searchHistory = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";

    const resumes = await Resume.find({
      user: req.user._id,
      $or: [
        {
          fileName: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
          summary: {
            $regex: keyword,
            $options: "i",
          },
        },
        {
  extractedText: {
    $regex: keyword,
    $options: "i",
  },
},
{
  skills: {
    $regex: keyword,
    $options: "i",
  },
},
      ],
    })
      .sort({ createdAt: -1 })
      .limit(8);

    res.status(200).json({
      success: true,
      resumes,
    });
  } catch (error) {
    console.error("Search Error:", error);

    res.status(500).json({
      success: false,
      message: "Search failed.",
    });
  }
};

// ==========================================
// Get Resume History
// ==========================================

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

// ==========================================
// Delete Resume
// ==========================================

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

// ==========================================
// Dashboard Stats
// ==========================================

const getStats = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    });

    const totalResumes = resumes.length;

    const averageScore =
      totalResumes === 0
        ? 0
        : Math.round(
            resumes.reduce(
              (sum, resume) =>
                sum + (resume.score || 0),
              0
            ) / totalResumes
          );

    const bestScore =
      totalResumes === 0
        ? 0
        : Math.max(
            ...resumes.map(
              (resume) => resume.score || 0
            )
          );

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

// ==========================================
// Clear History
// ==========================================

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
  searchHistory,
  getResumeHistory,
  deleteResume,
  getStats,
  clearAllHistory,
};