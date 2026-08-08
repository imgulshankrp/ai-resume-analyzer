import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import {
  HiDocumentText,
  HiEye,
  HiCalendar,
  HiArrowTrendingUp,
} from "react-icons/hi2";

import LoadingSpinner from "../common/LoadingSpinner";
import EmptyState from "../common/EmptyState";

import { API_URL } from "../../config";

function RecentResume() {
  const [resumes, setResumes] = useState([]);
  const [totalFiles, setTotalFiles] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentResumes();
  }, []);

  const fetchRecentResumes = async () => {
    try {
      const token = localStorage.getItem("token");

      const { data } = await axios.get(`${API_URL}/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        const resumeList = Array.isArray(data.resumes)
          ? data.resumes
          : [];

        setResumes(resumeList.slice(0, 2));
        setTotalFiles(resumeList.length);
      }
    } catch (error) {
      console.error("Recent Resume Error:", error);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-full min-h-[500px] items-center justify-center rounded-3xl border border-slate-700/70 bg-slate-900/80 p-6 shadow-xl backdrop-blur-sm"
      >
        <LoadingSpinner />
      </motion.div>
    );
  }

  /* =========================
     Empty State
  ========================= */

  if (!resumes.length) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex h-full min-h-[500px] flex-col rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-xl backdrop-blur-sm sm:p-6"
      >
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Resumes
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest uploaded resumes
          </p>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <EmptyState
            title="No resumes yet"
            description="Upload and analyze your first resume to see it here."
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-xl backdrop-blur-sm sm:p-6"
    >
      {/* =========================
          Header
      ========================= */}

      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Recent Resumes
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your latest uploaded resumes
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span className="rounded-full bg-blue-500/15 px-3 py-2 text-xs font-semibold text-blue-300 sm:px-4 sm:text-sm">
            {totalFiles} Files
          </span>

          <Link
            to="/history"
            className="rounded-full bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-300 transition hover:bg-slate-700 hover:text-white sm:px-4 sm:text-sm"
          >
            View All →
          </Link>
        </div>
      </div>

      {/* =========================
          Resume List
      ========================= */}

      <div className="mt-6 flex flex-1 flex-col gap-4">
        {resumes.map((resume, index) => {
          const score = resume.score ?? 0;

          return (
            <motion.div
              key={resume._id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -3,
              }}
              className="group flex flex-1 flex-col justify-between rounded-2xl border border-slate-700 bg-slate-800/70 p-4 transition-all duration-300 hover:border-cyan-400/70 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-3">
                  {/* File Icon */}
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15">
                    <HiDocumentText className="text-2xl text-cyan-400" />
                  </div>

                  {/* File Information */}
                  <div className="min-w-0">
                    <h3
                      className="break-words text-base font-bold text-white"
                      title={resume.fileName}
                    >
                      {resume.fileName}
                    </h3>

                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                      <HiCalendar className="text-sm" />

                      <span>
                        {resume.createdAt
                          ? new Date(
                              resume.createdAt
                            ).toLocaleDateString()
                          : "Date unavailable"}
                      </span>
                    </div>
                  </div>
                </div>

                {/* ATS Score */}
                <div className="shrink-0 rounded-xl bg-emerald-500/10 px-3 py-2">
                  <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                    ATS Score
                  </p>

                  <p className="mt-0.5 text-lg font-bold text-emerald-400">
                    {score}%
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="mt-5 flex items-center justify-between gap-3">
                {/* Optimized Badge */}
                <div className="flex items-center gap-2 rounded-full bg-blue-500/15 px-3 py-2">
                  <HiArrowTrendingUp className="text-sm text-blue-400" />

                  <span className="text-xs font-semibold text-blue-300">
                    {score >= 70
                      ? "Optimized"
                      : "Needs Improvement"}
                  </span>
                </div>

                {/* View Analysis */}
                <Link
                  to={`/analysis/${resume._id}`}
                  className="group/btn flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/20 sm:px-5 sm:py-3 sm:text-sm"
                >
                  <HiEye className="text-base sm:text-lg" />

                  <span>View Analysis</span>

                  <span className="transition-transform duration-300 group-hover/btn:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default RecentResume;