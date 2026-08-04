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

import Card from "../common/Card";
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

      const { data } = await axios.get(
        `${API_URL}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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

  if (loading) {
    return (
      <LoadingSpinner text="Loading recent resumes..." />
    );
  }

  if (!resumes.length) {
    return (
      <EmptyState
        title="No Resume Found"
        description="Upload your first resume to start analyzing."
      />
    );
  }
  return (
  <Card className="w-full rounded-3xl overflow-hidden">

    {/* Header */}

    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

      <div>

        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Recent Resumes
        </h2>

        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Your latest uploaded resumes
        </p>

      </div>

      <div className="flex flex-wrap items-center gap-3">

        <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {totalFiles} Files
        </div>

        <Link
          to="/history"
          className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
        >
          View All →
        </Link>

      </div>

    </div>

    {/* Resume Cards */}

    <div className="space-y-5">

      {resumes.map((resume, index) => (

        <motion.div
          key={resume._id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          whileHover={{ y: -3 }}
          className="rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-5 shadow-sm hover:shadow-lg transition-all"
        >

          {/* Top */}

          <div className="flex items-start gap-4">

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">

              <HiDocumentText className="text-3xl text-white" />

            </div>

            <div className="flex-1 min-w-0">

              <h3
                className="text-lg font-semibold text-slate-900 dark:text-white break-words"
                title={resume.fileName}
              >
                {resume.fileName}
              </h3>

              <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">

                <HiCalendar />

                {new Date(resume.createdAt).toLocaleDateString()}

              </div>

            </div>

          </div>

          {/* Bottom */}

          <div className="mt-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-4">

              <div className="rounded-xl bg-green-100 dark:bg-green-900/30 px-4 py-3 min-w-[120px]">

                <p className="text-xs text-slate-500">
                  ATS Score
                </p>

                <p className="text-xl font-bold text-green-700 dark:text-green-400 mt-1">
                  {resume.score ?? 0}%
                </p>

              </div>

              <div className="rounded-xl bg-blue-100 dark:bg-blue-900/30 px-4 py-3 min-w-[140px]">

                <div className="flex items-center gap-2 font-semibold text-blue-700 dark:text-blue-400">

                  <HiArrowTrendingUp />

                  Optimized

                </div>

              </div>

            </div>

            <Link
              to={`/analysis/${resume._id}`}
              className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02] hover:shadow-xl w-full lg:w-auto"
            >

              <HiEye />

              View Analysis

            </Link>

          </div>

        </motion.div>

      ))}

    </div>

  </Card>
);

}

export default RecentResume;