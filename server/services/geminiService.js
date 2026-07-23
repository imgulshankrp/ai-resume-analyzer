const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeResume = async (resumeText) => {
  try {
  const prompt = `
You are an ATS Resume Analyzer.

Return ONLY valid JSON.

Do not include markdown.
Do not include \`\`\`json.
Do not include explanations.

Return exactly this format:

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
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text.trim();

text = text
  .replace(/```json/g, "")
  .replace(/```/g, "")
  .trim();

return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};

module.exports = {
  analyzeResume,
};