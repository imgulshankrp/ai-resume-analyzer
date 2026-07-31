import { motion } from "framer-motion";
import {
  HiOutlineComputerDesktop,
  HiOutlineMoon,
  HiOutlineSun,
} from "react-icons/hi2";

export default function AppearanceSection() {
  const themes = [
    {
      title: "System",
      icon: HiOutlineComputerDesktop,
    },
    {
      title: "Light",
      icon: HiOutlineSun,
    },
    {
      title: "Dark",
      icon: HiOutlineMoon,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-2xl font-bold dark:text-white">
        Appearance
      </h2>

      <div className="grid gap-5 md:grid-cols-3">

        {themes.map((theme) => {
          const Icon = theme.icon;

          return (
            <button
              key={theme.title}
              className="rounded-2xl border border-slate-200 p-6 transition hover:border-indigo-500 hover:shadow-lg dark:border-slate-700"
            >
              <Icon className="mx-auto text-4xl text-indigo-600" />

              <h3 className="mt-4 font-semibold dark:text-white">
                {theme.title}
              </h3>
            </button>
          );
        })}

      </div>
    </motion.div>
  );
}