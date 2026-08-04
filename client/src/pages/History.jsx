import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { API_URL } from "../config";

function History() {
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

  // Clear History Modal
  const [showClearModal, setShowClearModal] = useState(false);

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

  const openDeleteModal = (resume) => {
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

 const handleViewAnalysis = (resume) => {
  navigate(`/analysis/${resume._id}`, {
    state: {
      resume,
    },
  });
};
  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    if (searchTerm.trim()) {
      data = data.filter((resume) =>
        resume.fileName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      case "highest":
        data.sort((a, b) => (b.score || 0) - (a.score || 0));
        break;

      case "lowest":
        data.sort((a, b) => (a.score || 0) - (b.score || 0));
        break;

      default:
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return data;
  }, [resumes, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="text-2xl font-bold text-gray-700 dark:text-gray-200 animate-pulse">
          Loading Resume History...
        </div>
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-8">

          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Resume History
            </h1>

            <p className="mt-2 text-gray-600 dark:text-gray-400">
              View and manage all your analyzed resumes.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">

            <button
              onClick={() => setShowClearModal(true)}
              className="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105"
            >
              🗑 Clear History
            </button>

            <Link
              to="/upload"
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105"
            >
              + Analyze Resume
            </Link>

          </div>
        </div>

        {/* Search & Sort */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-lg p-5 mb-8">

          <div className="flex flex-col md:flex-row gap-4 justify-between">

            <input
              type="text"
              placeholder="🔍 Search resume..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="
                w-full
                md:w-96
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-white
                placeholder:text-gray-500
                focus:ring-2
                focus:ring-blue-500
                outline-none
                transition
              "
            />

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="
                px-4
                py-3
                rounded-xl
                border
                border-gray-300
                dark:border-gray-700
                bg-white
                dark:bg-gray-800
                text-gray-900
                dark:text-white
                outline-none
                focus:ring-2
                focus:ring-blue-500
              "
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest ATS</option>
              <option value="lowest">Lowest ATS</option>
            </select>

          </div>
        </div>

        {/* Empty State */}

        {filteredResumes.length === 0 ? (

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-lg py-20 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              No Resume Found
            </h2>

            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Upload a resume or try another search.
            </p>

          </div>

        ) : (

          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredResumes.map((resume) => (

              <motion.div
                key={resume._id}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.25,
                }}
                className="
                  bg-white
                  dark:bg-gray-900
                  border
                  border-gray-200
                  dark:border-gray-800
                  rounded-3xl
                  shadow-lg
                  hover:shadow-2xl
                  p-6
                  transition-all
                "
              >
                <h2 className="text-xl font-bold truncate text-gray-900 dark:text-white">
                  {resume.fileName}
                </h2>

                <div className="flex flex-wrap gap-2 mt-4">

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                    AI Analyzed
                  </span>

                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                    Gemini AI
                  </span>

                </div>
                                <div className="mt-6 space-y-4">

                  {/* ATS Score */}

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-400 font-medium">
                      ATS Score
                    </span>

                    <span
                      className={`font-bold text-lg ${
                        (resume.score || 0) >= 80
                          ? "text-green-500"
                          : (resume.score || 0) >= 60
                          ? "text-yellow-500"
                          : "text-red-500"
                      }`}
                    >
                      {resume.score || 0}%
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">

                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        (resume.score || 0) >= 80
                          ? "bg-green-500"
                          : (resume.score || 0) >= 60
                          ? "bg-yellow-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: `${resume.score || 0}%`,
                      }}
                    />

                  </div>

                  {/* Job Match */}

                  <div className="flex justify-between">

                    <span className="text-gray-600 dark:text-gray-400">
                      Job Match
                    </span>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {resume.jobMatch ?? resume.jdMatch ?? 0}%
                    </span>

                  </div>

                  {/* Skills */}

                  <div className="flex justify-between">

                    <span className="text-gray-600 dark:text-gray-400">
                      Skills Found
                    </span>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {(resume.skills || resume.foundSkills || []).length}
                    </span>

                  </div>

                  {/* File Size */}

                  <div className="flex justify-between">

                    <span className="text-gray-600 dark:text-gray-400">
                      File Size
                    </span>

                    <span className="font-semibold text-gray-900 dark:text-white">
                      {resume.fileSize
                        ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                        : "N/A"}
                    </span>

                  </div>

                  {/* Date */}

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(resume.createdAt).toLocaleString()}
                    </p>

                  </div>

                </div>

                {/* Buttons */}

                <div className="grid grid-cols-2 gap-3 mt-6">

                  <button
                    onClick={() => handleViewAnalysis(resume)}
                    className="
                      bg-blue-600
                      hover:bg-blue-700
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                  >
                    View Analysis
                  </button>

                  <button
                    onClick={() => openDeleteModal(resume)}
                    className="
                      bg-red-600
                      hover:bg-red-700
                      text-white
                      py-3
                      rounded-xl
                      font-semibold
                      transition-all
                      duration-300
                      hover:scale-105
                    "
                  >
                    Delete
                  </button>

                </div>

              </motion.div>

            ))}

          </div>

        )}
              {/* Delete Modal */}

      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              dark:bg-gray-900
              border
              border-gray-200
              dark:border-gray-800
              shadow-2xl
              p-7
            "
          >

            <h2 className="text-2xl font-bold text-red-600">
              Delete Resume
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
              Are you sure you want to delete
              <span className="font-semibold text-gray-900 dark:text-white">
                {" "}
                {selectedResume?.fileName}
              </span>
              ?
            </p>

            <p className="mt-2 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={closeDeleteModal}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-700
                  bg-white
                  dark:bg-gray-800
                  text-gray-700
                  dark:text-gray-200
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                  transition
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
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Delete
              </button>

            </div>

          </motion.div>

        </div>
      )}

      {/* Clear History Modal */}

      {showClearModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25 }}
            className="
              w-full
              max-w-md
              rounded-3xl
              bg-white
              dark:bg-gray-900
              border
              border-gray-200
              dark:border-gray-800
              shadow-2xl
              p-7
            "
          >

            <h2 className="text-2xl font-bold text-red-600">
              Clear History
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400 leading-7">
              Are you sure you want to delete
              <span className="font-semibold text-red-500">
                {" "}all resume history
              </span>
              ?
            </p>

            <p className="mt-3 text-sm text-red-500">
              This action cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={() => setShowClearModal(false)}
                className="
                  px-5
                  py-2.5
                  rounded-xl
                  border
                  border-gray-300
                  dark:border-gray-700
                  bg-white
                  dark:bg-gray-800
                  text-gray-700
                  dark:text-gray-200
                  hover:bg-gray-100
                  dark:hover:bg-gray-700
                  transition
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
                  transition-all
                  duration-300
                  hover:scale-105
                "
              >
                Delete All
              </button>

            </div>

          </motion.div>

        </div>
      )}

      </div>
    </div>
  );
}

export default History;
        