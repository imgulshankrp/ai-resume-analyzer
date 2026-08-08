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
    console.error("Latest Analysis Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load latest analysis.",
    });
  }
};


exports.getActivities = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("originalName filename createdAt score atsScore");

    const activities = [];

    resumes.forEach((resume) => {
      const resumeName =
        resume.originalName ||
        resume.filename ||
        "Resume";

      const score =
        resume.atsScore ??
        resume.score ??
        null;

      // Resume uploaded
      activities.push({
        id: `upload-${resume._id}`,
        title: "Resume Uploaded",
        description: `${resumeName} was uploaded successfully.`,
        time: resume.createdAt,
        type: "upload",
      });

      // ATS analysis
      activities.push({
        id: `analysis-${resume._id}`,
        title: "ATS Analysis Completed",
        description:
          score !== null
            ? `Resume analysis completed with an ATS score of ${score}%.`
            : "AI generated your ATS analysis and suggestions.",
        time: resume.createdAt,
        type: "analysis",
      });
    });

    activities.sort(
      (a, b) => new Date(b.time) - new Date(a.time)
    );

    res.status(200).json({
      success: true,
      activities: activities.slice(0, 6),
    });
  } catch (error) {
    console.error("Dashboard Activities Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard activities.",
    });
  }
};