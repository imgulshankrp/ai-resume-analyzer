import { motion } from "framer-motion";
import {
  HiDocumentText,
  HiChartBar,
  HiTrophy,
  HiArrowTrendingUp,
} from "react-icons/hi2";
import Card from "../common/Card";
import useDashboard from "../../hooks/useDashboard";

export default function DashboardAnalytics() {
  const { stats = {}, loading } = useDashboard();

  if (loading) {
    return (
      <Card className="p-8 rounded-3xl">
        <p className="text-center text-slate-500">Loading analytics...</p>
      </Card>
    );
  }

  const cards = [
    {
      title: "Total Resumes",
      value: stats.totalResumes ?? 0,
      icon: HiDocumentText,
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Average ATS",
      value: `${stats.averageScore ?? 0}%`,
      icon: HiChartBar,
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Best ATS",
      value: `${stats.bestScore ?? 0}%`,
      icon: HiTrophy,
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Growth",
      value: "+12%",
      icon: HiArrowTrendingUp,
      color: "from-violet-500 to-fuchsia-500",
    },
  ];

  return (
    <Card className="rounded-3xl p-6">
      <h2 className="text-2xl font-bold mb-6 dark:text-white">
        Dashboard Analytics
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
        {cards.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              className="rounded-2xl bg-slate-50 dark:bg-slate-800 p-5"
            >
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center`}
              >
                <Icon className="text-white text-2xl" />
              </div>

              <p className="mt-5 text-slate-500">
                {item.title}
              </p>

              <h3 className="text-3xl font-bold dark:text-white mt-2">
                {item.value}
              </h3>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}