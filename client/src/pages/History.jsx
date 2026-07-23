import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function History() {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get("https://ai-resume-analyzer-57fk.onrender.com/api/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes(res.data.resumes);
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

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this resume?",
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("token");

      await axios.delete(`https://ai-resume-analyzer-57fk.onrender.com/api/history/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResumes((prev) => prev.filter((resume) => resume._id !== id));

      alert("Resume deleted successfully.");
    } catch (error) {
      console.error(error);

      if (error.response?.status === 401) {
        alert("Please login again.");
      } else {
        alert("Failed to delete resume.");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-2xl font-bold">
        Loading Resume History...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Resume History</h1>

        <Link
          to="/upload"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg transition"
        >
          + Analyze New Resume
        </Link>
      </div>

      {resumes.length === 0 ? (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">No Resume History Found</h2>

          <p className="text-gray-500 mt-2">
            Upload your first resume to get started.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {resumes.map((resume) => (
            <motion.div
              key={resume._id}
              whileHover={{ scale: 1.03 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-xl font-bold truncate">{resume.fileName}</h2>

              <div className="flex gap-2 mt-2">
                <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  AI Analyzed
                </span>

                <span className="bg-indigo-100 text-indigo-700 text-xs px-2 py-1 rounded-full">
                  Gemini
                </span>
              </div>

              <div className="mt-5 space-y-3">
                <p>
                  <strong>ATS Score:</strong>

                  <span
                    className={`ml-2 font-bold ${
                      resume.score >= 80
                        ? "text-green-600"
                        : resume.score >= 60
                          ? "text-yellow-600"
                          : "text-red-600"
                    }`}
                  >
                    {resume.score}%
                  </span>
                </p>

                <p>
                  <strong>Job Match:</strong>{" "}
                  {resume.jobMatch ?? resume.jdMatch}%
                </p>

                <p>
                  <strong>Skills:</strong>{" "}
                  {(resume.skills || resume.foundSkills || []).length}
                </p>

                <p>
                  <strong>File Size:</strong>{" "}
                  {resume.fileSize
                    ? `${(resume.fileSize / 1024).toFixed(1)} KB`
                    : "N/A"}
                </p>

                <p className="text-sm text-gray-500">
                  {new Date(resume.createdAt).toLocaleString()}
                </p>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleDelete(resume._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                >
                  Delete
                </button>

                <Link
                  to="/dashboard"
                  state={{ analysis: resume }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-center transition"
                >
                  View
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

export default History;
