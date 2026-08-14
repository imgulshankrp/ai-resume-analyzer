const analyzeResume = (
  resumeText,
  jobDescription = ""
) => {
  // =====================================
  // Normalize text
  // =====================================

  const originalResumeText =
    String(resumeText || "");

  const originalJobDescription =
    String(jobDescription || "");

  const resume =
    originalResumeText.toLowerCase();

  const jd =
    originalJobDescription.toLowerCase();


  // =====================================
  // MASTER SKILL DATABASE
  // =====================================

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


  // =====================================
  // SAFE SKILL DETECTION
  // =====================================

  const containsSkill = (
    text,
    skill
  ) => {
    const escapedSkill =
      skill.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

    const regex =
      new RegExp(
        `(^|[^a-z0-9+#])${escapedSkill}([^a-z0-9+#]|$)`,
        "i"
      );

    return regex.test(text);
  };


  // =====================================
  // RESUME SKILLS
  // =====================================

  const foundSkills =
    skills.filter((skill) =>
      containsSkill(
        resume,
        skill
      )
    );


  // =====================================
  // GENERAL MISSING SKILLS
  //
  // These are skills from our database
  // that are NOT present in the resume.
  //
  // THIS is what Analysis page will show.
  // =====================================

  const missingSkills =
    skills.filter(
      (skill) =>
        !foundSkills.includes(skill)
    );


  // =====================================
  // JOB DESCRIPTION SKILLS
  // =====================================

  const jdSkills =
    skills.filter((skill) =>
      containsSkill(
        jd,
        skill
      )
    );


  // =====================================
  // MATCHED JD SKILLS
  // =====================================

  const matchedSkills =
    jdSkills.filter(
      (skill) =>
        foundSkills.includes(skill)
    );


  // =====================================
  // JD-SPECIFIC MISSING SKILLS
  //
  // These are ONLY skills required by
  // the Job Description but absent
  // from the resume.
  // =====================================

  const jdMissingSkills =
    jdSkills.filter(
      (skill) =>
        !foundSkills.includes(skill)
    );


  // =====================================
  // JOB MATCH SCORE
  // =====================================

  const jobMatch =
    jdSkills.length > 0
      ? Math.round(
          (
            matchedSkills.length /
            jdSkills.length
          ) * 100
        )
      : 0;


  // =====================================
  // ATS SCORE
  // =====================================

  let score = 0;


  if (foundSkills.length >= 10) {
    score += 40;

  } else if (foundSkills.length >= 5) {
    score += 30;

  } else if (foundSkills.length >= 2) {
    score += 20;

  } else {
    score += 10;
  }


  // =====================================
  // RESUME SECTIONS
  // =====================================

  if (
    /\bprojects?\b/i.test(resume)
  ) {
    score += 15;
  }


  if (
    /\beducation\b/i.test(resume)
  ) {
    score += 15;
  }


  if (
    /\bexperience\b/i.test(resume)
  ) {
    score += 15;
  }


  if (
    /\bcertifications?\b/i.test(resume)
  ) {
    score += 10;
  }


  if (
    containsSkill(
      resume,
      "github"
    )
  ) {
    score += 5;
  }


  if (score > 100) {
    score = 100;
  }


  // =====================================
  // SUGGESTIONS
  // =====================================

  const suggestions = [];


  if (
    !/\bprojects?\b/i.test(resume)
  ) {
    suggestions.push(
      "Add a Projects section to showcase practical work."
    );
  }


  if (
    !/\beducation\b/i.test(resume)
  ) {
    suggestions.push(
      "Add a clear Education section."
    );
  }


  if (
    !/\bskills?\b/i.test(resume)
  ) {
    suggestions.push(
      "Add a dedicated Skills section."
    );
  }


  if (
    !/\bexperience\b/i.test(resume)
  ) {
    suggestions.push(
      "Add an Experience section with measurable achievements."
    );
  }


  if (
    !/\bcertifications?\b/i.test(resume)
  ) {
    suggestions.push(
      "Add relevant certifications if available."
    );
  }


  if (
    !containsSkill(
      resume,
      "github"
    )
  ) {
    suggestions.push(
      "Add your GitHub profile or relevant project repositories."
    );
  }


  // =====================================
  // SUMMARY
  // =====================================

  const summary =
    originalResumeText.length > 350
      ? originalResumeText.substring(
          0,
          350
        ) + "..."
      : originalResumeText;


  // =====================================
  // DEBUG
  // =====================================

  console.log(
    "========== RESUME ANALYSIS =========="
  );

  console.log(
    "Found Skills:",
    foundSkills
  );

  console.log(
    "General Missing Skills:",
    missingSkills
  );

  console.log(
    "JD Skills:",
    jdSkills
  );

  console.log(
    "Matched JD Skills:",
    matchedSkills
  );

  console.log(
    "JD Missing Skills:",
    jdMissingSkills
  );

  console.log(
    "====================================="
  );


  // =====================================
  // RETURN
  // =====================================

  return {
    score,

    jobMatch,

    // Resume skills
    skills: foundSkills,

    foundSkills,

    // GENERAL MISSING SKILLS
    // Analysis page uses this
    missingSkills,

    // JD information
    jdSkills,

    matchedSkills,

    // JD-specific missing skills
    jdMissingSkills,

    suggestions,

    summary,

    extractedText:
      originalResumeText,
  };
};


module.exports = {
  analyzeResume,
};