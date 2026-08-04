const Resume = require("../models/Resume");

// ===============================
// Get Resume By ID
// ===============================
const getResumeById = async (req, res) => {
  try {
    const { id } = req.params;

    const resume = await Resume.findById(id);

    if (!resume) {
      return res.status(404).json({
        success: false,
        message: "Resume not found.",
      });
    }

    return res.status(200).json({
      success: true,
      resume,
    });
  } catch (error) {
    console.error("GET RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume.",
    });
  }
};

// ===============================
// Get Logged-in User Resume History
// ===============================
const getResumeHistory = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .select(
  "_id fileName filePath fileSize score jobMatch skills missingSkills suggestions summary extractedText createdAt"
);

    return res.status(200).json({
      success: true,
      count: resumes.length,
      resumes,
    });
  } catch (error) {
    console.error("GET HISTORY ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch history.",
    });
  }
};

// ===============================
// Delete Resume
// ===============================
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

    await Resume.findByIdAndDelete(id);

    return res.status(200).json({
      success: true,
      message: "Resume deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE RESUME ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resume.",
    });
  }
};

module.exports = {
  getResumeById,
  getResumeHistory,
  deleteResume,
};