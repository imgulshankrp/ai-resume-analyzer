const pdf = require("pdf-parse");
const streamifier = require("streamifier");

const Resume = require("../models/Resume");
const Notification = require("../models/Notification");
const cloudinary = require("../config/cloudinary");

const {
  analyzeResume,
} = require("../services/resumeAnalyzer");

// =====================================
// Upload Buffer To Cloudinary
// =====================================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "resume-analyzer",

        // Upload PDF as RAW
        resource_type: "raw",

        // Keep original filename
        use_filename: true,
        unique_filename: true,

        overwrite: true,
      },

      (error, result) => {

        if (error) {
          return reject(error);
        }

        return resolve(result);

      }
    );

    streamifier
      .createReadStream(buffer)
      .pipe(uploadStream);

  });
};

// =====================================
// Upload Resume
// =====================================

const uploadResume = async (req, res) => {

  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a PDF resume.",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized.",
      });
    }

    // ==========================
    // Extract PDF Text
    // ==========================

    const pdfData = await pdf(req.file.buffer);

    if (
      !pdfData.text ||
      pdfData.text.trim() === ""
    ) {
      return res.status(400).json({
        success: false,
        message: "Unable to extract text from resume.",
      });
    }

    const extractedText = pdfData.text;

    // ==========================
    // Upload To Cloudinary
    // ==========================

    const uploadedFile = await uploadToCloudinary(
      req.file.buffer
    );

    console.log("========== CLOUDINARY ==========");
    console.log(uploadedFile);
    console.log("Secure URL :", uploadedFile.secure_url);
    console.log("URL        :", uploadedFile.url);
    console.log("Public ID  :", uploadedFile.public_id);
    console.log("Type       :", uploadedFile.type);
    console.log("Resource   :", uploadedFile.resource_type);
    console.log("================================");

    const jobDescription =
      req.body.jobDescription || "";

    const analysis = analyzeResume(
      extractedText,
      jobDescription
    );

    const highestResume =
      await Resume.findOne({
        user: req.user._id,
      }).sort({
        score: -1,
      });

    const previousHighest =
      highestResume?.score || 0;
          // ==========================
    // Save Resume
    // ==========================

    const resume = await Resume.create({

      user: req.user._id,

      fileName: req.file.originalname,

      fileSize: req.file.size,

      // Save Cloudinary URL
      filePath: uploadedFile.secure_url,

      extractedText,

      jobDescription,

      score: analysis.score,

      jobMatch: analysis.jobMatch,

      skills: analysis.skills,

      missingSkills: analysis.missingSkills,

      suggestions: analysis.suggestions,

      summary: analysis.summary,

      analysis,

      status: "completed",

      aiProvider: "Rule Based Analyzer",

    });

    // ==========================
    // Notifications
    // ==========================

    await Notification.create({

      user: req.user._id,

      title: "Resume Uploaded",

      message: `${req.file.originalname} uploaded successfully.`,

      type: "resume",

    });

    await Notification.create({

      user: req.user._id,

      title: "AI Analysis Completed",

      message: `ATS Score: ${analysis.score}%`,

      type: "analysis",

    });

    if (analysis.score > previousHighest) {

      await Notification.create({

        user: req.user._id,

        title: "New Highest ATS Score",

        message: `Congratulations! Your new highest ATS score is ${analysis.score}%.`,

        type: "analysis",

      });

    }

    // ==========================
    // Response
    // ==========================

    return res.status(201).json({

      success: true,

      message: "Resume analyzed successfully.",

      resumeId: resume._id,

      analysis: resume.analysis,

      resume,

    });

  } catch (error) {

    console.error("========== UPLOAD ERROR ==========");
    console.error(error);
    console.error("==================================");

    return res.status(500).json({

      success: false,

      message: "Resume upload failed.",

      error:
        process.env.NODE_ENV === "development"
          ? error.message
          : undefined,

    });

  }

};

module.exports = {
  uploadResume,
};