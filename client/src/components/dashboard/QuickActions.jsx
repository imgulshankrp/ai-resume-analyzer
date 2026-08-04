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
    description: "Analyze your resume and improve ATS score.",
    icon: HiSparkles,
    gradient: "from-blue-500 to-cyan-500",
    path: "/analysis",
    badge: "Popular",
  },
  {
    title: "Compare Resume",
    description: "Compare multiple resumes instantly.",
    icon: HiDocumentMagnifyingGlass,
    gradient: "from-orange-500 to-amber-500",
    path: "/compare",
    badge: "New",
  },
];

export default function QuickActions() {
  return (
    <Card className="h-full rounded-3xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">

      {/* Header */}

      <div className="mb-6 flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            AI tools for your resume
          </p>

        </div>

        <div className="rounded-xl bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
          {actions.length} Tools
        </div>

      </div>

      <div className="space-y-4">

        {actions.map((item, index) => {

          const Icon = item.icon;

          return (

            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
            >

              <Link
                to={item.path}
                className="group flex items-center gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-blue-500 hover:shadow-lg dark:border-slate-700 dark:bg-slate-900"
              >

                <div
                  className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient}`}
                >

                  <Icon className="text-3xl text-white" />

                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <h3 className="font-bold text-slate-900 dark:text-white">

                      {item.title}

                    </h3>

                    <span className="rounded-full bg-blue-600 px-2 py-1 text-[10px] font-semibold text-white">

                      {item.badge}

                    </span>

                  </div>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">

                    {item.description}

                  </p>

                </div>

                <HiArrowRight className="text-2xl text-blue-600 transition group-hover:translate-x-1" />

              </Link>

            </motion.div>

          );

        })}

      </div>

    </Card>
  );
}