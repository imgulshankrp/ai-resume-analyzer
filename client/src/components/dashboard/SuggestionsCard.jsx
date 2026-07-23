import { FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";
function SuggestionsCard({ suggestions }) {
  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <div className="flex items-center gap-3 mb-4">
        <FaLightbulb className="text-yellow-500 text-2xl" />
        <h2 className="text-2xl font-bold">Suggestions</h2>
      </div>

      <ul className="list-disc list-inside space-y-2 text-gray-700">
        {suggestions?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </motion.div>
  );
}

export default SuggestionsCard;
