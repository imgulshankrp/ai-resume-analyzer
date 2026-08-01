import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChartLine, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

function ScoreCard({ score = 0 }) {
  const getColor = () => {
    if (score >= 85) return "#22c55e";
    if (score >= 70) return "#2563eb";
    if (score >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = () => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Good";
    if (score >= 50) return "Average";
    return "Needs Improvement";
  };

  const getMessage = () => {
    if (score >= 85)
      return "Your resume is highly optimized for ATS systems.";

    if (score >= 70)
      return "Your resume is good. A few improvements can increase your chances.";

    if (score >= 50)
      return "Your resume needs more optimization to improve ATS performance.";

    return "Your resume requires significant improvements.";
  };

  const isDark = document.documentElement.classList.contains("dark");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-xl
        hover:shadow-2xl
        transition-all
        duration-300
        p-8
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <FaChartLine className="text-3xl text-blue-600 dark:text-blue-400" />

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
          ATS Score
        </h2>

      </div>

      {/* Progress */}

      <div className="flex flex-col items-center">

        <div className="w-52 h-52">

          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: getColor(),
              trailColor: isDark ? "#334155" : "#e5e7eb",
              textColor: isDark ? "#ffffff" : "#111827",
              textSize: "16px",
              pathTransitionDuration: 1.4,
            })}
          />

        </div>

        <h3
          className="mt-6 text-3xl font-bold"
          style={{ color: getColor() }}
        >
          {getStatus()}
        </h3>

        <p className="mt-4 max-w-md text-center text-slate-600 dark:text-slate-300">
          {getMessage()}
        </p>

        {/* Tips */}

        <div
          className="
            mt-8
            w-full
            rounded-2xl
            border
            border-blue-100
            dark:border-slate-700
            bg-blue-50
            dark:bg-slate-800
            p-5
          "
        >

          <div className="mb-3 flex items-center gap-2 text-blue-700 dark:text-blue-400 font-semibold">

            <FaArrowUp />

            Tips to Increase ATS Score

          </div>

          <ul className="ml-5 list-disc space-y-2 text-sm text-slate-700 dark:text-slate-300">

            <li>Add more relevant technical skills.</li>

            <li>Include measurable achievements.</li>

            <li>Use ATS-friendly section headings.</li>

            <li>Customize your resume for each job description.</li>

            <li>Avoid graphics and excessive tables.</li>

          </ul>

        </div>

      </div>
    </motion.div>
  );
}

export default ScoreCard;