import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { API_URL } from "../../config";

function JDMatcher({ resumeText }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    setResult(null);

    if (!jobDescription.trim()) {
      toast.warning("Please paste a Job Description.");
      return;
    }

    if (!resumeText) {
      toast.error("Resume text not found.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${API_URL}/ai/jd-match`,
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
      toast.success("Job Description analyzed successfully!");
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message ||
          "Unable to analyze Job Description."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 mt-10"
    >
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">
          🎯 Job Description Matcher
        </h2>

        <p className="text-gray-500 mt-2">
          Compare your resume with any Job Description using Gemini AI.
        </p>
      </div>

      <textarea
        rows={10}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste complete Job Description here..."
        className="w-full border rounded-xl p-4 text-sm sm:text-base outline-none focus:ring-2 focus:ring-blue-500 resize-none"
      />

      <div className="flex justify-end mt-5">
        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold transition disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Match"}
        </button>
      </div>

      {loading && (
        <div className="mt-8 flex flex-col items-center">
          <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

          <p className="mt-4 text-gray-600">
            Gemini is analyzing your resume...
          </p>
        </div>
      )}

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="space-y-6 mt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-semibold mb-3">
                🎯 Match Score
              </h3>

              <div className="text-6xl font-bold">
                {result.matchScore}%
              </div>

              <p className="mt-3 text-blue-100">
                Overall compatibility between your resume and the Job Description.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-green-50 rounded-2xl p-6 shadow"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4">
                ✅ Matched Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.matchedSkills?.length ? (
                  result.matchedSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-green-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No matched skills found.</p>
                )}
              </div>
            </motion.div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-red-50 rounded-2xl p-6 shadow"
            >
              <h3 className="text-xl font-bold text-red-700 mb-4">
                ❌ Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">
                {result.missingSkills?.length ? (
                  result.missingSkills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p>No missing skills.</p>
                )}
              </div>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="bg-yellow-50 rounded-2xl p-6 shadow"
            >
              <h3 className="text-xl font-bold text-yellow-700 mb-4">
                💡 AI Recommendations
              </h3>

              {result.recommendations?.length ? (
                <ul className="space-y-3">
                  {result.recommendations.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white rounded-lg p-3 shadow-sm"
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No recommendations.</p>
              )}
            </motion.div>

          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default JDMatcher;