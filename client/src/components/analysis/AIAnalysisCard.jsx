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
      <div
        className="
          mt-6
          rounded-2xl
          border
          border-red-300
          dark:border-red-700
          bg-red-100
          dark:bg-red-900/30
          p-6
        "
      >
        <h3 className="mb-2 text-xl font-bold text-red-700 dark:text-red-300">
          AI Response Error
        </h3>

        <p className="text-red-600 dark:text-red-400">
          The AI returned an unexpected response. Please analyze the resume again.
        </p>
      </div>
    );
  }

  const percentage = ai.atsScore || 0;

  const circumference = 2 * Math.PI * 70;

  const offset =
    circumference -
    (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        mt-8
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-8
        shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            🤖 AI Resume Analysis
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Generated using Gemini AI
          </p>

        </div>

        <div className="flex gap-3">

          <span className="rounded-full bg-green-100 dark:bg-green-900/30 px-4 py-2 font-semibold text-green-700 dark:text-green-300">
            AI Powered
          </span>

          <span className="rounded-full bg-indigo-100 dark:bg-indigo-900/30 px-4 py-2 font-semibold text-indigo-700 dark:text-indigo-300">
            Gemini
          </span>

        </div>

      </div>

      {/* ATS Score */}

      <div className="mb-10 flex justify-center">

        <div className="relative h-44 w-44">

          <svg className="h-44 w-44 -rotate-90">

            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#CBD5E1"
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

          <div className="absolute inset-0 flex flex-col items-center justify-center">

            <h2 className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">
              {percentage}%
            </h2>

            <p className="text-slate-500 dark:text-slate-400">
              ATS Score
            </p>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="mb-10 grid grid-cols-2 gap-5 md:grid-cols-4">

        <div className="rounded-2xl bg-green-50 dark:bg-green-900/20 p-5 text-center">

          <h3 className="font-semibold text-slate-700 dark:text-slate-300">
            Strengths
          </h3>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {ai.strengths.length}
          </p>

        </div>

        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 p-5 text-center">

          <h3 className="font-semibold text-slate-700 dark:text-slate-300">
            Weaknesses
          </h3>

          <p className="mt-2 text-3xl font-bold text-red-600">
            {ai.weaknesses.length}
          </p>

        </div>

        <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-5 text-center">

          <h3 className="font-semibold text-slate-700 dark:text-slate-300">
            Suggestions
          </h3>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {ai.suggestions.length}
          </p>

        </div>

        <div className="rounded-2xl bg-purple-50 dark:bg-purple-900/20 p-5 text-center">

          <h3 className="font-semibold text-slate-700 dark:text-slate-300">
            Grade
          </h3>

          <p className="mt-2 text-3xl font-bold text-purple-600">
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

      <div className="mb-10 rounded-2xl border border-indigo-200 dark:border-indigo-700 bg-indigo-50 dark:bg-indigo-900/20 p-6">

        <h3 className="mb-4 text-2xl font-bold text-slate-900 dark:text-white">
          📄 AI Summary
        </h3>

        <p className="leading-8 text-slate-700 dark:text-slate-300">
          {ai.summary || "No summary available."}
        </p>

      </div>

      {/* Strengths */}

      <div className="mb-10">

        <h3 className="mb-5 text-2xl font-bold text-green-600">
          ✅ Strengths
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          {ai.strengths.length ? (
            ai.strengths.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="
                  rounded-2xl
                  border
                  border-green-200
                  dark:border-green-700
                  bg-green-50
                  dark:bg-green-900/20
                  p-5
                  text-slate-700
                  dark:text-slate-300
                "
              >
                {item}
              </motion.div>

            ))
          ) : (
            <div className="text-slate-500 dark:text-slate-400">
              No strengths available.
            </div>
          )}

        </div>

      </div>

      {/* Weaknesses */}

      <div className="mb-10">

        <h3 className="mb-5 text-2xl font-bold text-red-600">
          ⚠️ Weaknesses
        </h3>

        <div className="grid gap-4 md:grid-cols-2">

          {ai.weaknesses.length ? (
            ai.weaknesses.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="
                  rounded-2xl
                  border
                  border-red-200
                  dark:border-red-700
                  bg-red-50
                  dark:bg-red-900/20
                  p-5
                  text-slate-700
                  dark:text-slate-300
                "
              >
                {item}
              </motion.div>

            ))
          ) : (
            <div className="text-slate-500 dark:text-slate-400">
              No weaknesses available.
            </div>
          )}

        </div>

      </div>

      {/* Suggestions */}

      <div className="mb-10">

        <h3 className="mb-5 text-2xl font-bold text-blue-600">
          💡 Suggestions
        </h3>

        <div className="space-y-4">

          {ai.suggestions.length ? (
            ai.suggestions.map((item, index) => (

              <motion.div
                key={index}
                whileHover={{ x: 5 }}
                className="
                  rounded-2xl
                  border
                  border-blue-200
                  dark:border-blue-700
                  bg-blue-50
                  dark:bg-blue-900/20
                  p-5
                  text-slate-700
                  dark:text-slate-300
                "
              >
                {item}
              </motion.div>

            ))
          ) : (
            <div className="text-slate-500 dark:text-slate-400">
              No suggestions available.
            </div>
          )}

        </div>

      </div>

      {/* Final Recommendation */}

      <div className="rounded-2xl border border-yellow-300 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20 p-6">

        <h3 className="mb-4 text-2xl font-bold text-yellow-700 dark:text-yellow-400">
          ⭐ Final Recommendation
        </h3>

        <p className="leading-8 text-slate-700 dark:text-slate-300">
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