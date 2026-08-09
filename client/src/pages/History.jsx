import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import {
  HiSearch,
  HiTrash,
  HiPlus,
  HiDotsVertical,
  HiDocumentText,
  HiChevronDown,
  HiEye,
  HiX,
  HiClock,
} from "react-icons/hi";
import MainLayout from "../components/layout/MainLayout";
import { API_URL } from "../config";

/* =========================================================
   SCORE RING
========================================================= */

function ScoreRing({ score = 0, size = 58 }) {
  const value = Math.max(0, Math.min(100, Number(score) || 0));

  const getColor = () => {
    if (value >= 80) return "#10b981";
    if (value >= 60) return "#f59e0b";
    return "#ef476f";
  };

  const color = getColor();

  return (
    <div
      className="relative flex items-center justify-center rounded-full shrink-0"
      style={{
        width: size,
        height: size,
        background: `conic-gradient(${color} ${value * 3.6}deg, rgba(100,116,139,0.35) 0deg)`,
      }}
    >
      <div
        className="
          absolute
          inset-[5px]
          rounded-full
          flex
          items-center
          justify-center
          bg-white
          dark:bg-[#0b1729]
        "
      >
        <span
          className="font-bold text-xs sm:text-sm"
          style={{ color }}
        >
          {value}%
        </span>
      </div>
    </div>
  );
}

/* =========================================================
   SCORE COLOR
========================================================= */

function getScoreColor(score) {
  const value = Number(score) || 0;

  if (value >= 80) return "text-emerald-500";
  if (value >= 60) return "text-amber-500";
  return "text-pink-500";
}

/* =========================================================
   SCORE FILTER
========================================================= */

function matchesScoreFilter(score, filter) {
  const value = Number(score) || 0;

  if (filter === "high") {
    return value >= 80;
  }

  if (filter === "medium") {
    return value >= 60 && value < 80;
  }

  if (filter === "low") {
    return value < 60;
  }

  return true;
}

/* =========================================================
   HISTORY
========================================================= */

function History() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [scoreFilter, setScoreFilter] = useState("all");

  const [openMenuId, setOpenMenuId] = useState(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  const [showClearModal, setShowClearModal] = useState(false);

  /* =========================================================
     FETCH HISTORY
  ========================================================= */

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(`${API_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(res.data.resumes || []);
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        toast.error("Please login again.");
      } else {
        toast.error("Failed to load resume history.");
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     DELETE
  ========================================================= */

  const openDeleteModal = (resume) => {
    setOpenMenuId(null);
    setSelectedResume(resume);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setSelectedResume(null);
    setShowDeleteModal(false);
  };

  const handleDelete = async () => {
    if (!selectedResume) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/history/${selectedResume._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== selectedResume._id)
      );

      toast.success("Resume deleted successfully.");

      closeDeleteModal();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        toast.error("Please login again.");
      } else {
        toast.error("Failed to delete resume.");
      }
    }
  };

  /* =========================================================
     CLEAR HISTORY
  ========================================================= */

  const handleClearHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(`${API_URL}/history/clear`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes([]);
      setShowClearModal(false);

      toast.success("All resume history deleted successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to clear resume history.");
    }
  };

  /* =========================================================
     VIEW ANALYSIS
  ========================================================= */

  const handleViewAnalysis = (resume) => {
    setOpenMenuId(null);

    navigate(`/analysis/${resume._id}`, {
      state: {
        resume,
      },
    });
  };

  /* =========================================================
     SEARCH / FILTER / SORT
  ========================================================= */

  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    if (searchTerm.trim()) {
      const search = searchTerm.toLowerCase().trim();

      data = data.filter((resume) => {
        const fileName =
          resume.fileName?.toLowerCase() || "";

        const jobTitle =
          resume.jobTitle?.toLowerCase() ||
          resume.position?.toLowerCase() ||
          resume.targetRole?.toLowerCase() ||
          resume.role?.toLowerCase() ||
          "";

        return (
          fileName.includes(search) ||
          jobTitle.includes(search)
        );
      });
    }

    data = data.filter((resume) =>
      matchesScoreFilter(resume.score, scoreFilter)
    );

    switch (sortBy) {
      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt || 0) -
            new Date(b.createdAt || 0)
        );
        break;

      case "highest":
        data.sort(
          (a, b) =>
            (Number(b.score) || 0) -
            (Number(a.score) || 0)
        );
        break;

      case "lowest":
        data.sort(
          (a, b) =>
            (Number(a.score) || 0) -
            (Number(b.score) || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt || 0) -
            new Date(a.createdAt || 0)
        );
    }

    return data;
  }, [resumes, searchTerm, scoreFilter, sortBy]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const highCount = resumes.filter((resume) =>
    matchesScoreFilter(resume.score, "high")
  ).length;

  const mediumCount = resumes.filter((resume) =>
    matchesScoreFilter(resume.score, "medium")
  ).length;

  const lowCount = resumes.filter((resume) =>
    matchesScoreFilter(resume.score, "low")
  ).length;

  /* =========================================================
     DATE
  ========================================================= */

  const formatDate = (date) => {
    if (!date) {
      return {
        date: "N/A",
        time: "",
      };
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return {
        date: "N/A",
        time: "",
      };
    }

    return {
      date: parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),

      time: parsedDate.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
  };

  /* =========================================================
     FILE SIZE
  ========================================================= */

  const formatFileSize = (size) => {
    if (!size) return "N/A";

    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(size / 1024).toFixed(1)} KB`;
    }

    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center bg-gray-100 dark:bg-[#07111f]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-11 h-11 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin" />

            <p className="text-base font-semibold text-gray-700 dark:text-gray-200">
              Loading Resume History...
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =========================================================
     MAIN
  ========================================================= */

  return (
    <MainLayout>
      <div className="min-h-full bg-gray-100 dark:bg-[#07111f] transition-colors duration-300">

        <div className="w-full max-w-[1500px] mx-auto px-3 sm:px-5 lg:px-6 py-5 sm:py-7">

          {/* =================================================
              HEADER
          ================================================= */}

          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-5 mb-6">

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
                Resume History
              </h1>

              <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                View and manage all your analyzed resumes.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">

              <button
                onClick={() => setShowClearModal(true)}
                disabled={resumes.length === 0}
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-red-500
                  hover:bg-red-600
                  disabled:opacity-40
                  disabled:cursor-not-allowed
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                <HiTrash className="text-lg" />
                Clear History
              </button>

              <Link
                to="/upload"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2
                  px-4
                  py-2.5
                  rounded-xl
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  text-sm
                  font-semibold
                  transition
                "
              >
                <HiPlus className="text-lg" />
                Analyze Resume
              </Link>

            </div>
          </div>

          {/* =================================================
              SEARCH + SORT
          ================================================= */}

          <div
            className="
              bg-white
              dark:bg-[#0c192b]
              border
              border-gray-200
              dark:border-slate-800
              rounded-2xl
              p-4
              mb-5
              shadow-sm
            "
          >
            <div className="flex flex-col md:flex-row gap-3">

              {/* SEARCH */}

              <div className="relative flex-1 min-w-0">

                <HiSearch
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-xl
                    text-gray-400
                    dark:text-slate-500
                  "
                />

                <input
                  type="text"
                  placeholder="Search resume..."
                  value={searchTerm}
                  onChange={(e) =>
                    setSearchTerm(e.target.value)
                  }
                  className="
                    w-full
                    h-11
                    pl-11
                    pr-10
                    rounded-xl
                    border
                    border-gray-200
                    dark:border-slate-700
                    bg-gray-50
                    dark:bg-[#111f33]
                    text-gray-900
                    dark:text-white
                    placeholder:text-gray-400
                    dark:placeholder:text-slate-500
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                    focus:border-blue-500
                  "
                />

                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      text-gray-400
                      hover:text-gray-700
                      dark:hover:text-white
                    "
                  >
                    <HiX />
                  </button>
                )}

              </div>

              {/* SORT */}

              <div className="relative w-full md:w-48 shrink-0">

                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(e.target.value)
                  }
                  className="
                    appearance-none
                    w-full
                    h-11
                    pl-4
                    pr-10
                    rounded-xl
                    border
                    border-gray-200
                    dark:border-slate-700
                    bg-gray-50
                    dark:bg-[#111f33]
                    text-gray-800
                    dark:text-gray-200
                    text-sm
                    font-medium
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500/30
                  "
                >
                  <option value="newest">
                    Newest First
                  </option>

                  <option value="oldest">
                    Oldest First
                  </option>

                  <option value="highest">
                    Highest ATS
                  </option>

                  <option value="lowest">
                    Lowest ATS
                  </option>
                </select>

                <HiChevronDown
                  className="
                    absolute
                    right-3
                    top-1/2
                    -translate-y-1/2
                    pointer-events-none
                    text-gray-500
                  "
                />

              </div>

            </div>
          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <div className="flex flex-wrap gap-2 mb-5">

            {/* ALL */}

            <button
              onClick={() => setScoreFilter("all")}
              className={`
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  scoreFilter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-[#0c192b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                }
              `}
            >
              All
              <span className="ml-2 opacity-70">
                {resumes.length}
              </span>
            </button>

            {/* HIGH */}

            <button
              onClick={() => setScoreFilter("high")}
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  scoreFilter === "high"
                    ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                    : "bg-white dark:bg-[#0c192b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                }
              `}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              High Score
              <span className="opacity-60">
                {highCount}
              </span>
            </button>

            {/* MEDIUM */}

            <button
              onClick={() => setScoreFilter("medium")}
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  scoreFilter === "medium"
                    ? "bg-amber-500/15 text-amber-500 border border-amber-500/30"
                    : "bg-white dark:bg-[#0c192b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                }
              `}
            >
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Medium Score
              <span className="opacity-60">
                {mediumCount}
              </span>
            </button>

            {/* LOW */}

            <button
              onClick={() => setScoreFilter("low")}
              className={`
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-xl
                text-sm
                font-semibold
                transition
                ${
                  scoreFilter === "low"
                    ? "bg-red-500/15 text-red-500 border border-red-500/30"
                    : "bg-white dark:bg-[#0c192b] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-slate-800"
                }
              `}
            >
              <span className="w-2 h-2 rounded-full bg-red-500" />
              Low Score
              <span className="opacity-60">
                {lowCount}
              </span>
            </button>

          </div>

          {/* =================================================
              RESULT COUNT
          ================================================= */}

          <div className="flex justify-between items-center mb-3 px-1">

            <p className="text-sm text-gray-500 dark:text-gray-400">
              Showing{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {filteredResumes.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-800 dark:text-gray-200">
                {resumes.length}
              </span>{" "}
              resumes
            </p>

          </div>

          {/* =================================================
              EMPTY
          ================================================= */}

          {filteredResumes.length === 0 ? (

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="
                bg-white
                dark:bg-[#0c192b]
                border
                border-gray-200
                dark:border-slate-800
                rounded-2xl
                py-20
                px-6
                text-center
              "
            >

              <div
                className="
                  mx-auto
                  w-16
                  h-16
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  bg-blue-500/10
                  text-blue-500
                  mb-5
                "
              >
                <HiDocumentText className="text-3xl" />
              </div>

              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                No Resume Found
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {searchTerm
                  ? "Try another search term."
                  : "Upload a resume to start building your history."}
              </p>

              {!searchTerm && (
                <Link
                  to="/upload"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-6
                    px-5
                    py-2.5
                    rounded-xl
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    font-semibold
                  "
                >
                  <HiPlus />
                  Analyze Resume
                </Link>
              )}

            </motion.div>

          ) : (

            /* =================================================
               DESKTOP TABLE
            ================================================= */

            <div
              className="
                w-full
                rounded-2xl
                border
                border-gray-200
                dark:border-slate-800
                bg-white
                dark:bg-[#0c192b]
                shadow-sm
                overflow-hidden
              "
            >

              <div className="overflow-x-auto">

                <table
                  className="
                    w-full
                    min-w-[940px]
                    table-fixed
                    border-collapse
                  "
                >

                  {/* =================================================
                     HEADER
                  ================================================= */}

                  <thead>

                    <tr
                      className="
                        bg-gray-50
                        dark:bg-[#101e31]
                        border-b
                        border-gray-200
                        dark:border-slate-800
                      "
                    >

                      <th
                        className="
                          w-[34%]
                          text-left
                          px-5
                          py-4
                          text-[11px]
                          font-bold
                          tracking-wide
                          uppercase
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        Resume Name
                      </th>

                      <th
                        className="
                          w-[17%]
                          text-left
                          px-3
                          py-4
                          text-[11px]
                          font-bold
                          tracking-wide
                          uppercase
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        ATS Score
                      </th>

                      <th
                        className="
                          w-[17%]
                          text-left
                          px-3
                          py-4
                          text-[11px]
                          font-bold
                          tracking-wide
                          uppercase
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        Job Match
                      </th>

                      <th
                        className="
                          w-[17%]
                          text-left
                          px-3
                          py-4
                          text-[11px]
                          font-bold
                          tracking-wide
                          uppercase
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        Analyzed On
                      </th>

                      <th
                        className="
                          w-[15%]
                          text-right
                          px-4
                          py-4
                          text-[11px]
                          font-bold
                          tracking-wide
                          uppercase
                          text-gray-500
                          dark:text-slate-400
                        "
                      >
                        Actions
                      </th>

                    </tr>

                  </thead>

                  {/* =================================================
                     BODY
                  ================================================= */}

                  <tbody>

                    <AnimatePresence initial={false}>

                      {filteredResumes.map(
                        (resume, index) => {

                          const score =
                            Number(resume.score) || 0;

                          const jobMatch =
                            Number(
                              resume.jobMatch ??
                                resume.jdMatch ??
                                0
                            );

                          const skills = (
                            resume.skills ||
                            resume.foundSkills ||
                            []
                          ).length;

                          const dateInfo =
                            formatDate(
                              resume.createdAt
                            );

                          const jobTitle =
                            resume.jobTitle ||
                            resume.position ||
                            resume.targetRole ||
                            resume.role ||
                            "Resume Analysis";

                          return (
                            <motion.tr
                              key={resume._id}
                              initial={{
                                opacity: 0,
                                y: 8,
                              }}
                              animate={{
                                opacity: 1,
                                y: 0,
                              }}
                              exit={{
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.18,
                                delay:
                                  index * 0.02,
                              }}
                              className="
                                group
                                border-b
                                last:border-b-0
                                border-gray-200
                                dark:border-slate-800
                                hover:bg-gray-50
                                dark:hover:bg-[#101e31]
                                transition-colors
                              "
                            >

                              {/* ======================================
                                  RESUME
                              ====================================== */}

                              <td className="px-5 py-5">

                                <div className="flex items-center gap-3 min-w-0">

                                  <div
                                    className="
                                      w-10
                                      h-10
                                      shrink-0
                                      rounded-xl
                                      flex
                                      items-center
                                      justify-center
                                      bg-pink-500
                                      text-white
                                    "
                                  >
                                    <HiDocumentText className="text-xl" />
                                  </div>

                                  <div className="min-w-0">

                                    <p
                                      className="
                                        font-semibold
                                        text-sm
                                        text-gray-900
                                        dark:text-white
                                        truncate
                                      "
                                      title={
                                        resume.fileName
                                      }
                                    >
                                      {resume.fileName ||
                                        "Untitled Resume"}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
                                      {jobTitle}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1.5">

                                      <span
                                        className="
                                          inline-flex
                                          items-center
                                          px-2
                                          py-0.5
                                          rounded-full
                                          text-[10px]
                                          font-semibold
                                          bg-blue-500/10
                                          text-blue-500
                                        "
                                      >
                                        Original
                                      </span>

                                      <span className="text-[10px] text-gray-400 dark:text-gray-500">
                                        {skills} skills found
                                      </span>

                                    </div>

                                  </div>

                                </div>

                              </td>

                              {/* ======================================
                                  ATS
                              ====================================== */}

                              <td className="px-3 py-5">

                                <div className="flex items-center gap-2">

                                  <ScoreRing
                                    score={score}
                                    size={58}
                                  />

                                  <div className="hidden 2xl:block">

                                    <p
                                      className={`font-semibold text-sm ${getScoreColor(
                                        score
                                      )}`}
                                    >
                                      {score >= 80
                                        ? "Excellent"
                                        : score >= 60
                                          ? "Good"
                                          : "Needs Work"}
                                    </p>

                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                                      ATS score
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* ======================================
                                  JOB MATCH
                              ====================================== */}

                              <td className="px-3 py-5">

                                <div className="flex items-center gap-2">

                                  <ScoreRing
                                    score={jobMatch}
                                    size={58}
                                  />

                                  <div className="hidden 2xl:block">

                                    <p
                                      className={`font-semibold text-sm ${getScoreColor(
                                        jobMatch
                                      )}`}
                                    >
                                      {jobMatch >= 80
                                        ? "Strong"
                                        : jobMatch >= 60
                                          ? "Good"
                                          : "Low"}
                                    </p>

                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5">
                                      Job match
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* ======================================
                                  DATE
                              ====================================== */}

                              <td className="px-3 py-5">

                                <div className="flex items-start gap-2">

                                  <HiClock
                                    className="
                                      mt-0.5
                                      text-gray-400
                                      dark:text-slate-500
                                      shrink-0
                                    "
                                  />

                                  <div className="min-w-0">

                                    <p className="font-semibold text-sm text-gray-800 dark:text-gray-200 whitespace-nowrap">
                                      {dateInfo.date}
                                    </p>

                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 whitespace-nowrap">
                                      {dateInfo.time}
                                    </p>

                                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1 whitespace-nowrap">
                                      {formatFileSize(
                                        resume.fileSize
                                      )}
                                    </p>

                                  </div>

                                </div>

                              </td>

                              {/* ======================================
                                  ACTIONS
                              ====================================== */}

                              <td className="px-2 py-5">

                                <div className="flex items-center justify-end gap-1">

                                  {/* VIEW REPORT */}

                                  <button
                                    onClick={() =>
                                      handleViewAnalysis(
                                        resume
                                      )
                                    }
                                    className="
                                      inline-flex
                                      items-center
                                      justify-center
                                      gap-1.5
                                      px-3
                                      py-2.5
                                      rounded-xl
                                      bg-gray-100
                                      dark:bg-[#16243a]
                                      hover:bg-blue-600
                                      dark:hover:bg-blue-600
                                      text-gray-700
                                      dark:text-gray-200
                                      hover:text-white
                                      font-semibold
                                      text-[11px]
                                      transition-all
                                      whitespace-nowrap
                                    "
                                  >
                                    <HiEye className="text-base" />
                                    View Report
                                  </button>

                                  {/* THREE DOT */}

                                  <div className="relative shrink-0">

                                    <button
                                      type="button"
                                      onClick={() =>
                                        setOpenMenuId(
                                          openMenuId ===
                                            resume._id
                                            ? null
                                            : resume._id
                                        )
                                      }
                                      className="
                                        w-9
                                        h-9
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        text-gray-500
                                        dark:text-gray-400
                                        hover:bg-gray-100
                                        dark:hover:bg-[#16243a]
                                        hover:text-gray-900
                                        dark:hover:text-white
                                        transition
                                      "
                                    >
                                      <HiDotsVertical className="text-lg" />
                                    </button>

                                    <AnimatePresence>

                                      {openMenuId ===
                                        resume._id && (

                                        <motion.div
                                          initial={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: -5,
                                          }}
                                          animate={{
                                            opacity: 1,
                                            scale: 1,
                                            y: 0,
                                          }}
                                          exit={{
                                            opacity: 0,
                                            scale: 0.95,
                                            y: -5,
                                          }}
                                          transition={{
                                            duration: 0.15,
                                          }}
                                          className="
                                            absolute
                                            right-0
                                            top-11
                                            z-[100]
                                            w-44
                                            rounded-xl
                                            border
                                            border-gray-200
                                            dark:border-slate-700
                                            bg-white
                                            dark:bg-[#101e31]
                                            shadow-2xl
                                            p-1.5
                                          "
                                        >

                                          <button
                                            onClick={() =>
                                              handleViewAnalysis(
                                                resume
                                              )
                                            }
                                            className="
                                              w-full
                                              flex
                                              items-center
                                              gap-3
                                              px-3
                                              py-2.5
                                              rounded-lg
                                              text-left
                                              text-sm
                                              text-gray-700
                                              dark:text-gray-200
                                              hover:bg-gray-100
                                              dark:hover:bg-[#16243a]
                                            "
                                          >
                                            <HiEye />
                                            View Report
                                          </button>

                                          <button
                                            onClick={() =>
                                              openDeleteModal(
                                                resume
                                              )
                                            }
                                            className="
                                              w-full
                                              flex
                                              items-center
                                              gap-3
                                              px-3
                                              py-2.5
                                              rounded-lg
                                              text-left
                                              text-sm
                                              text-red-500
                                              hover:bg-red-50
                                              dark:hover:bg-red-500/10
                                            "
                                          >
                                            <HiTrash />
                                            Delete
                                          </button>

                                        </motion.div>

                                      )}

                                    </AnimatePresence>

                                  </div>

                                </div>

                              </td>

                            </motion.tr>
                          );
                        }
                      )}

                    </AnimatePresence>

                  </tbody>

                </table>

              </div>

              {/* =================================================
                  FOOTER
              ================================================= */}

              <div
                className="
                  px-5
                  py-3.5
                  border-t
                  border-gray-200
                  dark:border-slate-800
                  bg-gray-50
                  dark:bg-[#0a1627]
                "
              >
                <div className="flex justify-between items-center">

                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Showing {filteredResumes.length} resume
                    {filteredResumes.length !== 1
                      ? "s"
                      : ""}
                  </p>

                  <p className="hidden sm:block text-xs text-gray-400 dark:text-gray-500">
                    View the complete analysis from View Report
                  </p>

                </div>
              </div>

            </div>
          )}

        </div>

        {/* =====================================================
            DELETE MODAL
        ===================================================== */}

        {showDeleteModal && (

          <div
            className="
              fixed
              inset-0
              z-[200]
              flex
              items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
              px-4
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                dark:bg-[#0c192b]
                border
                border-gray-200
                dark:border-slate-800
                shadow-2xl
                p-6
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-red-500/10
                    text-red-500
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <HiTrash className="text-2xl" />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Delete Resume
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">

                    Are you sure you want to delete{" "}

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {selectedResume?.fileName}
                    </span>
                    ?

                  </p>

                </div>

              </div>

              <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                This action cannot be undone.
              </div>

              <div className="flex justify-end gap-3 mt-7">

                <button
                  onClick={closeDeleteModal}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    dark:border-slate-700
                    bg-gray-50
                    dark:bg-[#111f33]
                    text-gray-700
                    dark:text-gray-200
                    font-semibold
                    hover:bg-gray-100
                    dark:hover:bg-[#16243a]
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleDelete}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    font-semibold
                  "
                >
                  Delete
                </button>

              </div>

            </motion.div>

          </div>

        )}

        {/* =====================================================
            CLEAR HISTORY MODAL
        ===================================================== */}

        {showClearModal && (

          <div
            className="
              fixed
              inset-0
              z-[200]
              flex
              items-center
              justify-center
              bg-black/60
              backdrop-blur-sm
              px-4
            "
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="
                w-full
                max-w-md
                rounded-2xl
                bg-white
                dark:bg-[#0c192b]
                border
                border-gray-200
                dark:border-slate-800
                shadow-2xl
                p-6
              "
            >

              <div className="flex items-start gap-4">

                <div
                  className="
                    w-12
                    h-12
                    rounded-xl
                    bg-red-500/10
                    text-red-500
                    flex
                    items-center
                    justify-center
                    shrink-0
                  "
                >
                  <HiTrash className="text-2xl" />
                </div>

                <div>

                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Clear History
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-red-500">
                      all resume history
                    </span>
                    ?
                  </p>

                </div>

              </div>

              <div className="mt-4 px-4 py-3 rounded-xl bg-red-500/10 text-red-500 text-sm">
                This action cannot be undone.
              </div>

              <div className="flex justify-end gap-3 mt-7">

                <button
                  onClick={() =>
                    setShowClearModal(false)
                  }
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    dark:border-slate-700
                    bg-gray-50
                    dark:bg-[#111f33]
                    text-gray-700
                    dark:text-gray-200
                    font-semibold
                    hover:bg-gray-100
                    dark:hover:bg-[#16243a]
                  "
                >
                  Cancel
                </button>

                <button
                  onClick={handleClearHistory}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    font-semibold
                  "
                >
                  Delete All
                </button>

              </div>

            </motion.div>

          </div>

        )}

      </div>
    </MainLayout>
  );
}

export default History;