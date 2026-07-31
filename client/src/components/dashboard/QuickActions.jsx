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
    description: "Analyze your resume and improve your ATS score.",
    icon: HiSparkles,
    gradient: "from-blue-500 to-cyan-500",
    path: "/analysis",
  },
  
  {
    title: "Compare Resume",
    description: "Compare multiple resumes side by side.",
    icon: HiDocumentMagnifyingGlass,
    gradient: "from-orange-500 to-amber-500",
    path: "/compare",
  },
];

export default function QuickActions() {
  return (
    <Card className="rounded-3xl border border-slate-200 dark:border-slate-700">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Access all AI-powered resume tools
          </p>
        </div>

        <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          {actions.length} Tools
        </div>

      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: index * 0.1,
              }}
              whileHover={{
                y: -6,
              }}
            >
              <Link
                to={item.path}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:shadow-2xl dark:border-slate-700 dark:bg-slate-900 dark:hover:border-indigo-700"
              >
                {/* Background Glow */}
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-slate-100 opacity-60 blur-3xl transition-all duration-500 group-hover:scale-125 dark:bg-slate-800" />

                {/* Icon */}
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-lg`}
                >
                  <Icon className="text-3xl text-white" />
                </div>

                {/* Title */}
                <h3 className="relative mt-6 text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-indigo-600 dark:text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="relative mt-3 flex-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>

                {/* Footer */}
                <div className="relative mt-6 flex items-center justify-between">

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    AI Powered
                  </span>

                  <div className="flex items-center gap-2 font-semibold text-indigo-600 transition-all duration-300 group-hover:translate-x-1">
                    Open
                    <HiArrowRight className="text-lg" />
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