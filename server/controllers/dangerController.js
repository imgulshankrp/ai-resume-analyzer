const fs = require("fs");

const User = require("../models/User");
const Resume = require("../models/Resume");
const Notification = require("../models/Notification");

// =====================================
// Delete Account
// =====================================

const deleteAccount = async (req, res) => {
  try {
    const userId = req.user._id;

    // Delete uploaded resume files
    const resumes = await Resume.find({ user: userId });

    for (const resume of resumes) {
      if (resume.filePath) {
        const filePath = "." + resume.filePath;

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    // Delete resume records
    await Resume.deleteMany({
      user: userId,
    });

    // Delete notifications
    await Notification.deleteMany({
      user: userId,
    });

    // Delete user
    await User.findByIdAndDelete(userId);

    return res.status(200).json({
      success: true,
      message: "Account deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete account.",
    });
  }
};

// =====================================
// Delete Resume History
// =====================================

const deleteAllResumes = async (req, res) => {
  try {
    const userId = req.user._id;

    const resumes = await Resume.find({
      user: userId,
    });

    for (const resume of resumes) {
      if (resume.filePath) {
        const filePath = "." + resume.filePath;

        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }

    await Resume.deleteMany({
      user: userId,
    });

    return res.status(200).json({
      success: true,
      message: "Resume history deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete resumes.",
    });
  }
};

// =====================================
// Delete Notifications
// =====================================

const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({
      user: req.user._id,
    });

    return res.status(200).json({
      success: true,
      message: "Notifications deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete notifications.",
    });
  }
};

module.exports = {
  deleteAccount,
  deleteAllResumes,
  deleteAllNotifications,
};