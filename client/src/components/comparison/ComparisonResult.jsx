import { motion } from "framer-motion";

function ComparisonResult({ data }) {
  const left = data.resume1;
  const right = data.resume2;

  const winner =
    left.score > right.score
      ? "Resume A"
      : right.score > left.score
      ? "Resume B"
      : "Both Resumes";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="mt-10 bg-green-50 border border-green-300 rounded-xl p-6"
    >
      <h2 className="text-2xl font-bold mb-4">
        Comparison Result
      </h2>

      <p className="text-lg mb-4">
        <strong>Best Resume:</strong> {winner}
      </p>

      <div className="space-y-3">

        <div>
          <strong>Resume A ATS:</strong> {left.score}%
        </div>

        <div>
          <strong>Resume B ATS:</strong> {right.score}%
        </div>

        <div>
          <strong>Recommendation:</strong>
        </div>

        <p className="text-gray-700">
          {data.recommendation}
        </p>

      </div>
    </motion.div>
  );
}

export default ComparisonResult;