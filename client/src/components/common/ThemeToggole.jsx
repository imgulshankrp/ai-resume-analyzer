import { useContext } from "react";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="relative flex items-center justify-center w-11 h-11 rounded-xl
      bg-slate-100 dark:bg-slate-800
      hover:bg-slate-200 dark:hover:bg-slate-700
      transition-all duration-300"
      title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
    >
      {darkMode ? (
        <FiSun className="text-yellow-400 text-xl" />
      ) : (
        <FiMoon className="text-slate-700 dark:text-slate-200 text-xl" />
      )}
    </button>
  );
}