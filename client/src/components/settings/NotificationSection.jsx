import { motion } from "framer-motion";

const items = [
  "Email Notifications",
  "Analysis Completed",
  "Weekly Summary",
];

export default function NotificationSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Notifications
      </h2>

      <div className="space-y-5">

        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between"
          >
            <span className="font-medium dark:text-white">
              {item}
            </span>

            <input
              type="checkbox"
              defaultChecked
              className="h-5 w-5 accent-indigo-600"
            />
          </div>
        ))}

      </div>
    </motion.div>
  );
}