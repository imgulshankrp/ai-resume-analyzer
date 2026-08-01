import { motion } from "framer-motion";
import { FaRegFileAlt } from "react-icons/fa";

function SummaryCard({ summary }) {
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

      <div className="flex items-center gap-3 mb-6">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 dark:bg-blue-900/30">
          <FaRegFileAlt className="text-2xl text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Resume Summary
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            AI generated summary
          </p>
        </div>

      </div>

      {/* Summary */}

      <div
        className="
          rounded-2xl
          border
          border-slate-200
          dark:border-slate-700
          bg-slate-50
          dark:bg-slate-800
          p-5
        "
      >
        <p className="leading-8 text-slate-700 dark:text-slate-300">
          {summary || "No summary available."}
        </p>
      </div>

    </motion.div>
  );
}

export default SummaryCard;