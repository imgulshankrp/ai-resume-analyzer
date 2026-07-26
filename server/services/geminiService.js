const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

/* ======================================================
   Resume Analysis
====================================================== */

const analyzeResume = async (resumeText) => {
  try {
    const prompt = `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Do not include markdown.
Do not include \`\`\`.
Do not include explanations.

Return this exact JSON:

{
  "summary":"string",
  "strengths":["string"],
  "weaknesses":["string"],
  "suggestions":["string"],
  "atsScore":0
}

Resume:

${resumeText}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return text;
  } catch (error) {
    console.error("Gemini Resume Error:", error);
    throw error;
  }
};

/* ======================================================
   Job Description Matching
====================================================== */

const analyzeJobDescription = async (resumeText, jobDescription) => {
  try {
    const prompt = `
You are an ATS Job Matching AI.

Compare the resume with the job description.

Return ONLY valid JSON.

Do not include markdown.
Do not include explanations.
Do not wrap inside \`\`\`.

Return exactly this format:

{
  "matchScore":0,
  "matchedSkills":[""],
  "missingSkills":[""],
  "recommendations":[""]
}

Resume:

${resumeText}

---------------------------------------

Job Description:

${jobDescription}
`;

    const response = await ai.models.generateContent({
     model: "gemini-3.6-flash",
      contents: prompt,
    });

    let text = response.text.trim();

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return text;
  } catch (error) {
    console.error("Gemini JD Error:", error);
    throw error;
  }
};

/* ======================================================
   Resume AI Chat
====================================================== */

const chatWithResumeAI = async (resumeText, question) => {
  try {
    const prompt = `
You are an expert Resume Coach and ATS Expert.

The user has uploaded the following resume.

Resume:

${resumeText}

-----------------------------------------

The user asks:

"${question}"

Instructions:

- Answer only based on the resume whenever possible.
- Give practical suggestions.
- Keep the answer professional.
- Use bullet points when appropriate.
- If the question asks for improvements, explain exactly what to improve.
- Keep the response under 300 words.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return response.text.trim();
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
  analyzeJobDescription,
  chatWithResumeAI,
};