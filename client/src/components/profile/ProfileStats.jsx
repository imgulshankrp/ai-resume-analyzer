import { motion } from "framer-motion";
import {
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineTrophy,
} from "react-icons/hi2";

const stats = [
  {
    title: "Total Resumes",
    value: 18,
    icon: HiOutlineDocumentText,
    color: "from-indigo-500 to-indigo-700",
  },
  {
    title: "Highest ATS",
    value: "96%",
    icon: HiOutlineTrophy,
    color: "from-emerald-500 to-green-700",
  },
  {
    title: "Average ATS",
    value: "88%",
    icon: HiOutlineChartBar,
    color: "from-orange-500 to-red-600",
  },
  {
    title: "AI Analysis",
    value: 42,
    icon: HiOutlineSparkles,
    color: "from-purple-500 to-pink-600",
  },
];

export default function ProfileStats() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.08 }}
            whileHover={{ y: -6 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-white shadow-lg`}
            >
              <Icon className="text-2xl" />
            </div>

            <h3 className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
              {item.title}
            </h3>

            <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
              {item.value}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}