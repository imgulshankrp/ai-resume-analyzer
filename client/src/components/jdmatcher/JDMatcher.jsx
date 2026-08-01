import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaSearch,
} from "react-icons/fa";
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
      transition={{ duration: 0.4 }}
      className="
        mt-10
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        p-6
        shadow-xl
      "
    >
      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-900/30">

          <FaBriefcase className="text-3xl text-blue-600 dark:text-blue-400" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            🎯 Job Description Matcher
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Compare your resume with any Job Description using Gemini AI.
          </p>

        </div>

      </div>

      {/* Input */}

      <textarea
        rows={10}
        value={jobDescription}
        onChange={(e) => setJobDescription(e.target.value)}
        placeholder="Paste complete Job Description here..."
        className="
          w-full
          rounded-2xl
          border
          border-slate-300
          dark:border-slate-700
          bg-white
          dark:bg-slate-800
          p-5
          text-slate-900
          dark:text-white
          outline-none
          resize-none
          transition
          focus:ring-2
          focus:ring-blue-500
        "
      />

      <div className="mt-6 flex justify-end">

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="
            flex
            items-center
            gap-3
            rounded-2xl
            bg-gradient-to-r
            from-blue-600
            to-indigo-600
            px-8
            py-4
            font-semibold
            text-white
            transition-all
            hover:scale-105
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <FaSearch />

          {loading ? "Analyzing..." : "Analyze Match"}

        </button>

      </div>

      {loading && (

        <div className="mt-10 flex flex-col items-center">

          <div className="h-14 w-14 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

          <p className="mt-4 text-slate-600 dark:text-slate-300">
            Gemini AI is analyzing your resume...
          </p>

        </div>

      )}

      {result && (
                <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 space-y-8"
        >
          {/* Top Cards */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Match Score */}

            <motion.div
              whileHover={{ y: -6 }}
              className="
                rounded-3xl
                bg-gradient-to-r
                from-blue-600
                to-indigo-600
                p-8
                text-white
                shadow-xl
              "
            >
              <h3 className="mb-4 text-2xl font-bold">
                🎯 Match Score
              </h3>

              <div className="text-6xl font-extrabold">
                {result.matchScore}%
              </div>

              <p className="mt-4 text-blue-100 leading-7">
                Overall compatibility between your resume and the Job Description.
              </p>
            </motion.div>

            {/* Matched Skills */}

            <motion.div
              whileHover={{ y: -6 }}
              className="
                rounded-3xl
                border
                border-green-200
                dark:border-green-700
                bg-green-50
                dark:bg-green-900/20
                p-8
                shadow-lg
              "
            >
              <h3 className="mb-5 text-2xl font-bold text-green-700 dark:text-green-400">
                ✅ Matched Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.matchedSkills?.length ? (

                  result.matchedSkills.map((skill, index) => (

                    <span
                      key={index}
                      className="
                        rounded-full
                        bg-green-600
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {skill}
                    </span>

                  ))

                ) : (

                  <p className="text-slate-600 dark:text-slate-300">
                    No matched skills found.
                  </p>

                )}

              </div>

            </motion.div>

          </div>

          {/* Bottom Cards */}

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

            {/* Missing Skills */}

            <motion.div
              whileHover={{ y: -6 }}
              className="
                rounded-3xl
                border
                border-red-200
                dark:border-red-700
                bg-red-50
                dark:bg-red-900/20
                p-8
                shadow-lg
              "
            >
              <h3 className="mb-5 text-2xl font-bold text-red-700 dark:text-red-400">
                ❌ Missing Skills
              </h3>

              <div className="flex flex-wrap gap-3">

                {result.missingSkills?.length ? (

                  result.missingSkills.map((skill, index) => (

                    <span
                      key={index}
                      className="
                        rounded-full
                        bg-red-600
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {skill}
                    </span>

                  ))

                ) : (

                  <p className="text-slate-600 dark:text-slate-300">
                    No missing skills.
                  </p>

                )}

              </div>

            </motion.div>

            {/* AI Recommendations */}

            <motion.div
              whileHover={{ y: -6 }}
              className="
                rounded-3xl
                border
                border-yellow-200
                dark:border-yellow-700
                bg-yellow-50
                dark:bg-yellow-900/20
                p-8
                shadow-lg
              "
            >
              <h3 className="mb-5 text-2xl font-bold text-yellow-700 dark:text-yellow-400">
                💡 AI Recommendations
              </h3>

              {result.recommendations?.length ? (

                <div className="space-y-4">

                  {result.recommendations.map((item, index) => (

                    <div
                      key={index}
                      className="
                        rounded-xl
                        border
                        border-yellow-200
                        dark:border-yellow-700
                        bg-white
                        dark:bg-slate-800
                        p-4
                        text-slate-700
                        dark:text-slate-300
                      "
                    >
                      • {item}
                    </div>

                  ))}

                </div>

              ) : (

                <p className="text-slate-600 dark:text-slate-300">
                  No recommendations.
                </p>

              )}

            </motion.div>

          </div>

        </motion.div>
      )}

    </motion.div>
  );
}

export default JDMatcher;