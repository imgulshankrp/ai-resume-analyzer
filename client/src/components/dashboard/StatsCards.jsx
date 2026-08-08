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
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="h-[165px] animate-pulse rounded-3xl bg-slate-800/60"
          />
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: "Total Resumes",
      value: stats.totalResumes,
      description: "Resumes analyzed",
      icon: HiDocumentText,
      gradient: "from-cyan-500 to-blue-500",
      dot: "bg-cyan-400",
    },
    {
      title: "Average ATS",
      value: `${stats.averageScore}%`,
      description: "Average performance",
      icon: HiTrendingUp,
      gradient: "from-emerald-500 to-cyan-500",
      dot: "bg-emerald-400",
    },
    {
      title: "Best ATS",
      value: `${stats.bestScore}%`,
      description: "Highest score",
      icon: HiTrophy,
      gradient: "from-yellow-400 to-orange-500",
      dot: "bg-orange-400",
    },
    {
      title: "AI Analyses",
      value: stats.totalAIAnalysis,
      description: "AI-powered analyses",
      icon: HiSparkles,
      gradient: "from-violet-500 to-fuchsia-500",
      dot: "bg-violet-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <motion.div
            key={card.title}
            className="h-[165px]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1,
            }}
          >
            <Card
              className="
                group relative h-full w-full overflow-hidden
                rounded-3xl
                border border-slate-700/70
                bg-slate-900/70
                p-5
                shadow-lg
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-2xl
              "
            >
              {/* Background Glow */}
              <div
                className="
                  absolute -right-10 -top-10
                  h-28 w-28
                  rounded-full
                  bg-slate-700/30
                  blur-3xl
                  transition-transform duration-500
                  group-hover:scale-125
                "
              />

              <div className="relative">
                {/* Top section */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    {/* Smaller title */}
                    <p className="text-xs font-semibold leading-5 text-slate-300">
                      {card.title}
                    </p>

                    {/* Number */}
                    <h2 className="mt-2 text-3xl font-bold leading-none tracking-tight text-white">
                      {card.value}
                    </h2>

                    {/* Description - now much closer */}
                    <div className="mt-5 flex items-start gap-2">
                      <span
                        className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${card.dot}`}
                      />

                      <span className="text-xs font-semibold leading-4 text-slate-400">
                        {card.description}
                      </span>
                    </div>
                  </div>

                  {/* Icon */}
                  <div
                    className={`
                      flex h-14 w-14 shrink-0
                      items-center justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${card.gradient}
                      shadow-lg
                      transition-all duration-300
                      group-hover:scale-105
                      group-hover:rotate-3
                    `}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>
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