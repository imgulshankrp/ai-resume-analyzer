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
  LogOut,
  FileText,
  ChevronDown,
  ChevronRight,
  Loader2,
  X,
} from "lucide-react";

import { API_URL } from "../../config";

export default function Sidebar({ onClose }) {
  const navigate = useNavigate();

  const [resumeLoading, setResumeLoading] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(true);

  /* =====================================================
     CLOSE SIDEBAR
  ===================================================== */

  const closeSidebar = () => {
    if (onClose) {
      onClose();
    }
  };


  /* =====================================================
     GET LATEST RESUME
  ===================================================== */

  const getLatestResume = async () => {
    try {
      setResumeLoading(true);

      const token = localStorage.getItem("token");

      if (!token) {
        closeSidebar();
        navigate("/login");
        return null;
      }

      const response = await axios.get(`${API_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const resumes = response?.data?.resumes || [];

      if (!resumes.length) {
        return null;
      }

      return resumes[0];

    } catch (error) {
      console.error("Unable to get latest resume:", error);

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


  /* =====================================================
     AI ANALYSIS
  ===================================================== */

  const handleAIAnalysis = async () => {
    const resume = await getLatestResume();

    if (!resume?._id) {
      closeSidebar();
      navigate("/upload");
      return;
    }

    closeSidebar();

    navigate(`/analysis/${resume._id}`, {
      state: {
        resume,
      },
    });
  };


  /* =====================================================
     RESUME CHAT
  ===================================================== */

  const handleResumeChat = async () => {
    const resume = await getLatestResume();

    if (!resume?._id) {
      closeSidebar();
      navigate("/upload");
      return;
    }

    closeSidebar();

    navigate(`/chat/${resume._id}`, {
      state: {
        resume,
      },
    });
  };


  /* =====================================================
     NORMAL NAVIGATION
  ===================================================== */

  const handleNavigation = (path) => {
    closeSidebar();
    navigate(path);
  };


  /* =====================================================
     LOGOUT
  ===================================================== */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    closeSidebar();

    navigate("/login", {
      replace: true,
    });
  };


  /* =====================================================
     NAV LINK STYLE
  ===================================================== */

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

      {/* =================================================
          SIDEBAR HEADER
      ================================================= */}

      <div
        className="
          flex
          h-20
          shrink-0
          items-center
          gap-3
          border-b
          border-slate-200
          px-5
          dark:border-slate-800
        "
      >

        {/* Logo */}

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-gradient-to-br
            from-blue-600
            to-indigo-600
            text-white
            shadow-lg
          "
        >
          <FileText size={22} />
        </div>


        <div className="min-w-0 flex-1">

          <h1
            className="
              text-xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
            "
          >
            ResumeAI
          </h1>

          <p
            className="
              text-[11px]
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            Resume Intelligence
          </p>

        </div>


        {/* Mobile close button */}

        <button
          type="button"
          onClick={closeSidebar}
          aria-label="Close sidebar"
          className="
            flex
            h-9
            w-9
            shrink-0
            items-center
            justify-center
            rounded-lg
            text-slate-500
            transition
            hover:bg-slate-100
            hover:text-slate-800
            dark:text-slate-400
            dark:hover:bg-slate-800
            dark:hover:text-white
          "
        >
          <X size={21} />
        </button>

      </div>


      {/* =================================================
          NAVIGATION
      ================================================= */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-5
        "
      >

        {/* =================================================
            DASHBOARD
        ================================================= */}

        <div className="mb-6">

          <NavLink
            to="/dashboard"
            onClick={closeSidebar}
            className={navClass}
          >
            <LayoutDashboard size={20} />

            <span>Dashboard</span>
          </NavLink>

        </div>


        {/* =================================================
            RESUME
        ================================================= */}

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

            <span>Resume</span>

            {resumeOpen ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronRight size={16} />
            )}

          </button>


          {resumeOpen && (
            <div className="space-y-1">

              {/* Upload Resume */}

              <NavLink
                to="/upload"
                onClick={closeSidebar}
                className={navClass}
              >
                <Upload size={19} />

                <span>Upload Resume</span>
              </NavLink>


              {/* AI Analysis */}

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


              {/* Resume Chat */}

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

                <span>Resume Chat</span>

              </button>


              {/* Compare Resume */}

              <NavLink
                to="/compare"
                onClick={closeSidebar}
                className={navClass}
              >
                <GitCompare size={19} />

                <span>Compare Resume</span>
              </NavLink>


              {/* History */}

              <NavLink
                to="/history"
                onClick={closeSidebar}
                className={navClass}
              >
                <History size={19} />

                <span>History</span>
              </NavLink>

            </div>
          )}

        </div>


        {/* =================================================
            CAREER
        ================================================= */}

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


          <NavLink
            to="/jd-matcher"
            onClick={closeSidebar}
            className={navClass}
          >
            <Briefcase size={20} />

            <span>JD Matcher</span>
          </NavLink>

        </div>


        {/* =================================================
            ACCOUNT
        ================================================= */}

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

            {/* Profile */}

            <NavLink
              to="/profile"
              onClick={closeSidebar}
              className={navClass}
            >
              <User size={20} />

              <span>Profile</span>
            </NavLink>


            {/* Settings */}

            <NavLink
              to="/settings"
              onClick={closeSidebar}
              className={navClass}
            >
              <Settings size={20} />

              <span>Settings</span>
            </NavLink>

          </div>

        </div>

      </div>


      {/* =================================================
          LOGOUT
      ================================================= */}

      <div
        className="
          shrink-0
          border-t
          border-slate-200
          p-3
          dark:border-slate-800
        "
      >

        <button
          type="button"
          onClick={handleLogout}
          className="
            flex
            w-full
            items-center
            gap-3
            rounded-xl
            px-4
            py-3
            text-sm
            font-medium
            text-red-600
            transition-all
            duration-200
            hover:bg-red-50
            dark:text-red-400
            dark:hover:bg-red-950/30
          "
        >

          <LogOut size={20} />

          <span>Logout</span>

        </button>

      </div>

    </div>
  );
}