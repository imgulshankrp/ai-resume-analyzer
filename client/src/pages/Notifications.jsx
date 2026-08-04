import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import MainLayout from "../components/layout/MainLayout";

import {
  HiBell,
  HiCheckCircle,
  HiDocumentText,
  HiSparkles,
  HiTrash,
} from "react-icons/hi";

import {
  getNotifications,
  markAsRead,
  markAllAsRead,
  deleteNotification,
} from "../services/notificationService";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();

      setNotifications(res.notifications || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);

      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteNotification(id);

      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkAll = async () => {
    try {
      await markAllAsRead();

      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "resume":
        return HiDocumentText;

      case "analysis":
        return HiSparkles;

      case "profile":
        return HiCheckCircle;

      default:
        return HiBell;
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "resume":
        return "bg-blue-500";

      case "analysis":
        return "bg-purple-500";

      case "profile":
        return "bg-green-500";

      default:
        return "bg-slate-500";
    }
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-[70vh] items-center justify-center">
          <h2 className="text-2xl font-bold">Loading Notifications...</h2>
        </div>
      </MainLayout>
    );
  }

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
              <h1 className="text-4xl font-bold">Notifications</h1>

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

          <button
            onClick={handleMarkAll}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Mark All As Read
          </button>
        </div>
        {/* Notifications */}

        {notifications.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-3xl border border-dashed border-slate-300 bg-white p-16 text-center shadow dark:border-slate-700 dark:bg-slate-900"
          >
            <HiBell className="mx-auto text-7xl text-slate-400" />

            <h2 className="mt-6 text-2xl font-bold text-slate-700 dark:text-white">
              No Notifications
            </h2>

            <p className="mt-3 text-slate-500">You're all caught up.</p>
          </motion.div>
        ) : (
          <div className="space-y-5">
            {notifications.map((item) => {
              const Icon = getIcon(item.type);

              return (
                <motion.div
                  key={item._id}
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  whileHover={{
                    scale: 1.01,
                  }}
                  className={`rounded-3xl border p-6 shadow-md transition ${
                    item.isRead
                      ? "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900"
                      : "border-blue-500 bg-blue-50 dark:bg-slate-800"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    {/* Left Section */}

                    <div className="flex gap-5">
                      <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${getColor(
                          item.type,
                        )} text-white`}
                      >
                        <Icon className="text-2xl" />
                      </div>

                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {item.title}
                          </h3>

                          {!item.isRead && (
                            <span className="rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                              NEW
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-slate-600 dark:text-slate-300">
                          {item.message}
                        </p>

                        <p className="mt-3 text-sm text-slate-500">
                          {new Date(item.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Right Section */}

                    <div className="flex items-center gap-2">
                      {!item.isRead && (
                        <button
                          onClick={() => handleMarkRead(item._id)}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Mark Read
                        </button>
                      )}

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="rounded-xl p-3 transition hover:bg-red-100 dark:hover:bg-red-900/30"
                      >
                        <HiTrash className="text-xl text-red-500" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
