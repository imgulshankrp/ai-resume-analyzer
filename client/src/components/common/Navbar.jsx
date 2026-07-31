import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  HiMenu,
  HiX,
  HiBell,
  HiSearch,
  HiUserCircle,
} from "react-icons/hi";
import { FaRobot } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Upload", path: "/upload" },
    { name: "Analysis", path: "/analysis" },
    { name: "History", path: "/history" },
  ];

  const linkStyle = (path) =>
    `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
            <FaRobot className="text-white text-xl" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              ResumeAI
            </h1>

            <p className="text-xs text-slate-500">
              AI Resume Analyzer
            </p>
          </div>
        </Link>

        {/* Search */}
        <div className="hidden lg:flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-2 w-80">
          <HiSearch className="text-slate-500 text-xl" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 bg-transparent outline-none w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
          />
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={linkStyle(item.path)}
            >
              {item.name}
            </Link>
          ))}

          {/* Notification */}
          <button className="relative ml-2 w-11 h-11 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition flex items-center justify-center">
            <HiBell className="text-2xl text-slate-600 dark:text-slate-300" />

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500"></span>
          </button>

          {/* Theme */}
          <button
            onClick={toggleTheme}
            className="w-11 h-11 rounded-full bg-slate-100 dark:bg-slate-800 hover:scale-105 transition flex items-center justify-center"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400 text-xl" />
            ) : (
              <FiMoon className="text-slate-700 text-xl" />
            )}
          </button>

          {/* Profile */}
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition">
            <HiUserCircle className="text-3xl text-blue-600" />

            <div className="hidden xl:block text-left">
              <p className="text-sm font-semibold text-slate-800 dark:text-white">
                User
              </p>

              <p className="text-xs text-slate-500">
                Student
              </p>
            </div>
          </button>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-slate-700 dark:text-white"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">

          <div className="px-5 py-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 rounded-xl px-4 py-3">
              <HiSearch className="text-xl text-slate-500" />

              <input
                type="text"
                placeholder="Search..."
                className="ml-3 bg-transparent outline-none w-full text-slate-700 dark:text-slate-200"
              />
            </div>
          </div>

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block mx-4 mb-2 ${linkStyle(item.path)}`}
            >
              {item.name}
            </Link>
          ))}

          <div className="border-t border-slate-200 dark:border-slate-800 p-4 space-y-3">

            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-white"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-blue-600 text-white">
              <HiUserCircle className="text-2xl" />
              Profile
            </button>

          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;