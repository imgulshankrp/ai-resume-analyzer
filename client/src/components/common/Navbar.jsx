import { useState, useEffect, useContext, useRef } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  HiMenu,
  HiX,
  HiBell,
  HiSearch,
  HiLogout,
  HiChevronDown,
  HiPlus,
} from "react-icons/hi";

import { FaRobot } from "react-icons/fa";

import { FiSun, FiMoon } from "react-icons/fi";

import { ThemeContext } from "../../context/ThemeContext";

import { getProfile } from "../../services/profileService";

import {
  getNotifications,
  markAsRead,
} from "../../services/notificationService";

import { searchResumes } from "../../services/historyService";

export default function Navbar() {
  const navigate = useNavigate();

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const BACKEND_URL = import.meta.env.VITE_API_URL.replace("/api", "");

  const notificationRef = useRef(null);

  const profileRef = useRef(null);

  const searchRef = useRef(null);

  const [menuOpen, setMenuOpen] = useState(false);

  const [showNotifications, setShowNotifications] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [search, setSearch] = useState("");

  const [suggestions, setSuggestions] = useState([]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  const [notifications, setNotifications] = useState([]);

  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadProfile();

    loadNotifications();

    const interval = setInterval(() => {
      loadNotifications();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }

      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }

      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser({
        name: res.user.name || "",
        email: res.user.email || "",
        avatar: res.user.avatar || "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const loadNotifications = async () => {
    try {
      const res = await getNotifications();

      const list = res.notifications || [];

      setNotifications(list.slice(0, 5));

      setUnreadCount(list.filter((item) => !item.isRead).length);
    } catch (err) {
      console.error(err);
    }
  };

  const handleNotificationClick = async (id) => {
    try {
      await markAsRead(id);

      loadNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = async (e) => {
    const value = e.target.value;

    setSearch(value);

    if (!value.trim()) {
      setSuggestions([]);

      setShowSuggestions(false);

      return;
    }

    try {
      const res = await searchResumes(value);

      setSuggestions(res.resumes || []);

      setShowSuggestions(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key !== "Enter") return;

    const keyword = search.trim();

    if (!keyword) return;

    navigate(`/history?search=${encodeURIComponent(keyword)}`);

    setShowSuggestions(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-xl shadow-sm dark:border-slate-800 dark:bg-slate-900/90">
      <div className="mx-auto flex h-20 items-center justify-between px-6">
        {/* ================= Logo ================= */}

        <Link to="/dashboard" className="flex shrink-0 items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">
            <FaRobot className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-xl font-bold text-slate-900 dark:text-white">
              ResumeAI
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              AI Resume Analyzer
            </p>
          </div>
        </Link>

        {/* ================= Search ================= */}

        <div
          ref={searchRef}
          className="relative mx-8 hidden flex-1 justify-center lg:flex"
        >
          <div
            className="
    flex
    w-full
    max-w-2xl
    items-center
    rounded-2xl
    border
    border-slate-200
    bg-slate-50
    px-5
    py-3
    transition-all
    duration-300
    focus-within:border-blue-500
    focus-within:bg-white
    focus-within:dark:bg-slate-800
    focus-within:shadow-xl
    dark:border-slate-700
    dark:bg-slate-800
  "
          >
            <HiSearch className="text-2xl text-blue-600" />

            <input
              type="text"
              value={search}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              placeholder="Search resumes, ATS score or skills..."
              className="ml-4 w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 outline-none dark:text-white dark:placeholder:text-slate-500"
            />
          </div>

          {/* Search Suggestions */}

          {showSuggestions && (
            <div className="absolute left-0 right-0 top-full z-50 mx-auto mt-3 w-full max-w-2xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
              {suggestions.length === 0 ? (
                <div className="p-6 text-center text-slate-500">
                  No Resume Found
                </div>
              ) : (
                suggestions.map((resume) => (
                  <button
                    key={resume._id}
                    onClick={() => {
                      navigate("/history");

                      setShowSuggestions(false);

                      setSearch("");
                    }}
                    className="flex w-full items-center justify-between border-b border-slate-100 px-5 py-4 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800"
                  >
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {resume.fileName}
                      </p>

                      <p className="mt-1 text-sm text-slate-500">
                        ATS Score : {resume.score}%
                      </p>
                    </div>

                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      View
                    </span>
                  </button>
                ))
              )}
            </div>
          )}
        </div>

        {/* ================= Right Side ================= */}

        <div className="hidden items-center gap-4 lg:flex">
          {/* Upload */}

          <button
            onClick={() => navigate("/upload")}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            <HiPlus className="text-lg" />
            Upload Resume
          </button>
          {/* ================= Notifications ================= */}

          <div ref={notificationRef} className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
            >
              <HiBell className="text-2xl text-slate-700 dark:text-white" />

              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-96 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="border-b border-slate-200 px-6 py-5 dark:border-slate-700">
                  <h3 className="text-lg font-bold dark:text-white">
                    Notifications
                  </h3>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-8 text-center text-slate-500">
                      No Notifications
                    </div>
                  ) : (
                    notifications.map((item) => (
                      <button
                        key={item._id}
                        onClick={() => handleNotificationClick(item._id)}
                        className={`flex w-full items-start gap-4 border-b border-slate-100 p-5 text-left transition hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800 ${
                          !item.isRead ? "bg-blue-50 dark:bg-slate-800" : ""
                        }`}
                      >
                        <div
                          className={`mt-2 h-3 w-3 rounded-full ${
                            item.isRead ? "bg-slate-300" : "bg-blue-600"
                          }`}
                        />

                        <div className="flex-1">
                          <h4 className="font-semibold text-slate-900 dark:text-white">
                            {item.title}
                          </h4>

                          <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                            {item.message}
                          </p>
                        </div>
                      </button>
                    ))
                  )}
                </div>

                <button
                  onClick={() => {
                    navigate("/notifications");

                    setShowNotifications(false);
                  }}
                  className="w-full border-t border-slate-200 py-4 font-semibold text-blue-600 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
                >
                  View All Notifications →
                </button>
              </div>
            )}
          </div>

          {/* ================= Theme ================= */}

          <button
            onClick={toggleTheme}
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 transition hover:rotate-12 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700"
          >
            {darkMode ? (
              <FiSun className="text-xl text-yellow-400" />
            ) : (
              <FiMoon className="text-xl text-slate-700 dark:text-white" />
            )}
          </button>

          {/* ================= Profile ================= */}

          <div ref={profileRef} className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-3 rounded-xl px-2 py-2 transition hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-blue-500">
                {user.avatar ? (
                  <img
                    src={`${BACKEND_URL}${user.avatar}`}
                    alt={user.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-blue-600 text-lg font-bold text-white">
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>

              <div className="hidden xl:block text-left">
                <p className="font-semibold text-slate-800 dark:text-white">
                  {user.name || "User"}
                </p>
              </div>

              <HiChevronDown className="text-slate-500" />
            </button>
            {/* ================= Profile Dropdown ================= */}

            {showProfile && (
              <div className="absolute right-0 top-14 z-50 w-72 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-4 border-b border-slate-200 p-5 dark:border-slate-700">
                  <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-blue-500">
                    {user.avatar ? (
                      <img
                        src={`${BACKEND_URL}${user.avatar}`}
                        alt={user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-blue-600 text-xl font-bold text-white">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">
                      {user.name}
                    </h3>

                    <p className="truncate text-sm text-slate-500">
                      {user.email}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/profile");
                    setShowProfile(false);
                  }}
                  className="block w-full px-5 py-3 text-left transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                >
                  👤 My Profile
                </button>

                <button
                  onClick={() => {
                    navigate("/settings");
                    setShowProfile(false);
                  }}
                  className="block w-full px-5 py-3 text-left transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                >
                  ⚙️ Settings
                </button>

                <button
                  onClick={() => {
                    navigate("/notifications");
                    setShowProfile(false);
                  }}
                  className="block w-full px-5 py-3 text-left transition hover:bg-slate-100 dark:text-white dark:hover:bg-slate-800"
                >
                  🔔 Notifications
                </button>

                <hr className="border-slate-200 dark:border-slate-700" />

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 px-5 py-3 text-red-600 transition hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <HiLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= Mobile Button ================= */}

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-3xl text-slate-700 dark:text-white lg:hidden"
        >
          {menuOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* ================= Mobile Menu ================= */}

      {menuOpen && (
        <div className="border-t border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 lg:hidden">
          <button
            onClick={() => {
              navigate("/upload");
              setMenuOpen(false);
            }}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white"
          >
            <HiPlus />
            Upload Resume
          </button>

          <button
            onClick={() => {
              navigate("/profile");
              setMenuOpen(false);
            }}
            className="mb-3 w-full rounded-xl bg-slate-100 py-3 dark:bg-slate-800 dark:text-white"
          >
            Profile
          </button>

          <button
            onClick={() => {
              navigate("/settings");
              setMenuOpen(false);
            }}
            className="mb-3 w-full rounded-xl bg-slate-100 py-3 dark:bg-slate-800 dark:text-white"
          >
            Settings
          </button>

          <button
            onClick={() => {
              navigate("/notifications");
              setMenuOpen(false);
            }}
            className="mb-3 w-full rounded-xl bg-slate-100 py-3 dark:bg-slate-800 dark:text-white"
          >
            Notifications
          </button>

          <button
            onClick={() => {
              toggleTheme();
              setMenuOpen(false);
            }}
            className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-100 py-3 dark:bg-slate-800 dark:text-white"
          >
            {darkMode ? <FiSun /> : <FiMoon />}
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>

          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600 py-3 text-white"
          >
            <HiLogout />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
