import { useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaRobot } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../../context/ThemeContext";

function Navbar() {
  const location = useLocation();

  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Upload", path: "/upload" },
    { name: "History", path: "/history" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const linkStyle = (path) =>
    `px-3 py-2 rounded-lg transition-all duration-300 font-medium ${
      location.pathname === path
        ? "bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300"
        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md border-b dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 group"
        >
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            <FaRobot className="text-white text-xl" />
          </div>

          <div className="leading-tight">
            <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              AI Resume Analyzer
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              Smart Resume Intelligence
            </p>
          </div>
        </Link>

        {/* Desktop Menu */}
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

          <button
            onClick={toggleTheme}
            className="ml-3 w-11 h-11 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-110 transition flex items-center justify-center"
          >
            {darkMode ? (
              <FiSun className="text-yellow-400 text-xl" />
            ) : (
              <FiMoon className="text-gray-700 text-xl" />
            )}
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-3xl text-gray-700 dark:text-white"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 shadow-lg">

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`block px-6 py-4 ${linkStyle(item.path)}`}
            >
              {item.name}
            </Link>
          ))}

          <div className="px-6 py-4 border-t dark:border-gray-800">

            <button
              onClick={toggleTheme}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

          </div>

        </div>
      )}
    </nav>
  );
}

export default Navbar;