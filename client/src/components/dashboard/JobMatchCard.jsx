import { FaBullseye } from "react-icons/fa";
import { motion } from "framer-motion";

function JobMatchCard({ jobMatch }) {
  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <div className="flex items-center gap-3 mb-4">
        <FaBullseye className="text-green-600 text-2xl" />
        <h2 className="text-2xl font-bold">Job Match</h2>
      </div>

      <div className="text-5xl font-bold text-green-600">{jobMatch}%</div>
    </motion.div>
  );
}

export default JobMatchCard;
