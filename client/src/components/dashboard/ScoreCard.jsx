import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaChartLine } from "react-icons/fa";
import { motion } from "framer-motion";

function ScoreCard({ score }) {
  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <div className="flex items-center gap-3 mb-4">
        <FaChartLine className="text-blue-600 text-2xl" />
        <h2 className="text-2xl font-bold">ATS Score</h2>
      </div>

      <div className="w-40 h-40">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textSize: "18px",
            pathColor: "#2563eb",
            textColor: "#111827",
            trailColor: "#e5e7eb",
          })}
        />
      </div>
   </motion.div>
  );
}

export default ScoreCard;
