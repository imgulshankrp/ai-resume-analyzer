import { motion } from "framer-motion";
import {
  HiUserCircle,
  HiDocumentText,
  HiChartBar,
  HiFire,
} from "react-icons/hi2";

export default function UserCard() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
    >
      <div className="flex flex-col items-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-500">
          <HiUserCircle className="text-6xl text-white" />
        </div>

        <h2 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
          {user?.name || "Guest User"}
        </h2>

        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Resume Explorer
        </p>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <HiDocumentText className="text-blue-500" />
            <span>Total Resumes</span>
          </div>

          <strong>--</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <HiChartBar className="text-green-500" />
            <span>Best ATS</span>
          </div>

          <strong>--%</strong>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 p-3 dark:bg-slate-800">
          <div className="flex items-center gap-2">
            <HiFire className="text-orange-500" />
            <span>Activity</span>
          </div>

          <strong>Active</strong>
        </div>

      </div>
    </motion.div>
  );
}