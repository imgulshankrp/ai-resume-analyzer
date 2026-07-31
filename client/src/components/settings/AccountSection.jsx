import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

export default function AccountSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-2xl font-bold text-slate-900 dark:text-white">
        Account
      </h2>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-center">

        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl font-bold text-white">
          G
        </div>

        <div className="flex-1 space-y-4">

          <div className="flex items-center gap-3">
            <HiOutlineUser className="text-xl text-slate-500" />
            <span className="text-slate-700 dark:text-slate-300">
              Gulshan Kumar
            </span>
          </div>

          <div className="flex items-center gap-3">
            <HiOutlineEnvelope className="text-xl text-slate-500" />
            <span className="text-slate-700 dark:text-slate-300">
              gulshan@example.com
            </span>
          </div>

        </div>

        <button className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white hover:bg-indigo-700">
          <HiOutlinePencilSquare />
          Edit
        </button>

      </div>
    </motion.div>
  );
}