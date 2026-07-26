import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChartLine, FaArrowUp } from "react-icons/fa";
import { motion } from "framer-motion";

function ScoreCard({ score = 0 }) {
  const getColor = () => {
    if (score >= 85) return "#16a34a";
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl shadow-xl border border-gray-200 p-8"
    >
      <div className="flex items-center gap-3 mb-8">
        <FaChartLine className="text-blue-600 text-3xl" />
        <h2 className="text-3xl font-bold text-gray-800">
          ATS Score
        </h2>
      </div>

      <div className="flex flex-col items-center">

        <div className="w-52 h-52">
          <CircularProgressbar
            value={score}
            text={`${score}%`}
            styles={buildStyles({
              pathColor: getColor(),
              trailColor: "#e5e7eb",
              textColor: "#111827",
              textSize: "16px",
              pathTransitionDuration: 1.5,
            })}
          />
        </div>

        <h3
          className="text-2xl font-bold mt-6"
          style={{ color: getColor() }}
        >
          {getStatus()}
        </h3>

        <p className="text-gray-600 text-center mt-3 max-w-md">
          {getMessage()}
        </p>

        <div className="mt-8 bg-blue-50 rounded-2xl p-4 w-full">

          <div className="flex items-center gap-2 text-blue-700 font-semibold mb-2">
            <FaArrowUp />
            Tips to Increase ATS Score
          </div>

          <ul className="text-gray-700 space-y-2 text-sm list-disc ml-5">
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