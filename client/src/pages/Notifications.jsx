import MainLayout from "../components/layout/MainLayout";
import { motion } from "framer-motion";
import {
  HiBell,
  HiCheckCircle,
  HiDocumentText,
  HiSparkles,
  HiTrash,
} from "react-icons/hi";

const notifications = [
  {
    id: 1,
    title: "Resume Analysis Completed",
    message:
      "Your uploaded resume has been analyzed successfully by Gemini AI.",
    time: "2 minutes ago",
    unread: true,
    icon: HiSparkles,
    color: "bg-purple-500",
  },
  {
    id: 2,
    title: "ATS Score Improved",
    message:
      "Congratulations! Your ATS score increased to 92%.",
    time: "1 hour ago",
    unread: true,
    icon: HiCheckCircle,
    color: "bg-green-500",
  },
  {
    id: 3,
    title: "Resume Uploaded",
    message:
      "Your latest resume has been uploaded successfully.",
    time: "Yesterday",
    unread: false,
    icon: HiDocumentText,
    color: "bg-blue-500",
  },
  {
    id: 4,
    title: "New AI Suggestions",
    message:
      "Gemini AI generated new recommendations for your resume.",
    time: "2 days ago",
    unread: false,
    icon: HiSparkles,
    color: "bg-orange-500",
  },
];

export default function Notifications() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-5xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8 text-white shadow-xl"
        >
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4">
              <HiBell className="text-4xl" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                Notifications
              </h1>

              <p className="mt-2 text-blue-100">
                Stay updated with your ResumeAI activities.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Top Actions */}

        <div className="flex flex-wrap items-center justify-between gap-4">

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Notifications
          </h2>

          <div className="flex gap-3">

            <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">
              Mark all as Read
            </button>

            <button className="rounded-xl border border-red-500 px-5 py-3 font-semibold text-red-500 hover:bg-red-500 hover:text-white transition">
              Clear All
            </button>

          </div>

        </div>

        {/* Notifications */}

        <div className="space-y-5">

          {notifications.map((item) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.01 }}
                className={`rounded-3xl border p-6 shadow-md transition ${
                  item.unread
                    ? "border-blue-500 bg-blue-50 dark:bg-slate-800"
                    : "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                }`}
              >
                <div className="flex items-start justify-between">

                  <div className="flex gap-5">

                    <div
                      className={`h-14 w-14 rounded-2xl ${item.color} flex items-center justify-center text-white`}
                    >
                      <Icon className="text-2xl" />
                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                          {item.title}
                        </h3>

                        {item.unread && (
                          <span className="rounded-full bg-blue-600 px-3 py-1 text-xs text-white">
                            NEW
                          </span>
                        )}

                      </div>

                      <p className="mt-2 text-slate-600 dark:text-slate-300">
                        {item.message}
                      </p>

                      <p className="mt-3 text-sm text-slate-500">
                        {item.time}
                      </p>

                    </div>

                  </div>

                  <button className="rounded-xl p-3 hover:bg-red-100 dark:hover:bg-red-900/30">
                    <HiTrash className="text-xl text-red-500" />
                  </button>

                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </MainLayout>
  );
}