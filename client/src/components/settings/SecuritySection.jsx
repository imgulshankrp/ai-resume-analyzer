import { motion } from "framer-motion";
import { HiOutlineLockClosed } from "react-icons/hi2";

export default function SecuritySection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <div className="mb-6 flex items-center gap-3">
        <HiOutlineLockClosed className="text-3xl text-indigo-600" />
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Security
        </h2>
      </div>

      <div className="grid gap-5">

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Current Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            New Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        <button className="mt-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Update Password
        </button>

      </div>
    </motion.div>
  );
}