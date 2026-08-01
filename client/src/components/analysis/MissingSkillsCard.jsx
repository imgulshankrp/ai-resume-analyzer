import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";

function MissingSkillsCard({ missingSkills = [] }) {
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

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 dark:bg-red-900/30">
          <FaExclamationTriangle className="text-2xl text-red-500 dark:text-red-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Missing Skills
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Skills recommended to improve your ATS score
          </p>
        </div>

      </div>

      {missingSkills.length > 0 ? (

        <div className="flex flex-wrap gap-3">

          {missingSkills.map((skill, index) => (

            <motion.span
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="
                rounded-full
                border
                border-red-200
                dark:border-red-700
                bg-red-100
                dark:bg-red-900/40
                px-4
                py-2
                text-sm
                font-semibold
                text-red-700
                dark:text-red-300
                transition-all
              "
            >
              {skill}
            </motion.span>

          ))}

        </div>

      ) : (

        <div
          className="
            rounded-2xl
            border-2
            border-dashed
            border-green-300
            dark:border-green-700
            bg-green-50
            dark:bg-green-900/20
            py-10
            text-center
          "
        >
          <h3 className="text-xl font-semibold text-green-700 dark:text-green-400">
            🎉 Excellent!
          </h3>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            No missing skills were detected in your resume.
          </p>
        </div>

      )}

    </motion.div>
  );
}

export default MissingSkillsCard;