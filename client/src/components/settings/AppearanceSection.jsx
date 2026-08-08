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
      transition={{ duration: 0.35 }}
      className="
        rounded-2xl
        border border-slate-200
        bg-white
        p-5 sm:p-6
        shadow-md
        dark:border-slate-800
        dark:bg-slate-900
      "
    >
      {/* Header */}

      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
          🎨 Appearance
        </h2>

        <p className="mt-1.5 text-sm text-slate-500 dark:text-slate-400">
          Select your preferred application theme.
        </p>
      </div>

      {/* Theme Cards */}

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {themes.map((item) => {
          const Icon = item.icon;
          const active = theme === item.id;

          return (
            <motion.button
              key={item.id}
              type="button"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              onClick={() => setTheme(item.id)}
              className={`
                relative
                w-full
                rounded-xl
                border
                p-4
                text-left
                transition-all
                duration-200
                ${
                  active
                    ? `
                      border-blue-500
                      bg-blue-50
                      shadow-md
                      dark:border-cyan-400
                      dark:bg-blue-900/20
                    `
                    : `
                      border-slate-200
                      bg-slate-50
                      hover:border-blue-300
                      hover:bg-blue-50/50
                      hover:shadow-sm
                      dark:border-slate-700
                      dark:bg-slate-800/60
                      dark:hover:border-slate-600
                      dark:hover:bg-slate-800
                    `
                }
              `}
            >
              {/* Icon */}

              <div
                className={`
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  ${
                    active
                      ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white"
                      : "bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300"
                  }
                `}
              >
                <Icon className="text-2xl" />
              </div>

              {/* Title */}

              <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                {item.title}
              </h3>

              {/* Description */}

              <p className="mt-1.5 text-xs leading-5 text-slate-500 dark:text-slate-400">
                {item.description}
              </p>

              {/* Active */}

              {active && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-2.5 py-1 text-[11px] font-semibold text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-white" />
                  Active
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Current Theme */}

      <div
        className="
          mt-5
          flex
          flex-col
          gap-1
          rounded-xl
          border
          border-slate-200
          bg-slate-50
          px-4
          py-3
          dark:border-slate-700
          dark:bg-slate-800/70
          sm:flex-row
          sm:items-center
          sm:justify-between
        "
      >
        <div>
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">
            Current Theme
          </h3>

          <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
            Your selected application appearance.
          </p>
        </div>

        <span
          className="
            inline-flex
            w-fit
            rounded-full
            bg-blue-100
            px-3
            py-1
            text-xs
            font-semibold
            capitalize
            text-blue-700
            dark:bg-blue-900/30
            dark:text-cyan-300
          "
        >
          {theme}
        </span>
      </div>
    </motion.div>
  );
}