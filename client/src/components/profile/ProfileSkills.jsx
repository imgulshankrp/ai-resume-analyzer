import { motion } from "framer-motion";
import {
  HiOutlineSparkles,
  HiOutlineCodeBracket,
} from "react-icons/hi2";

const skills = [
  "React",
  "Node.js",
  "Express",
  "MongoDB",
  "JavaScript",
  "Tailwind CSS",
  "HTML",
  "CSS",
  "Git",
  "GitHub",
  "REST API",
  "JWT",
];

export default function ProfileSkills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl p-8"
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div className="flex items-center gap-4">

          <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">

            <HiOutlineCodeBracket className="text-3xl text-white" />

          </div>

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Technical Skills
            </h2>

            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Technologies detected from your resume
            </p>

          </div>

        </div>

        <div className="rounded-xl bg-indigo-100 dark:bg-indigo-900/40 px-4 py-2 text-sm font-semibold text-indigo-700 dark:text-indigo-300">
          {skills.length} Skills
        </div>

      </div>

      {/* Skills */}

      <div className="flex flex-wrap gap-4">

        {skills.map((skill, index) => (

          <motion.div
            key={skill}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: index * 0.04,
            }}
            whileHover={{
              y: -4,
              scale: 1.06,
            }}
            className="
              group
              flex
              items-center
              gap-2
              rounded-2xl
              bg-gradient-to-r
              from-indigo-600
              to-purple-600
              px-5
              py-3
              text-white
              shadow-lg
              cursor-pointer
            "
          >

            <HiOutlineSparkles className="text-lg group-hover:rotate-12 transition" />

            <span className="font-medium">
              {skill}
            </span>

          </motion.div>

        ))}

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5">

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">

          Your strongest technologies have been automatically detected from
          your uploaded resume. Keeping these skills updated will improve
          ATS accuracy and Job Match results.

        </p>

      </div>

    </motion.div>
  );
}