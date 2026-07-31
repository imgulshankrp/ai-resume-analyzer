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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentResumes = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(`${API_URL}/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (data.success) {
          const resumes = Array.isArray(data.resumes) ? data.resumes : [];
          setResumes(resumes.slice(0, 5));
        }
      } catch (error) {
        console.error("Recent Resume Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentResumes();
  }, []);

  if (loading) {
    return <LoadingSpinner text="Loading recent resumes..." />;
  }

  if (resumes.length === 0) {
    return (
      <EmptyState
        title="No Resume Found"
        description="Upload your first resume to start analyzing."
      />
    );
  }

  return (
    <Card className="rounded-3xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Resumes
          </h2>

          <p className="mt-1 text-slate-500 dark:text-slate-400">
            Your latest uploaded resumes
          </p>
        </div>

        <div className="rounded-xl bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
          {resumes.length} Files
        </div>
      </div>

      <div className="space-y-5">
        {resumes.map((resume, index) => (
          <motion.div
            key={resume._id}
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: index * 0.08,
            }}
            whileHover={{
              y: -4,
            }}
            className="group flex flex-col gap-5 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 lg:flex-row lg:items-center lg:justify-between"
          >
            {/* Left */}

            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                <HiDocumentText className="text-3xl text-white" />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                  {resume.fileName}
                </h3>

                <div className="mt-2 flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                  <HiCalendar />

                  {new Date(resume.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>

            {/* Right */}

            <div className="flex flex-wrap items-center gap-6">
              <div className="text-center">
                <p className="text-xs text-slate-500">ATS Score</p>

                <div className="mt-2 rounded-xl bg-green-100 px-4 py-2 text-lg font-bold text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  {resume.score ?? 0}%
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-slate-500">Status</p>

                <div className="mt-2 flex items-center gap-2 rounded-xl bg-blue-100 px-4 py-2 font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                  <HiArrowTrendingUp />
                  Optimized
                </div>
              </div>

              <Link
                to="/analysis"
                state={{
                  analysis: resume,
                  file: null,
                }}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 px-5 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
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
