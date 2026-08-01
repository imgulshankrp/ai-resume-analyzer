import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineTrophy,
  HiArrowTrendingUp,
} from "react-icons/hi2";

const stats = [
  {
    title: "Total Resumes",
    value: "18",
    subtitle: "Uploaded",
    icon: HiOutlineDocumentText,
    gradient: "from-blue-500 to-cyan-500",
    trend: "+4",
  },
  {
    title: "Highest ATS",
    value: "96%",
    subtitle: "Best Resume",
    icon: HiOutlineTrophy,
    gradient: "from-emerald-500 to-green-600",
    trend: "+6%",
  },
  {
    title: "Average ATS",
    value: "88%",
    subtitle: "Overall Score",
    icon: HiOutlineChartBar,
    gradient: "from-orange-500 to-red-500",
    trend: "+3%",
  },
  {
    title: "AI Analysis",
    value: "42",
    subtitle: "Completed",
    icon: HiOutlineSparkles,
    gradient: "from-violet-500 to-fuchsia-500",
    trend: "+12",
  },
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-7
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
            "
          >
            {/* Background Glow */}

            <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-slate-100 dark:bg-slate-800 blur-3xl opacity-60 group-hover:scale-125 transition-all duration-500"></div>

            <div className="relative flex items-start justify-between">

              <div>

                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {item.title}
                </p>

                <h2 className="mt-4 text-4xl font-bold text-slate-900 dark:text-white">
                  {item.value}
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {item.subtitle}
                </p>

                <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-100 dark:bg-green-900/30 px-3 py-1 text-sm font-semibold text-green-700 dark:text-green-300">

                  <HiArrowTrendingUp />

                  {item.trend}

                </div>

              </div>

              <div
                className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.gradient} shadow-xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
              >
                <Icon className="text-3xl text-white" />
              </div>

            </div>

          </motion.div>
        );
      })}
    </div>
  );
}