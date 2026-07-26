import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../../config";

function JDMatcher({ resumeText }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (!jobDescription.trim()) {
      setError("Please paste a Job Description.");
      return;
    }

    if (!resumeText) {
      setError("Resume text not found.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/api/ai/jd-match`,
        {
          resumeText,
          jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let aiResult = res.data.result;

      if (typeof aiResult === "string") {
        aiResult = JSON.parse(aiResult);
      }

      setResult(aiResult);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to analyze Job Description."
      );
    } finally {
      setLoading(false);
    }
  };

  const scoreColor = (score) => {
    if (score >= 80)
      return "text-green-600";

    if (score >= 60)
      return "text-yellow-500";

    return "text-red-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-8 mt-10"
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            🎯 Job Description Matcher
          </h2>

          <p className="text-gray-500 mt-2">
            Compare your resume with any Job Description
            using Gemini AI.
          </p>
        </div>
      </div>

      <textarea
        rows={10}
        value={jobDescription}
        onChange={(e) =>
          setJobDescription(e.target.value)
        }
        placeholder="Paste complete Job Description here..."
        className="w-full border rounded-xl p-4 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div className="flex justify-end mt-5">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-3 rounded-xl font-semibold transition"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Match"}
        </button>
      </div>

      {error && (
        <div className="mt-5 bg-red-100 text-red-700 p-4 rounded-xl">
          {error}
        </div>
      )}

      {loading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-600">
            Gemini is analyzing your resume...
          </p>
        </div>
      )}

      {result && (
        <>
                  <div className="mt-8 grid lg:grid-cols-2 gap-6">

            {/* Match Score */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg">

              <h3 className="text-xl font-semibold mb-3">
                🎯 Match Score
              </h3>

              <div
                className={`text-6xl font-bold ${scoreColor(
                  result.matchScore
                )} text-white`}
              >
                {result.matchScore}%
              </div>

              <p className="mt-3 text-blue-100">
                Overall compatibility between your
                resume and the Job Description.
              </p>

            </div>

            {/* Matched Skills */}
            <div className="bg-green-50 rounded-2xl p-6 shadow">

              <h3 className="text-xl font-bold text-green-700 mb-4">
                ✅ Matched Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.matchedSkills &&
                result.matchedSkills.length > 0 ? (
                  result.matchedSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p>No matched skills found.</p>
                )}

              </div>

            </div>

          </div>

          <div className="grid lg:grid-cols-2 gap-6 mt-6">

            {/* Missing Skills */}
            <div className="bg-red-50 rounded-2xl p-6 shadow">

              <h3 className="text-xl font-bold text-red-700 mb-4">
                ❌ Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.missingSkills &&
                result.missingSkills.length > 0 ? (
                  result.missingSkills.map(
                    (skill, index) => (
                      <span
                        key={index}
                        className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    )
                  )
                ) : (
                  <p>No missing skills.</p>
                )}

              </div>

            </div>

            {/* AI Recommendation */}
            <div className="bg-yellow-50 rounded-2xl p-6 shadow">

              <h3 className="text-xl font-bold text-yellow-700 mb-4">
                💡 AI Recommendations
              </h3>

              {result.recommendations &&
              result.recommendations.length > 0 ? (
                <ul className="space-y-3">

                  {result.recommendations.map(
                    (item, index) => (
                      <li
                        key={index}
                        className="bg-white rounded-lg p-3 shadow-sm"
                      >
                        • {item}
                      </li>
                    )
                  )}

                </ul>
              ) : (
                <p>No recommendations.</p>
              )}

            </div>

          </div>
        </>
      )}
    </motion.div>
  );
}

export default JDMatcher;