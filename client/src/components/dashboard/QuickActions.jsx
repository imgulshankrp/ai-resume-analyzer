import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiSparkles,
  HiDocumentMagnifyingGlass,
  HiArrowRight,
} from "react-icons/hi2";

import Card from "../common/Card";

const actions = [
  {
    title: "AI Resume Analysis",
    description:
      "Analyze your resume with AI, improve ATS score, identify missing keywords and receive professional suggestions.",
    icon: HiSparkles,
    gradient: "from-blue-500 to-cyan-500",
    path: "/analysis",
    badge: "Popular",
  },
  {
    title: "Compare Resume",
    description:
      "Compare multiple resumes side-by-side and discover which version performs better for ATS systems.",
    icon: HiDocumentMagnifyingGlass,
    gradient: "from-orange-500 to-amber-500",
    path: "/compare",
    badge: "New",
  },
];

export default function QuickActions() {
  return (
    <Card className="rounded-3xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Access all AI-powered resume tools
          </p>
        </div>

        <div className="rounded-2xl bg-blue-100 dark:bg-blue-900/30 px-5 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
          {actions.length} Tools
        </div>

      </div>

      {/* Cards */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.12,
              }}
              whileHover={{
                y: -8,
              }}
            >
              <Link
                to={item.path}
                className="
                  group
                  relative
                  flex
                  flex-col
                  justify-between
                  overflow-hidden
                  rounded-3xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-white
                  dark:bg-slate-900
                  p-8
                  min-h-[280px]
                  transition-all
                  duration-300
                  hover:border-blue-500
                  hover:shadow-2xl
                "
              >
                {/* Background Glow */}

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-100 dark:bg-slate-800 blur-3xl opacity-60 group-hover:scale-125 transition-all duration-500"></div>

                {/* Badge */}

                <div className="absolute right-6 top-6 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  {item.badge}
                </div>

                {/* Icon */}

                <div
                  className={`relative flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} shadow-xl`}
                >
                  <Icon className="text-4xl text-white" />
                </div>

                {/* Title */}

                <div className="relative mt-8">

                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-base leading-7 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                </div>

                {/* Footer */}

                <div className="relative mt-8 flex items-center justify-between border-t border-slate-200 dark:border-slate-700 pt-6">

                  <span className="rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                    AI Powered
                  </span>

                  <div className="flex items-center gap-2 font-semibold text-blue-600 group-hover:translate-x-2 transition-all">
                    Open
                    <HiArrowRight className="text-xl" />
                  </div>

                </div>

              </Link>
            </motion.div>
          );
        })}

      </div>

    </Card>
  );
}