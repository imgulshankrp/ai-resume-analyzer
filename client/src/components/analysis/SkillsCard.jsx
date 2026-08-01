import { FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

function SkillsCard({ skills = [] }) {
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

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900/30">
          <FaTools className="text-2xl text-indigo-600 dark:text-indigo-400" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Detected Skills
          </h2>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Skills found in your resume
          </p>
        </div>

      </div>

      {skills.length > 0 ? (

        <div className="flex flex-wrap gap-3">

          {skills.map((skill, index) => (

            <motion.span
              key={index}
              whileHover={{
                scale: 1.08,
              }}
              whileTap={{
                scale: 0.95,
              }}
              className="
                rounded-full
                border
                border-blue-200
                dark:border-blue-700
                bg-blue-100
                dark:bg-blue-900/40
                px-4
                py-2
                text-sm
                font-semibold
                text-blue-700
                dark:text-blue-300
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
            border-slate-300
            dark:border-slate-700
            bg-slate-50
            dark:bg-slate-800
            py-10
            text-center
          "
        >
          <p className="text-slate-500 dark:text-slate-400">
            No skills detected.
          </p>
        </div>

      )}

    </motion.div>
  );
}

export default SkillsCard;