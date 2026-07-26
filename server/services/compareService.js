const compareResumes = (resume1, resume2) => {
  const recommendation =
    resume1.score > resume2.score
      ? "Resume A performs better. It has a higher ATS score and is recommended."
      : resume2.score > resume1.score
      ? "Resume B performs better. It has a higher ATS score and is recommended."
      : "Both resumes have similar ATS scores.";

  return {
    resume1: {
      score: resume1.score,
      skills: resume1.skills || [],
      missingSkills: resume1.missingSkills || [],
      suggestions: resume1.suggestions || [],
    },

    resume2: {
      score: resume2.score,
      skills: resume2.skills || [],
      missingSkills: resume2.missingSkills || [],
      suggestions: resume2.suggestions || [],
    },

    recommendation,
  };
};

module.exports = {
  compareResumes,
};