import { motion } from "framer-motion";
import {
  HiDocumentText,
  HiTrendingUp,
  HiSparkles,
} from "react-icons/hi";
import { HiTrophy } from "react-icons/hi2";

import Card from "../common/Card";
import useDashboard from "../../hooks/useDashboard";

function StatsCards() {
  const { stats, loading } = useDashboard();

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-40 animate-pulse rounded-3xl bg-slate-200 dark:bg-slate-800"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Resumes",
      value: stats.totalResumes,
      icon: HiDocumentText,
      gradient: "from-blue-500 to-cyan-500",
      trend: "+12%",
      trendColor: "text-emerald-500",
    },
    {
      title: "Average ATS",
      value: `${stats.averageScore}%`,
      icon: HiTrendingUp,
      gradient: "from-green-500 to-emerald-500",
      trend: "+5%",
      trendColor: "text-emerald-500",
    },
    {
      title: "Best ATS",
      value: `${stats.bestScore}%`,
      icon: HiTrophy,
      gradient: "from-yellow-400 to-orange-500",
      trend: "Highest",
      trendColor: "text-amber-500",
    },
    {
      title: "AI Analyses",
      value: stats.totalAIAnalysis,
      icon: HiSparkles,
      gradient: "from-violet-500 to-fuchsia-500",
      trend: "Active",
      trendColor: "text-violet-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              delay: index * 0.12,
            }}
          >
            <Card className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900">

              {/* Background Glow */}
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-slate-100 opacity-70 blur-3xl transition-all duration-500 group-hover:scale-125 dark:bg-slate-800" />

              <div className="relative flex items-start justify-between">

                <div>

                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    {card.title}
                  </p>

                  <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                    {card.value}
                  </h2>

                  <div className="mt-5 flex items-center gap-2">

                    <span
                      className={`h-2 w-2 rounded-full ${card.trendColor.replace(
                        "text",
                        "bg"
                      )}`}
                    />

                    <span
                      className={`text-sm font-semibold ${card.trendColor}`}
                    >
                      {card.trend}
                    </span>

                  </div>

                </div>

                <div
                  className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${card.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
                >
                  <Icon className="text-3xl text-white" />
                </div>

              </div>

            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StatsCards;