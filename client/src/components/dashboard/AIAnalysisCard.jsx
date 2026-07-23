import { motion } from "framer-motion";

function AIAnalysisCard({ data }) {
  if (!data) return null;

  let ai = {
    summary: "",
    strengths: [],
    weaknesses: [],
    suggestions: [],
    atsScore: 0,
  };

  try {
    ai = typeof data === "string" ? JSON.parse(data) : data;
  } catch (error) {
    console.error("AI Parse Error:", error);
    return (
      <div className="bg-red-100 text-red-700 p-4 rounded-xl mt-6">
        return (
        <div className="bg-red-100 border border-red-300 text-red-700 p-5 rounded-xl mt-6">
          <h3 className="font-bold mb-2">AI Response Error</h3>

          <p>
            The AI returned an unexpected response. Please try analyzing the
            resume again.
          </p>
        </div>
        );
      </div>
    );
  }

  const percentage = ai.atsScore || 0;
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mt-8"
    >
      {/* Heading */}
      <h2 className="text-3xl font-bold mb-3">🤖 AI Resume Analysis</h2>

      {/* AI Badge */}
      <div className="flex gap-3 mb-8">
        <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full font-semibold">
          AI Powered
        </span>

        <span className="bg-indigo-100 text-indigo-700 px-4 py-1 rounded-full font-semibold">
          Gemini
        </span>
      </div>

      {/* ATS Score */}
      <div className="flex justify-center mb-8">
        <div className="relative w-44 h-44">
          <svg className="w-44 h-44 -rotate-90">
            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#E5E7EB"
              strokeWidth="12"
              fill="none"
            />

            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#4F46E5"
              strokeWidth="12"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
            />
          </svg>

          <div className="absolute inset-0 flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold text-indigo-600">
              {percentage}%
            </h2>

            <p className="text-gray-500">ATS Score</p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-green-50 rounded-xl p-4 text-center">
          <h3 className="font-semibold">Strengths</h3>
          <p className="text-3xl font-bold text-green-600">
            {ai.strengths.length}
          </p>
        </div>

        <div className="bg-red-50 rounded-xl p-4 text-center">
          <h3 className="font-semibold">Weaknesses</h3>
          <p className="text-3xl font-bold text-red-600">
            {ai.weaknesses.length}
          </p>
        </div>

        <div className="bg-blue-50 rounded-xl p-4 text-center">
          <h3 className="font-semibold">Suggestions</h3>
          <p className="text-3xl font-bold text-blue-600">
            {ai.suggestions.length}
          </p>
        </div>

        <div className="bg-purple-50 rounded-xl p-4 text-center">
          <h3 className="font-semibold">Grade</h3>
          <p className="text-3xl font-bold text-purple-600">
            {percentage >= 90
              ? "A+"
              : percentage >= 80
                ? "A"
                : percentage >= 70
                  ? "B"
                  : percentage >= 60
                    ? "C"
                    : "D"}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-indigo-50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold mb-3">📄 AI Summary</h3>

        <p className="text-gray-700 leading-7">{ai.summary}</p>
      </div>

      {/* Strengths */}
      <h3 className="text-xl font-bold text-green-600 mb-4">✅ Strengths</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {ai.strengths.map((item, index) => (
          <div
            key={index}
            className="bg-green-50 border border-green-200 rounded-xl p-4"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Weaknesses */}
      <h3 className="text-xl font-bold text-red-600 mb-4">⚠️ Weaknesses</h3>

      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {ai.weaknesses.map((item, index) => (
          <div
            key={index}
            className="bg-red-50 border border-red-200 rounded-xl p-4"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <h3 className="text-xl font-bold text-blue-600 mb-4">💡 Suggestions</h3>

      <div className="grid gap-4 mb-8">
        {ai.suggestions.map((item, index) => (
          <div
            key={index}
            className="bg-blue-50 border border-blue-200 rounded-xl p-4"
          >
            {item}
          </div>
        ))}
      </div>

      {/* Final Recommendation */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-3">⭐ Final Recommendation</h3>

        <p className="text-gray-700 leading-7">
          {percentage >= 80
            ? "Your resume is ATS-friendly and has a good chance of passing automated screening. Continue refining project descriptions and measurable achievements."
            : percentage >= 60
              ? "Your resume has a solid foundation but should include stronger keywords, clearer achievements, and more relevant technical skills."
              : "Your resume needs significant improvement. Focus on adding technical skills, projects, internships, and quantifiable achievements before applying for jobs."}
        </p>
      </div>
    </motion.div>
  );
}

export default AIAnalysisCard;
