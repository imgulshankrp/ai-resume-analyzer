const User = require("../models/User");
const Resume = require("../models/Resume");
const Notification = require("../models/Notification");

// =====================================
// Get Logged In User Profile
// =====================================

const getProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // ==========================
    // Resume Statistics
    // ==========================

    const totalResumes =
      await Resume.countDocuments({
        user: req.user._id,
      });

    const highestResume =
      await Resume.findOne({
        user: req.user._id,
      }).sort({
        score: -1,
      });

    const totalChats =
      await Resume.countDocuments({
        user: req.user._id,
        status: "completed",
      });

    return res.status(200).json({
      success: true,
      user: {
        ...user.toObject(),

        totalResumes,

        highestATS: highestResume
          ? highestResume.score
          : 0,

        totalChats,
      },
    });

  } catch (error) {

    console.error(
      "GET PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch profile.",
    });

  }
};

// =====================================
// Update Profile
// =====================================

const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const {
      name,
      bio,
      phone,
      location,
      targetRole,
      experience,
      education,
      skills,
      github,
      linkedin,
      website,
    } = req.body;

    user.name =
      name ?? user.name;

    user.bio =
      bio ?? user.bio;

    user.phone =
      phone ?? user.phone;

    user.location =
      location ?? user.location;

    user.targetRole =
      targetRole ?? user.targetRole;

    user.experience =
      experience ?? user.experience;

    user.education =
      education ?? user.education;

    user.github =
      github ?? user.github;

    user.linkedin =
      linkedin ?? user.linkedin;

    user.website =
      website ?? user.website;

    if (Array.isArray(skills)) {
      user.skills = skills;
    }

    await user.save();

    // ==========================
    // Create Notification
    // ==========================

    await Notification.create({

      user: user._id,

      title: "Profile Updated",

      message:
        "Your profile has been updated successfully.",

      type: "profile",

    });

    return res.status(200).json({

      success: true,

      message:
        "Profile updated successfully.",

      user,

    });

  } catch (error) {

    console.error(
      "UPDATE PROFILE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update profile.",
    });

  }
};

// =====================================
// Upload Avatar
// =====================================

const uploadAvatar = async (req, res) => {

  try {

    const user =
      await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded.",
      });
    }

    user.avatar =
      `/uploads/${req.file.filename}`;

    await user.save();
        // ==========================
    // Create Notification
    // ==========================

    await Notification.create({

      user: user._id,

      title: "Profile Photo Updated",

      message:
        "Your profile picture has been updated successfully.",

      type: "profile",

    });

    return res.status(200).json({

      success: true,

      message: "Profile picture uploaded successfully.",

      avatar: user.avatar,

      user,

    });

  } catch (error) {

    console.error(
      "UPLOAD AVATAR ERROR:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to upload profile picture.",

    });

  }

};

// =====================================
// Exports
// =====================================

module.exports = {

  getProfile,

  updateProfile,

  uploadAvatar,

};