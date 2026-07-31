import { motion } from "framer-motion";
function SummaryCard({ summary }) {
  return (
    <motion.div
  whileHover={{ scale: 1.03 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.2 }}
  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-gray-200 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
>
      <h2 className="text-2xl font-bold mb-4">Resume Summary</h2>

      <p className="text-gray-700 leading-7">{summary}</p>
    </motion.div>
  );
}

export default SummaryCard;
