import { motion } from "framer-motion";

function ResumeUploadCard({ title, onSelect }) {
  const handleChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      onSelect(file);
    }
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="border rounded-xl p-6 shadow-md bg-white"
    >
      <h2 className="text-2xl font-semibold mb-4">
        {title}
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={handleChange}
        className="w-full border p-3 rounded-lg"
      />

      <p className="text-gray-500 mt-3 text-sm">
        Upload PDF Resume
      </p>
    </motion.div>
  );
}

export default ResumeUploadCard;