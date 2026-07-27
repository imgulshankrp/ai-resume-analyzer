import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { API_URL } from "../config";

function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  // Delete Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedResume, setSelectedResume] = useState(null);

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
        alert("Please login again.");
      } else {
        alert("Failed to load resume history.");
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

      await axios.delete(
        `${API_URL}/history/${selectedResume._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResumes((prev) =>
        prev.filter((resume) => resume._id !== selectedResume._id)
      );

      closeDeleteModal();
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Please login again.");
      } else {
        alert("Failed to delete resume.");
      }
    }
  };

  const filteredResumes = useMemo(() => {
    let data = [...resumes];

    if (searchTerm.trim()) {
      data = data.filter((resume) =>
        resume.fileName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case "oldest":
        data.sort(
          (a, b) =>
            new Date(a.createdAt) - new Date(b.createdAt)
        );
        break;

      case "highest":
        data.sort(
          (a, b) => (b.score || 0) - (a.score || 0)
        );
        break;

      case "lowest":
        data.sort(
          (a, b) => (a.score || 0) - (b.score || 0)
        );
        break;

      default:
        data.sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        );
    }

    return data;
  }, [resumes, searchTerm, sortBy]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Resume History...
      </div>
    );
  }
    return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row justify-between items-center gap-4 mb-8">
        <div>
          <h1 className="text-4xl font-bold">Resume History</h1>
          <p className="text-gray-500 mt-2">
            View and manage all your analyzed resumes
          </p>
        </div>

        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
        >
          + Analyze New Resume
        </Link>
      </div>

      {/* Search & Sort */}
      <div className="bg-white shadow rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="🔍 Search by file name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded-lg px-4 py-3 w-full md:w-96 focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded-lg px-4 py-3"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highest">Highest ATS</option>
          <option value="lowest">Lowest ATS</option>
        </select>
      </div>

      {/* Empty State */}
      {filteredResumes.length === 0 ? (
        <div className="bg-white shadow rounded-2xl py-20 text-center">
          <h2 className="text-2xl font-bold">No Resume Found</h2>

          <p className="text-gray-500 mt-2">
            Try another search or upload a new resume.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredResumes.map((resume) => (
            <motion.div
              key={resume._id}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-2xl shadow-lg hover:shadow-2xl p-6"
            >
              <h2 className="text-xl font-bold truncate">
                {resume.fileName}
              </h2>

              <div className="flex gap-2 mt-3 flex-wrap">
                <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                  AI Analyzed
                </span>

                <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">
                  Gemini AI
                </span>
              </div>

              <div className="mt-6 space-y-3">

                <div className="flex justify-between">
                  <span className="font-medium">ATS Score</span>

                  <span
                    className={`font-bold ${
                      resume.score >= 80
                        ? "text-green-600"
                        : resume.score >= 60
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {resume.score || 0}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Job Match</span>

                  <span>{resume.jobMatch ?? resume.jdMatch ?? 0}%</span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">Skills</span>

                  <span>
                    {(resume.skills || resume.foundSkills || []).length}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="font-medium">File Size</span>

                  <span>
                    {resume.fileSize
                      ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                      : "N/A"}
                  </span>
                </div>

                <p className="text-sm text-gray-500 pt-2">
                  {new Date(resume.createdAt).toLocaleString()}
                </p>

              </div>

              <div className="grid grid-cols-2 gap-3 mt-6">

                <Link
                  to="/dashboard"
                  state={{ analysis: resume }}
                  className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center transition"
                >
                  View
                </Link>

                <button
                  onClick={() => openDeleteModal(resume)}
                  className="bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
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
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white rounded-2xl p-8 w-96 shadow-2xl">

            <h2 className="text-2xl font-bold mb-3">
              Delete Resume
            </h2>

            <p className="text-gray-600">
              Are you sure you want to delete
              <span className="font-semibold">
                {" "}
                {selectedResume?.fileName}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3 mt-8">

              <button
                onClick={closeDeleteModal}
                className="px-5 py-2 rounded-lg border hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleDelete}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white"
              >
                Delete
              </button>

            </div>

          </div>

        </div>
      )}
    </div>
  );
}

export default History;