import { FaExclamationTriangle } from "react-icons/fa";
import { motion } from "framer-motion";
function MissingSkillsCard({ missingSkills }) {
  return (
   <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <div className="flex items-center gap-3 mb-4">
        <FaExclamationTriangle className="text-red-500 text-2xl" />
        <h2 className="text-2xl font-bold">Missing Skills</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {missingSkills?.length ? (
          missingSkills.map((skill, index) => (
            <span
              key={index}
              className="bg-red-100 text-red-600 px-4 py-2 rounded-full font-medium"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-green-600">No missing skills 🎉</p>
        )}
      </div>
   </motion.div>
  );
}

export default MissingSkillsCard;
