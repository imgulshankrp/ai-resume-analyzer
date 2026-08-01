import { motion } from "framer-motion";
import {
  HiOutlineTrash,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineExclamationTriangle,
  HiOutlineShieldExclamation,
} from "react-icons/hi2";

export default function DangerZone() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-red-300 bg-gradient-to-br from-red-50 to-red-100 p-8 shadow-lg dark:border-red-800 dark:bg-gradient-to-br dark:from-red-900/20 dark:to-red-950/20"
    >
      {/* Header */}

      <div className="flex items-center gap-4">

        <div className="rounded-2xl bg-red-600 p-4 text-white shadow-lg">
          <HiOutlineShieldExclamation className="text-3xl" />
        </div>

        <div>

          <h2 className="text-3xl font-bold text-red-600">
            Danger Zone
          </h2>

          <p className="mt-2 text-slate-600 dark:text-slate-300">
            These actions are permanent and cannot be undone.
            Please proceed carefully.
          </p>

        </div>

      </div>

      {/* Warning */}

      <div className="mt-8 flex items-start gap-4 rounded-2xl border border-red-300 bg-white p-5 dark:border-red-700 dark:bg-slate-900">

        <HiOutlineExclamationTriangle className="mt-1 text-3xl text-red-500" />

        <div>

          <h3 className="font-bold text-slate-900 dark:text-white">
            Important Notice
          </h3>

          <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
            Deleting your account will permanently remove your profile,
            resume history, AI analysis reports, chat history,
            uploaded resumes, and all associated data.
            This action cannot be reversed.
          </p>

        </div>

      </div>

      {/* Actions */}

      <div className="mt-10 grid gap-5 md:grid-cols-2">

        {/* Logout */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white px-6 py-5 font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          <HiOutlineArrowLeftOnRectangle className="text-2xl" />
          Logout From Current Device
        </motion.button>

        {/* Delete */}

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 font-semibold text-white shadow-lg transition hover:shadow-xl"
        >
          <HiOutlineTrash className="text-2xl" />
          Delete My Account
        </motion.button>

      </div>

      {/* Footer */}

      <div className="mt-8 rounded-2xl bg-red-100 px-5 py-4 text-sm text-red-700 dark:bg-red-900/30 dark:text-red-300">
        💡 We recommend downloading your resume reports before deleting your account.
      </div>
    </motion.div>
  );
}