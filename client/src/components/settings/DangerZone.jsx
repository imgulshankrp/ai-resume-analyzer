import { motion } from "framer-motion";
import {
  HiOutlineTrash,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";

export default function DangerZone() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-red-300 bg-red-50 p-6 shadow-sm dark:border-red-700 dark:bg-red-900/10"
    >
      <h2 className="mb-6 text-2xl font-bold text-red-600">
        Danger Zone
      </h2>

      <p className="mb-8 text-sm text-slate-600 dark:text-slate-300">
        These actions are permanent and cannot be undone.
      </p>

      <div className="flex flex-col gap-4 sm:flex-row">

        <button className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
          <HiOutlineTrash className="text-lg" />
          Delete Account
        </button>

        <button className="flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700">
          <HiOutlineArrowLeftOnRectangle className="text-lg" />
          Logout
        </button>

      </div>
    </motion.div>
  );
}