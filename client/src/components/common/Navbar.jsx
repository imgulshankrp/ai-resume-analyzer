import { useState, useContext } from "react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  HiMenu,
  HiX,
  HiBell,
  HiSearch,
  HiUserCircle,
  HiLogout,
} from "react-icons/hi";

import { FaRobot } from "react-icons/fa";
import { FiSun, FiMoon } from "react-icons/fi";

import { ThemeContext } from "../../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const { darkMode, toggleTheme } =
    useContext(ThemeContext);

  const navLinks = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },
    {
      name: "Upload",
      path: "/upload",
    },
    {
      name: "Analysis",
      path: "/analysis",
    },
    {
      name: "History",
      path: "/history",
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  const linkStyle = (path) =>
    `px-4 py-2 rounded-xl transition-all duration-300 font-medium ${
      location.pathname === path
        ? "bg-blue-600 text-white shadow-lg"
        : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md shadow-sm dark:border-slate-800 dark:bg-slate-900/90">

      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        {/* Logo */}

        <Link
          to="/dashboard"
          className="flex items-center gap-3"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg">
            <FaRobot className="text-xl text-white" />
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

        <div className="hidden lg:flex w-80 items-center rounded-xl bg-slate-100 dark:bg-slate-800 px-4 py-2">

          <HiSearch className="text-xl text-slate-500" />

          <input
            type="text"
            placeholder="Search..."
            className="ml-3 w-full bg-transparent outline-none placeholder:text-slate-400 dark:text-slate-200"
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

          {/* Notifications */}

          <button
            onClick={() => navigate("/notifications")}
            className="relative ml-2 flex h-11 w-11 items-center justify-center rounded-full transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <HiBell className="text-2xl text-slate-600 dark:text-slate-300" />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>

          </button>
                    {/* Theme */}

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 transition-all duration-300 hover:scale-110 dark:bg-slate-800"
            title="Toggle Theme"
          >
            {darkMode ? (
              <FiSun className="text-xl text-yellow-400" />
            ) : (
              <FiMoon className="text-xl text-slate-700 dark:text-white" />
            )}
          </button>

          {/* Profile Dropdown */}

          <div className="relative group">

            <button className="flex items-center gap-2 rounded-xl px-3 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800">

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

            {/* Dropdown */}

            <div className="invisible absolute right-0 top-14 z-50 w-56 rounded-2xl border border-slate-200 bg-white p-2 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:opacity-100 dark:border-slate-700 dark:bg-slate-900">

              <button
                onClick={() => navigate("/profile")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              >
                👤 Profile
              </button>

              <button
                onClick={() => navigate("/settings")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              >
                ⚙️ Settings
              </button>

              <button
                onClick={() => navigate("/notifications")}
                className="w-full rounded-xl px-4 py-3 text-left text-slate-700 transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
              >
                🔔 Notifications
              </button>

              <hr className="my-2 border-slate-200 dark:border-slate-700" />

              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-xl px-4 py-3 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <HiLogout className="text-lg" />
                Logout
              </button>

            </div>

          </div>

        </div>

        {/* Mobile Button */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-slate-700 dark:text-white md:hidden"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 md:hidden">

          {/* Search */}

          <div className="px-5 py-4">

            <div className="flex items-center rounded-xl bg-slate-100 px-4 py-3 dark:bg-slate-800">

              <HiSearch className="text-xl text-slate-500" />

              <input
                type="text"
                placeholder="Search..."
                className="ml-3 w-full bg-transparent outline-none dark:text-white"
              />

            </div>

          </div>

          {/* Navigation */}

          {navLinks.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className={`mx-4 mb-2 block ${linkStyle(item.path)}`}
            >
              {item.name}
            </Link>
          ))}

          <div className="space-y-3 border-t border-slate-200 p-4 dark:border-slate-800">

            <button
              onClick={() => {
                toggleTheme();
                setMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-slate-100 py-3 text-slate-700 dark:bg-slate-800 dark:text-white"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
              {darkMode ? "Light Mode" : "Dark Mode"}
            </button>

            <button
              onClick={() => {
                navigate("/notifications");
                setMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 py-3 text-white"
            >
              <HiBell className="text-xl" />
              Notifications
            </button>

            <button
              onClick={() => {
                navigate("/profile");
                setMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 py-3 text-white"
            >
              <HiUserCircle className="text-2xl" />
              Profile
            </button>

            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-3 rounded-xl bg-red-600 py-3 text-white hover:bg-red-700"
            >
              <HiLogout className="text-xl" />
              Logout
            </button>

          </div>

        </div>
      )}

    </nav>
  );
}

export default Navbar;