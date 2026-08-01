import { FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

function SuggestionsCard({ suggestions = [] }) {
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

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 dark:bg-yellow-900/30">
          <FaLightbulb className="text-2xl text-yellow-500 dark:text-yellow-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            AI Suggestions
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Recommended improvements for your resume
          </p>
        </div>

      </div>

      {suggestions.length > 0 ? (

        <div className="space-y-3">

          {suggestions.map((item, index) => (

            <motion.div
              key={index}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                x: 6,
              }}
              className="
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-yellow-200
                dark:border-yellow-700
                bg-yellow-50
                dark:bg-yellow-900/20
                p-4
              "
            >
              <span className="mt-1 text-yellow-600 dark:text-yellow-400">
                💡
              </span>

              <p className="leading-7 text-slate-700 dark:text-slate-300">
                {item}
              </p>

            </motion.div>

          ))}

        </div>

      ) : (

        <div
          className="
            rounded-2xl
            border-2
            border-dashed
            border-slate-300
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            py-10
            text-center
          "
        >
          <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
            🎉 Great Job!
          </h3>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            No additional suggestions available.
          </p>

        </div>

      )}

    </motion.div>
  );
}

export default SuggestionsCard;