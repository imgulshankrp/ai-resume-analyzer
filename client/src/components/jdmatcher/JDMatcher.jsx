import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import {
  FaBriefcase,
  FaSearch,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb,
  FaChartLine,
  FaFileAlt,
} from "react-icons/fa";

import { API_URL } from "../../config";

function JDMatcher({ resumeText = "" }) {
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // =========================================================
  // ANALYZE JOB DESCRIPTION
  // =========================================================

  const handleAnalyze = async () => {
    setResult(null);

    if (!jobDescription.trim()) {
      toast.warning("Please paste a Job Description.");
      return;
    }

    if (!resumeText || !resumeText.trim()) {
      toast.error(
        "Resume text not found. Please select a valid resume."
      );
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login again.");
        return;
      }

      const res = await axios.post(
        `${API_URL}/ai/jd-match`,
        {
          resumeText: resumeText.trim(),
          jobDescription: jobDescription.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let aiResult = res.data?.result;

      // AI sometimes returns JSON as string
      if (typeof aiResult === "string") {
        try {
          aiResult = JSON.parse(aiResult);
        } catch (parseError) {
          console.error(
            "JD MATCH RESULT PARSE ERROR:",
            parseError
          );

          toast.error(
            "AI returned an invalid response."
          );

          return;
        }
      }

      if (!aiResult) {
        toast.error("No result received from AI.");
        return;
      }

      setResult(aiResult);

      toast.success(
        "Job Description analyzed successfully!"
      );
    } catch (err) {
      console.error("JD MATCH ERROR:", err);

      toast.error(
        err.response?.data?.message ||
          "Unable to analyze Job Description."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SAFE ARRAYS
  // =========================================================

  const matchedSkills = Array.isArray(
    result?.matchedSkills
  )
    ? result.matchedSkills
    : [];

  const missingSkills = Array.isArray(
    result?.missingSkills
  )
    ? result.missingSkills
    : [];

  const recommendations = Array.isArray(
    result?.recommendations
  )
    ? result.recommendations
    : [];

  const matchScore = Number(
    result?.matchScore ?? 0
  );

  // =========================================================
  // UI
  // =========================================================

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        mx-auto
        w-full
        max-w-7xl
        rounded-3xl
        border
        border-slate-200
        bg-white
        shadow-xl
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div
        className="
          border-b
          border-slate-200
          px-6
          py-5
          dark:border-slate-800
          sm:px-8
        "
      >
        <div className="flex items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-400
              to-blue-600
              shadow-lg
            "
          >
            <FaBriefcase className="text-xl text-white" />
          </div>

          <div>
            <h1
              className="
                text-2xl
                font-bold
                tracking-tight
                text-slate-900
                dark:text-white
                sm:text-3xl
              "
            >
              Job Description Matcher
            </h1>

            <p
              className="
                mt-1
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Compare your resume with a job description
              using AI.
            </p>
          </div>

        </div>
      </div>

      {/* =====================================================
          INPUT SECTION
      ===================================================== */}

      <div className="p-6 sm:p-8">

        {/* Resume Status */}

        <div
          className="
            mb-5
            flex
            items-center
            gap-3
            rounded-2xl
            border
            border-emerald-200
            bg-emerald-50
            px-4
            py-3
            dark:border-emerald-800
            dark:bg-emerald-900/20
          "
        >
          <FaCheckCircle
            className="
              shrink-0
              text-emerald-500
              dark:text-emerald-400
            "
          />

          <div>
            <p
              className="
                text-sm
                font-semibold
                text-emerald-700
                dark:text-emerald-400
              "
            >
              Resume Loaded
            </p>

            <p
              className="
                text-xs
                text-emerald-600
                dark:text-emerald-500
              "
            >
              Your resume is ready for job matching.
            </p>
          </div>
        </div>

        {/* Job Description */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <label
              className="
                flex
                items-center
                gap-2
                text-sm
                font-semibold
                text-slate-800
                dark:text-white
              "
            >
              <FaFileAlt
                className="
                  text-blue-500
                  dark:text-blue-400
                "
              />

              Job Description
            </label>

            <span
              className="
                text-xs
                text-slate-400
                dark:text-slate-500
              "
            >
              {jobDescription.length} characters
            </span>

          </div>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            placeholder="Paste the job description here..."
            rows={5}
            className="
              w-full
              resize-none
              rounded-2xl
              border
              border-slate-300
              bg-slate-50
              px-4
              py-3
              text-sm
              leading-6
              text-slate-900
              outline-none
              transition
              placeholder:text-slate-400
              focus:border-blue-500
              focus:ring-4
              focus:ring-blue-500/10
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-white
              dark:placeholder:text-slate-500
            "
          />

        </div>

        {/* Action Row */}

        <div
          className="
            mt-4
            flex
            flex-col
            items-stretch
            justify-between
            gap-3
            sm:flex-row
            sm:items-center
          "
        >

          <p
            className="
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Paste the complete job description for
            better matching accuracy.
          </p>

          <button
            type="button"
            onClick={handleAnalyze}
            disabled={loading}
            className="
              flex
              items-center
              justify-center
              gap-2
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-6
              py-3
              text-sm
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition-all
              hover:-translate-y-0.5
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
            "
          >
            <FaSearch />

            {loading
              ? "Analyzing..."
              : "Analyze Match"}
          </button>

        </div>

        {/* ===================================================
            LOADING
        =================================================== */}

        {loading && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            className="
              mt-6
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-blue-200
              bg-blue-50
              px-5
              py-4
              dark:border-blue-800
              dark:bg-blue-900/20
            "
          >

            <div
              className="
                h-8
                w-8
                shrink-0
                animate-spin
                rounded-full
                border-4
                border-blue-500
                border-t-transparent
              "
            />

            <div>
              <p
                className="
                  text-sm
                  font-semibold
                  text-blue-700
                  dark:text-blue-400
                "
              >
                Analyzing Resume
              </p>

              <p
                className="
                  text-xs
                  text-blue-600
                  dark:text-blue-500
                "
              >
                AI is comparing your resume with the job
                requirements...
              </p>
            </div>

          </motion.div>
        )}

        {/* ===================================================
            RESULTS
        =================================================== */}

        {result && !loading && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mt-8"
          >

            {/* Result Header */}

            <div
              className="
                mb-5
                flex
                items-center
                justify-between
                border-b
                border-slate-200
                pb-4
                dark:border-slate-800
              "
            >

              <div>
                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Match Analysis
                </h2>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  AI-powered comparison of your resume
                  against the job requirements.
                </p>
              </div>

              <FaChartLine
                className="
                  hidden
                  text-2xl
                  text-blue-500
                  sm:block
                "
              />

            </div>

            {/* =================================================
                SCORE + MATCHED SKILLS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-3
              "
            >

              {/* Match Score */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  bg-gradient-to-br
                  from-cyan-500
                  via-blue-600
                  to-indigo-700
                  p-6
                  text-white
                  shadow-lg
                  lg:col-span-1
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-white/15
                    "
                  >
                    <FaChartLine />
                  </div>

                  <span
                    className="
                      text-sm
                      font-semibold
                      text-blue-100
                    "
                  >
                    Overall Match
                  </span>

                </div>

                <div className="mt-5">

                  <span
                    className="
                      text-5xl
                      font-extrabold
                      tracking-tight
                    "
                  >
                    {matchScore}%
                  </span>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-5
                      text-blue-100
                    "
                  >
                    Compatibility between your resume
                    and this job description.
                  </p>

                </div>

                {/* Progress */}

                <div className="mt-5">

                  <div
                    className="
                      h-2
                      overflow-hidden
                      rounded-full
                      bg-white/20
                    "
                  >
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${Math.min(
                          Math.max(matchScore, 0),
                          100
                        )}%`,
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className="
                        h-full
                        rounded-full
                        bg-white
                      "
                    />
                  </div>

                </div>

              </motion.div>

              {/* Matched Skills */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-emerald-200
                  bg-emerald-50
                  p-6
                  dark:border-emerald-800
                  dark:bg-emerald-900/20
                  lg:col-span-2
                "
              >

                <div className="mb-4 flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-emerald-100
                      dark:bg-emerald-900/40
                    "
                  >
                    <FaCheckCircle
                      className="
                        text-lg
                        text-emerald-600
                        dark:text-emerald-400
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-bold
                        text-emerald-700
                        dark:text-emerald-400
                      "
                    >
                      Matched Skills
                    </h3>

                    <p
                      className="
                        text-xs
                        text-emerald-600
                        dark:text-emerald-500
                      "
                    >
                      Skills found in both resume and job
                      description.
                    </p>
                  </div>

                </div>

                {matchedSkills.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {matchedSkills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="
                            rounded-lg
                            bg-emerald-500
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-white
                            shadow-sm
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                ) : (

                  <div
                    className="
                      rounded-xl
                      border
                      border-dashed
                      border-emerald-300
                      px-4
                      py-5
                      text-center
                      text-sm
                      text-emerald-700
                      dark:border-emerald-700
                      dark:text-emerald-400
                    "
                  >
                    No matched skills found.
                  </div>

                )}

              </motion.div>

            </div>

            {/* =================================================
                MISSING + RECOMMENDATIONS
            ================================================= */}

            <div
              className="
                mt-5
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-2
              "
            >

              {/* Missing Skills */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-rose-200
                  bg-rose-50
                  p-6
                  dark:border-rose-800
                  dark:bg-rose-900/20
                "
              >

                <div className="mb-4 flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-rose-100
                      dark:bg-rose-900/40
                    "
                  >
                    <FaExclamationTriangle
                      className="
                        text-lg
                        text-rose-600
                        dark:text-rose-400
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-bold
                        text-rose-700
                        dark:text-rose-400
                      "
                    >
                      Missing Skills
                    </h3>

                    <p
                      className="
                        text-xs
                        text-rose-600
                        dark:text-rose-500
                      "
                    >
                      Skills you may need to strengthen.
                    </p>
                  </div>

                </div>

                {missingSkills.length > 0 ? (

                  <div className="flex flex-wrap gap-2">

                    {missingSkills.map(
                      (skill, index) => (
                        <span
                          key={index}
                          className="
                            rounded-lg
                            border
                            border-rose-200
                            bg-white
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            text-rose-700
                            shadow-sm
                            dark:border-rose-700
                            dark:bg-rose-950/40
                            dark:text-rose-300
                          "
                        >
                          {skill}
                        </span>
                      )
                    )}

                  </div>

                ) : (

                  <div
                    className="
                      rounded-xl
                      border
                      border-dashed
                      border-emerald-300
                      bg-emerald-50
                      px-4
                      py-5
                      text-center
                      text-sm
                      font-medium
                      text-emerald-700
                      dark:border-emerald-700
                      dark:bg-emerald-900/20
                      dark:text-emerald-400
                    "
                  >
                    Excellent! No major missing skills
                    detected.
                  </div>

                )}

              </motion.div>

              {/* AI Recommendations */}

              <motion.div
                whileHover={{
                  y: -3,
                }}
                className="
                  rounded-2xl
                  border
                  border-amber-200
                  bg-amber-50
                  p-6
                  dark:border-amber-800
                  dark:bg-amber-900/20
                "
              >

                <div className="mb-4 flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-amber-100
                      dark:bg-amber-900/40
                    "
                  >
                    <FaLightbulb
                      className="
                        text-lg
                        text-amber-600
                        dark:text-amber-400
                      "
                    />
                  </div>

                  <div>
                    <h3
                      className="
                        font-bold
                        text-amber-700
                        dark:text-amber-400
                      "
                    >
                      AI Recommendations
                    </h3>

                    <p
                      className="
                        text-xs
                        text-amber-600
                        dark:text-amber-500
                      "
                    >
                      Suggestions to improve your match.
                    </p>
                  </div>

                </div>

                {recommendations.length > 0 ? (

                  <div className="space-y-3">

                    {recommendations.map(
                      (item, index) => (
                        <div
                          key={index}
                          className="
                            flex
                            gap-3
                            rounded-xl
                            border
                            border-amber-200
                            bg-white
                            px-4
                            py-3
                            text-sm
                            leading-5
                            text-slate-700
                            shadow-sm
                            dark:border-amber-800
                            dark:bg-slate-800
                            dark:text-slate-300
                          "
                        >

                          <span
                            className="
                              flex
                              h-6
                              w-6
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-amber-100
                              text-xs
                              font-bold
                              text-amber-700
                              dark:bg-amber-900/50
                              dark:text-amber-300
                            "
                          >
                            {index + 1}
                          </span>

                          <span>
                            {item}
                          </span>

                        </div>
                      )
                    )}

                  </div>

                ) : (

                  <div
                    className="
                      rounded-xl
                      border
                      border-dashed
                      border-amber-300
                      px-4
                      py-5
                      text-center
                      text-sm
                      text-amber-700
                      dark:border-amber-700
                      dark:text-amber-400
                    "
                  >
                    No recommendations available.
                  </div>

                )}

              </motion.div>

            </div>

          </motion.div>
        )}

      </div>
    </motion.div>
  );
}

export default JDMatcher;