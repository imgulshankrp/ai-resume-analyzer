import { motion } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";

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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6 flex items-center gap-3">
        <HiOutlineSparkles className="text-2xl text-indigo-600" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Technical Skills
        </h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <motion.span
            whileHover={{ scale: 1.08 }}
            key={skill}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-medium text-white shadow-md"
          >
            {skill}
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}