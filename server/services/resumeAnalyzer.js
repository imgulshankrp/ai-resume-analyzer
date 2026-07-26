const analyzeResume = (resumeText, jobDescription = "") => {
  resumeText = resumeText.toLowerCase();
  jobDescription = jobDescription.toLowerCase();

  const skills = [
    "html",
    "css",
    "javascript",
    "typescript",
    "react",
    "nextjs",
    "node",
    "express",
    "mongodb",
    "mysql",
    "sql",
    "python",
    "java",
    "c",
    "c++",
    "git",
    "github",
    "docker",
    "aws",
    "tailwind",
    "bootstrap",
    "redux",
    "firebase",
    "api",
    "rest",
    "graphql",
  ];

  const foundSkills = skills.filter((skill) =>
    resumeText.includes(skill)
  );

  const jdSkills = skills.filter((skill) =>
    jobDescription.includes(skill)
  );

  const matchedSkills = jdSkills.filter((skill) =>
    foundSkills.includes(skill)
  );

  const missingSkills = jdSkills.filter(
    (skill) => !foundSkills.includes(skill)
  );

  const jdMatch =
    jdSkills.length > 0
      ? Math.round(
          (matchedSkills.length / jdSkills.length) * 100
        )
      : 0;

  let score = 0;

  if (foundSkills.length >= 10) score += 40;
  else if (foundSkills.length >= 5) score += 30;
  else if (foundSkills.length >= 2) score += 20;
  else score += 10;

  if (resumeText.includes("project")) score += 15;
  if (resumeText.includes("education")) score += 15;
  if (resumeText.includes("experience")) score += 15;
  if (resumeText.includes("certification")) score += 10;
  if (resumeText.includes("github")) score += 5;

  if (score > 100) score = 100;

  const suggestions = [];

  if (!resumeText.includes("projects")) {
    suggestions.push("Add Projects section.");
  }

  if (!resumeText.includes("education")) {
    suggestions.push("Add Education section.");
  }

  if (!resumeText.includes("skills")) {
    suggestions.push("Add Skills section.");
  }

  if (!resumeText.includes("experience")) {
    suggestions.push("Add Experience section.");
  }

  const summary =
    resumeText.length > 350
      ? resumeText.substring(0, 350) + "..."
      : resumeText;

  return {
    score,
    jobMatch: jdMatch,
    skills: foundSkills,
    foundSkills,
    missingSkills,
    suggestions,
    summary,
    extractedText: resumeText,
  };
};

module.exports = {
  analyzeResume,
};