import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";
import { motion } from "framer-motion";

import {
  HiChartBar,
  HiCheckCircle,
  HiExclamationTriangle,
  HiSparkles,
} from "react-icons/hi2";

import Card from "../common/Card";

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
        hoverOffset: 6,
        cutout: "78%",
      },
    ],
  };

  const stats = [
    {
      title: "Job Match",
      value: `${jobMatch}%`,
      icon: HiChartBar,
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      title: "Skills",
      value: skills.length,
      icon: HiCheckCircle,
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Missing",
      value: missingSkills.length,
      icon: HiExclamationTriangle,
      gradient: "from-red-500 to-orange-500",
    },
    {
      title: "Suggestions",
      value: suggestions.length,
      icon: HiSparkles,
      gradient: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <Card
      className="rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* Header */}

        <div className="mb-8 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Resume Analytics
            </h2>

            <p className="mt-1 text-slate-500 dark:text-slate-400">
              AI generated performance overview
            </p>

          </div>

          <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
            Live Analysis
          </div>

        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Doughnut Chart */}

          <div className="flex flex-col items-center justify-center">

            <div className="relative h-72 w-72">

              <Doughnut
                data={data}
                options={{
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      display: false,
                    },
                  },
                }}
              />

              <div className="absolute inset-0 flex flex-col items-center justify-center">

                <h2 className="text-5xl font-bold text-slate-900 dark:text-white">
                  {score}%
                </h2>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  ATS Score
                </p>

              </div>

            </div>

          </div>

          {/* Right Side */}

          <div>

            <div className="grid grid-cols-2 gap-5">

              {stats.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: index * 0.08,
                    }}
                    whileHover={{
                      y: -6,
                    }}
                    className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-all duration-300 hover:shadow-lg dark:border-slate-700 dark:bg-slate-800"
                  >
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient}`}
                    >
                      <Icon className="text-2xl text-white" />
                    </div>

                    <h3 className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}

            </div>

            {/* AI Insight */}

            <div className="mt-8 rounded-2xl border border-indigo-200 bg-gradient-to-r from-indigo-50 to-blue-50 p-5 dark:border-indigo-800 dark:from-indigo-950 dark:to-slate-900">

              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                AI Insight
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {score >= 80
                  ? "Excellent resume quality. Continue adding measurable achievements and relevant keywords."
                  : score >= 60
                  ? "Your resume is competitive. Adding more technical skills and quantified results can improve your ATS score."
                  : "Your resume requires optimization. Focus on relevant skills, ATS-friendly formatting, and measurable accomplishments."}
              </p>

            </div>

          </div>

        </div>

      </motion.div>
    </Card>
  );
}

export default AnalyticsChart;