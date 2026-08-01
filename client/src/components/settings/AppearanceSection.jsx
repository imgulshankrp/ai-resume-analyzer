import { useContext } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineComputerDesktop,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";

import { ThemeContext } from "../../context/ThemeContext";

export default function AppearanceSection() {
  const { theme, setTheme } = useContext(ThemeContext);

  const themes = [
    {
      id: "system",
      title: "System",
      icon: HiOutlineComputerDesktop,
      description: "Automatically follows your device theme.",
    },
    {
      id: "light",
      title: "Light",
      icon: HiOutlineSun,
      description: "Bright interface for daytime use.",
    },
    {
      id: "dark",
      title: "Dark",
      icon: HiOutlineMoon,
      description: "Comfortable viewing at night.",
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
            🎨 Appearance
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Select your preferred application theme.
          </p>

        </div>

      </div>

      {/* Theme Cards */}

      <div className="mt-8 grid gap-6 md:grid-cols-3">

        {themes.map((item) => {
          const Icon = item.icon;

          const active = theme === item.id;

          return (
            <motion.button
              key={item.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setTheme(item.id)}
              className={`rounded-2xl border p-6 text-left transition-all duration-300 ${
                active
                  ? "border-blue-600 bg-blue-50 shadow-xl dark:bg-blue-900/20"
                  : "border-slate-200 hover:border-blue-300 hover:shadow-lg dark:border-slate-700"
              }`}
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
                  active
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                    : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                }`}
              >
                <Icon className="text-3xl" />
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {item.description}
              </p>

              {active && (
                <div className="mt-5 inline-flex rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                  Active
                </div>
              )}
            </motion.button>
          );
        })}

      </div>

      {/* Current Theme */}

      <div className="mt-8 rounded-2xl bg-slate-50 p-5 dark:bg-slate-800">

        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Current Theme
        </h3>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          <span className="font-bold capitalize">{theme}</span> mode is currently selected.
        </p>

      </div>

    </motion.div>
  );
}