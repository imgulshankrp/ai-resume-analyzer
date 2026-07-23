import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function AnalyticsChart({ score, jobMatch }) {
  const data = {
    labels: ["ATS Score", "Remaining"],
    datasets: [
      {
        data: [score, 100 - score],
        backgroundColor: ["#2563eb", "#e5e7eb"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">
        📊 Analytics Dashboard
      </h2>

      <div className="max-w-xs mx-auto">
        <Doughnut data={data} />
      </div>

      <div className="mt-6 text-center">
        <p className="text-lg font-semibold">
          ATS Score: {score}%
        </p>

        <p className="text-green-600 font-semibold">
          JD Match: {jobMatch}%
        </p>
      </div>
    </div>
  );
}

export default AnalyticsChart;