import { motion } from "framer-motion";
import {
  HiOutlineDocumentArrowUp,
  HiOutlineSparkles,
  HiOutlineDocumentChartBar,
  HiOutlineCheckCircle,
} from "react-icons/hi2";

const activities = [
  {
    title: "Resume Uploaded",
    time: "2 hours ago",
    icon: HiOutlineDocumentArrowUp,
    color: "text-blue-600",
  },
  {
    title: "AI Analysis Completed",
    time: "Yesterday",
    icon: HiOutlineSparkles,
    color: "text-purple-600",
  },
  {
    title: "ATS Report Downloaded",
    time: "2 days ago",
    icon: HiOutlineDocumentChartBar,
    color: "text-green-600",
  },
  {
    title: "Profile Updated",
    time: "Last Week",
    icon: HiOutlineCheckCircle,
    color: "text-orange-600",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Recent Activity
      </h2>

      <div className="space-y-5">
        {activities.map((activity, index) => {
          const Icon = activity.icon;

          return (
            <div
              key={index}
              className="flex items-center gap-4"
            >
              <div
                className={`flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 ${activity.color}`}
              >
                <Icon className="text-xl" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold text-slate-900 dark:text-white">
                  {activity.title}
                </h4>

                <p className="text-sm text-slate-500">
                  {activity.time}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}