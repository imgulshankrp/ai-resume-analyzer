import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineShieldCheck,
  HiOutlineEye,
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineCloudArrowDown,
} from "react-icons/hi2";

export default function PrivacySection() {
  const [settings, setSettings] = useState({
    publicProfile: false,
    resumeVisibility: true,
    analytics: true,
    aiTraining: false,
  });

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  const privacyItems = [
    {
      key: "publicProfile",
      title: "Public Profile",
      description:
        "Allow other users to discover your public profile.",
      icon: HiOutlineEye,
    },
    {
      key: "resumeVisibility",
      title: "Resume Visibility",
      description:
        "Keep your uploaded resumes visible only to you.",
      icon: HiOutlineDocumentText,
    },
    {
      key: "analytics",
      title: "Analytics Sharing",
      description:
        "Share anonymous usage data to improve ResumeAI.",
      icon: HiOutlineChartBar,
    },
    {
      key: "aiTraining",
      title: "AI Training",
      description:
        "Allow anonymous resume data to improve AI responses.",
      icon: HiOutlineShieldCheck,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            🛡 Privacy
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Control your privacy and data sharing preferences.
          </p>

        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          Save Privacy
        </button>

      </div>

      {/* Privacy Options */}

      <div className="mt-8 space-y-5">

        {privacyItems.map((item) => {
          const Icon = item.icon;

          return (
            <motion.div
              key={item.key}
              whileHover={{ scale: 1.01 }}
              className="flex items-center justify-between rounded-2xl border border-slate-200 p-5 transition hover:border-blue-400 hover:shadow-md dark:border-slate-700"
            >
              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                  <Icon className="text-2xl" />
                </div>

                <div>

                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>

                </div>

              </div>

              {/* Toggle */}

              <button
                onClick={() => toggle(item.key)}
                className={`relative h-7 w-14 rounded-full transition ${
                  settings[item.key]
                    ? "bg-blue-600"
                    : "bg-slate-300 dark:bg-slate-700"
                }`}
              >
                <span
                  className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                    settings[item.key]
                      ? "left-8"
                      : "left-1"
                  }`}
                />
              </button>

            </motion.div>
          );
        })}

      </div>

      {/* Download Data */}

      <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-700 dark:bg-slate-800">

        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div className="flex items-center gap-4">

            <div className="rounded-2xl bg-blue-600 p-3 text-white">
              <HiOutlineCloudArrowDown className="text-2xl" />
            </div>

            <div>

              <h3 className="font-bold text-slate-900 dark:text-white">
                Download Your Data
              </h3>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Export your profile, resumes, AI reports and settings.
              </p>

            </div>

          </div>

          <button className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 font-semibold text-white transition hover:scale-105">
            Download Data
          </button>

        </div>

      </div>

    </motion.div>
  );
}