import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LayoutDashboard,
  Upload,
  Brain,
  MessageSquare,
  Briefcase,
  GitCompare,
  History,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Loader2,
} from "lucide-react";

import { API_URL } from "../../config";

export default function Sidebar({
  onClose,
  closeOnNavigation = false,
}) {
  const navigate = useNavigate();

  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(true);

  // =====================================================
  // CLOSE SIDEBAR
  // =====================================================

  const closeSidebar = () => {
    if (onClose) {
      onClose();
    }
  };

  // =====================================================
  // GET LATEST RESUME
  // =====================================================

  const getLatestResume = async () => {
    try {
      setResumeLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        closeSidebar();

        navigate("/login");

        return null;
      }

      const response = await axios.get(
        `${API_URL}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resumes =
        response?.data?.resumes || [];

      if (!resumes.length) {
        return null;
      }

      return resumes[0];

    } catch (error) {
      console.error(
        "Unable to get latest resume:",
        error
      );

      if (error?.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        closeSidebar();

        navigate("/login", {
          replace: true,
        });

        return null;
      }

      return null;

    } finally {
      setResumeLoading(false);
    }
  };

  // =====================================================
  // AI ANALYSIS
  // =====================================================

  const handleAIAnalysis = async () => {
    const resume = await getLatestResume();

    if (!resume?._id) {
      closeSidebar();

      navigate("/upload");

      return;
    }

    // IMPORTANT:
    // Sidebar stays open during navigation
    if (closeOnNavigation) {
      closeSidebar();
    }

    navigate(`/analysis/${resume._id}`, {
      state: {
        resume,
      },
    });
  };

  // =====================================================
  // RESUME CHAT
  // =====================================================

  const handleResumeChat = async () => {
    const resume = await getLatestResume();

    if (!resume?._id) {
      closeSidebar();

      navigate("/upload");

      return;
    }

    // IMPORTANT:
    // Sidebar stays open during navigation
    if (closeOnNavigation) {
      closeSidebar();
    }

    navigate(`/chat/${resume._id}`, {
      state: {
        resume,
      },
    });
  };

  // =====================================================
  // JD MATCHER
  // =====================================================

  const handleJDMatcher = async () => {
    const resume = await getLatestResume();

    if (!resume?._id) {
      closeSidebar();

      navigate("/upload");

      return;
    }

    if (closeOnNavigation) {
      closeSidebar();
    }

    navigate(`/jd-matcher/${resume._id}`, {
      state: {
        resume,
      },
    });
  };

  // =====================================================
  // NORMAL NAVIGATION
  // =====================================================

  const handleNavigation = (path) => {
    /*
      IMPORTANT:

      closeOnNavigation is false from MainLayout.

      Therefore clicking:
      Dashboard
      Upload
      Compare
      History
      JD Matcher
      Profile
      Settings

      will NOT close the sidebar.
    */

    if (closeOnNavigation) {
      closeSidebar();
    }

    navigate(path);
  };

  // =====================================================
  // NAVIGATION STYLE
  // =====================================================

  const navClass = ({ isActive }) =>
    `
      group
      flex
      w-full
      items-center
      gap-3
      rounded-xl
      px-4
      py-3
      text-sm
      font-medium
      transition-all
      duration-200

      ${
        isActive
          ? `
            bg-blue-600
            text-white
            shadow-md
            shadow-blue-600/20
          `
          : `
            text-slate-700
            hover:bg-slate-100
            hover:text-blue-600

            dark:text-slate-300
            dark:hover:bg-slate-800
            dark:hover:text-blue-400
          `
      }
    `;

  return (
    <div
      className="
        flex
        h-full
        min-h-screen
        w-full
        flex-col

        bg-white
        dark:bg-slate-950
      "
    >

      {/* =====================================================
          NAVIGATION

          No ResumeAI header here.

          No X button here.

          Hamburger is controlled by Navbar.
      ===================================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-6
        "
      >

        {/* ===================================================
            DASHBOARD
        =================================================== */}

        <div className="mb-6">

          <NavLink
            to="/dashboard"
            onClick={() =>
              handleNavigation("/dashboard")
            }
            className={navClass}
          >
            <LayoutDashboard size={20} />

            <span>
              Dashboard
            </span>
          </NavLink>

        </div>


        {/* ===================================================
            RESUME
        =================================================== */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() =>
              setResumeOpen((prev) => !prev)
            }
            className="
              mb-2
              flex
              w-full
              items-center
              justify-between
              px-4
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-400
              transition
              hover:text-slate-600

              dark:hover:text-slate-200
            "
          >

            <span>
              Resume
            </span>

            {resumeOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}

          </button>


          {resumeOpen && (
            <div className="space-y-1">

              {/* =================================================
                  UPLOAD RESUME
              ================================================= */}

              <NavLink
                to="/upload"
                onClick={() =>
                  handleNavigation("/upload")
                }
                className={navClass}
              >
                <Upload size={19} />

                <span>
                  Upload Resume
                </span>
              </NavLink>


              {/* =================================================
                  AI ANALYSIS
              ================================================= */}

              <button
                type="button"
                onClick={handleAIAnalysis}
                disabled={resumeLoading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium

                  text-slate-700

                  transition-all
                  duration-200

                  hover:bg-slate-100
                  hover:text-blue-600

                  disabled:cursor-wait
                  disabled:opacity-60

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  dark:hover:text-blue-400
                "
              >

                {resumeLoading ? (
                  <Loader2
                    size={19}
                    className="animate-spin"
                  />
                ) : (
                  <Brain size={19} />
                )}

                <span>
                  {resumeLoading
                    ? "Loading..."
                    : "AI Analysis"}
                </span>

              </button>


              {/* =================================================
                  RESUME CHAT
              ================================================= */}

              <button
                type="button"
                onClick={handleResumeChat}
                disabled={resumeLoading}
                className="
                  group
                  flex
                  w-full
                  items-center
                  gap-3
                  rounded-xl
                  px-4
                  py-3
                  text-left
                  text-sm
                  font-medium

                  text-slate-700

                  transition-all
                  duration-200

                  hover:bg-slate-100
                  hover:text-blue-600

                  disabled:cursor-wait
                  disabled:opacity-60

                  dark:text-slate-300
                  dark:hover:bg-slate-800
                  dark:hover:text-blue-400
                "
              >

                <MessageSquare size={19} />

                <span>
                  Resume Chat
                </span>

              </button>


              {/* =================================================
                  COMPARE RESUME
              ================================================= */}

              <NavLink
                to="/compare"
                onClick={() =>
                  handleNavigation("/compare")
                }
                className={navClass}
              >
                <GitCompare size={19} />

                <span>
                  Compare Resume
                </span>
              </NavLink>


              {/* =================================================
                  HISTORY
              ================================================= */}

              <NavLink
                to="/history"
                onClick={() =>
                  handleNavigation("/history")
                }
                className={navClass}
              >
                <History size={19} />

                <span>
                  History
                </span>
              </NavLink>

            </div>
          )}

        </div>


        {/* =====================================================
            CAREER
        ===================================================== */}

        <div className="mb-6">

          <div
            className="
              mb-2
              px-4
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            Career
          </div>


          <button
            type="button"
            onClick={handleJDMatcher}
            disabled={resumeLoading}
            className="
              group
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-left
              text-sm
              font-medium
              text-slate-700
              transition-all
              duration-200
              hover:bg-slate-100
              hover:text-blue-600
              disabled:cursor-wait
              disabled:opacity-60
              dark:text-slate-300
              dark:hover:bg-slate-800
              dark:hover:text-blue-400
            "
          >
            {resumeLoading ? (
              <Loader2
                size={20}
                className="animate-spin"
              />
            ) : (
              <Briefcase size={20} />
            )}

            <span>
              {resumeLoading
                ? "Loading..."
                : "JD Matcher"}
            </span>
          </button>

        </div>


        {/* =====================================================
            ACCOUNT
        ===================================================== */}

        <div>

          <div
            className="
              mb-2
              px-4
              text-xs
              font-bold
              uppercase
              tracking-wider
              text-slate-400
            "
          >
            Account
          </div>


          <div className="space-y-1">

            {/* =================================================
                PROFILE
            ================================================= */}

            <NavLink
              to="/profile"
              onClick={() =>
                handleNavigation("/profile")
              }
              className={navClass}
            >
              <User size={20} />

              <span>
                Profile
              </span>
            </NavLink>


            {/* =================================================
                SETTINGS
            ================================================= */}

            <NavLink
              to="/settings"
              onClick={() =>
                handleNavigation("/settings")
              }
              className={navClass}
            >
              <Settings size={20} />

              <span>
                Settings
              </span>
            </NavLink>

          </div>

        </div>

      </div>

    </div>
  );
}