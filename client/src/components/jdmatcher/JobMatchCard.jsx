import { FaBullseye, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

function JobMatchCard({ jobMatch = 0 }) {
  const getColor = () => {
    if (jobMatch >= 85) return "#16a34a";
    if (jobMatch >= 70) return "#2563eb";
    if (jobMatch >= 50) return "#f59e0b";
    return "#ef4444";
  };

  const getStatus = () => {
    if (jobMatch >= 85) return "Excellent Match";
    if (jobMatch >= 70) return "Good Match";
    if (jobMatch >= 50) return "Average Match";
    return "Low Match";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        y: -6,
        scale: 1.02,
      }}
      transition={{ duration: 0.3 }}
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
        p-6
      "
    >
      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900/30">
          <FaBullseye className="text-2xl text-green-600 dark:text-green-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Job Match
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Resume compatibility score
          </p>
        </div>

      </div>

      {/* Circular Score */}

      <div className="flex flex-col items-center">

        <div
          className="relative flex h-44 w-44 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(${getColor()} ${
              jobMatch * 3.6
            }deg, #e5e7eb 0deg)`,
          }}
        >
          <div className="flex h-36 w-36 flex-col items-center justify-center rounded-full bg-white dark:bg-slate-900">

            <h2
              className="text-5xl font-bold"
              style={{ color: getColor() }}
            >
              {jobMatch}%
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Match
            </p>

          </div>
        </div>

        <div className="mt-8 flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-5 py-2">

          <FaCheckCircle className="text-green-600 dark:text-green-400" />

          <span className="font-semibold text-green-700 dark:text-green-300">
            {getStatus()}
          </span>

        </div>

        <p className="mt-5 max-w-md text-center leading-7 text-slate-600 dark:text-slate-300">
          {jobMatch >= 85
            ? "Your resume is highly aligned with the target job role and should perform well during ATS screening."
            : jobMatch >= 70
            ? "Your resume matches most job requirements. Adding a few relevant skills can further improve your chances."
            : jobMatch >= 50
            ? "Your resume partially matches the job. Include more relevant keywords and measurable achievements."
            : "Your resume needs significant improvements to better match the target job description."}
        </p>

      </div>

    </motion.div>
  );
}

export default JobMatchCard;