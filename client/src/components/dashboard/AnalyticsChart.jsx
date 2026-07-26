import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend);

function AnalyticsChart({
  score = 0,
  jobMatch = 0,
  skills = [],
  missingSkills = [],
  suggestions = [],
}) {
  const data = {
    labels: ["ATS Score", "Remaining"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: [
          score >= 80
            ? "#22c55e"
            : score >= 60
            ? "#2563eb"
            : "#f59e0b",
          "#e5e7eb",
        ],
        borderWidth: 0,
        cutout: "72%",
      },
    ],
  };

  const stats = [
    {
      title: "ATS Score",
      value: `${score}%`,
      color: "bg-blue-500",
    },
    {
      title: "JD Match",
      value: `${jobMatch}%`,
      color: "bg-green-500",
    },
    {
      title: "Skills",
      value: skills.length,
      color: "bg-purple-500",
    },
    {
      title: "Missing",
      value: missingSkills.length,
      color: "bg-red-500",
    },
    {
      title: "Suggestions",
      value: suggestions.length,
      color: "bg-yellow-500",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >
      <h2 className="text-3xl font-bold mb-8">
        📊 Resume Analytics
      </h2>

      <div className="grid lg:grid-cols-2 gap-10">

        <div className="flex justify-center items-center">
          <div className="w-72 h-72">
            <Doughnut
              data={data}
              options={{
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">

          {stats.map((item) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              key={item.title}
              className="rounded-2xl bg-gray-50 border p-5 shadow-sm"
            >
              <div
                className={`w-4 h-4 rounded-full ${item.color} mb-4`}
              ></div>

              <h3 className="text-gray-500 text-sm">
                {item.title}
              </h3>

              <p className="text-3xl font-bold mt-2">
                {item.value}
              </p>
            </motion.div>
          ))}

        </div>

      </div>
    </motion.div>
  );
}

export default AnalyticsChart;