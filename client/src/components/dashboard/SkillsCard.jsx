import { FaTools } from "react-icons/fa";
import { motion } from "framer-motion";

function SkillsCard({ skills }) {
  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <div className="flex items-center gap-3 mb-4">
        <FaTools className="text-indigo-600 text-2xl" />
        <h2 className="text-2xl font-bold">Detected Skills</h2>
      </div>

      <div className="flex flex-wrap gap-3">
        {skills?.map((skill, index) => (
          <span
            key={index}
            className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-medium"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillsCard;
