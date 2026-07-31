import { motion } from "framer-motion";
import {
  HiArrowUpTray,
  HiSparkles,
  HiDocumentChartBar,
  HiCheckCircle,
  HiClock,
} from "react-icons/hi2";

const activities = [
  {
    id: 1,
    title: "Resume Uploaded",
    description: "Your latest resume was uploaded successfully.",
    time: "2 mins ago",
    icon: HiArrowUpTray,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "ATS Analysis Completed",
    description: "AI generated your ATS score and suggestions.",
    time: "5 mins ago",
    icon: HiSparkles,
    color: "bg-purple-500",
  },
  {
    id: 3,
    title: "Report Downloaded",
    description: "Resume analysis report exported as PDF.",
    time: "Yesterday",
    icon: HiDocumentChartBar,
    color: "bg-emerald-500",
  },
  {
    id: 4,
    title: "Profile Updated",
    description: "Your profile information was updated.",
    time: "2 days ago",
    icon: HiCheckCircle,
    color: "bg-orange-500",
  },
];

export default function ActivityTimeline() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Your latest AI resume activities
          </p>
        </div>

        <HiClock className="text-3xl text-indigo-500" />
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.1,
              }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${activity.color} text-white shadow-lg`}
                >
                  <Icon className="text-xl" />
                </div>

                {index !== activities.length - 1 && (
                  <div className="mt-2 h-12 w-0.5 bg-slate-200 dark:bg-slate-700" />
                )}
              </div>

              <div className="flex-1 rounded-2xl bg-slate-50 p-4 transition hover:bg-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {activity.title}
                  </h3>

                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {activity.time}
                  </span>
                </div>

                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  {activity.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}