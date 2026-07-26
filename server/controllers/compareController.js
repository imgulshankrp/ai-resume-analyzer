const fs = require("fs");
const pdf = require("pdf-parse");

const {
  analyzeResume,
} = require("../services/resumeAnalyzer");

const {
  compareResumes,
} = require("../services/compareService");

const compareController = async (req, res) => {
  try {
    if (
      !req.files ||
      !req.files.resume1 ||
      !req.files.resume2
    ) {
      return res.status(400).json({
        success: false,
        message: "Please upload both resumes.",
      });
    }

    const resume1 = req.files.resume1[0];
    const resume2 = req.files.resume2[0];

    const pdf1 = await pdf(
      fs.readFileSync(resume1.path)
    );

    const pdf2 = await pdf(
      fs.readFileSync(resume2.path)
    );

    const analysis1 = analyzeResume(pdf1.text);

    const analysis2 = analyzeResume(pdf2.text);

    const result = compareResumes(
      analysis1,
      analysis2
    );

    if (fs.existsSync(resume1.path))
      fs.unlinkSync(resume1.path);

    if (fs.existsSync(resume2.path))
      fs.unlinkSync(resume2.path);

    return res.json(result);
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Comparison failed.",
    });
  }
};

module.exports = {
  compareController,
};