import { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaFilePdf, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../services/api";
import LoadingSpinner from "../common/LoadingSpinner";

function UploadBox() {
  const [file, setFile] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [jobDescription, setJobDescription] = useState("");

  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) return;

    if (selectedFile.type !== "application/pdf") {
      toast.error("Please upload a PDF file only.");
      return;
    }

    setFile(selectedFile);
    toast.success("Resume selected successfully.");
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    toast.info("Resume removed.");
  };

  const handleUpload = async () => {
    if (!file) {
      toast.warning("Please upload resume.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const token = localStorage.getItem("token");

      const { data } = await api.post("/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Resume analyzed successfully.");

      navigate(`/analysis/${data.resumeId}`);
    } catch (err) {
      console.error(err);

      toast.error(
        err.response?.data?.message || "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 transition-colors duration-300"
      >
        <LoadingSpinner text="Analyzing your resume..." />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl w-full mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-4 sm:p-6 lg:p-8 transition-colors duration-300"
    >
      {!file ? (
        <label className="border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-xl p-8 sm:p-12 flex flex-col items-center cursor-pointer hover:bg-blue-50 dark:hover:bg-slate-800 transition duration-300">

          <FaCloudUploadAlt className="text-6xl text-blue-600 dark:text-blue-400 mb-4" />

          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            Upload Resume
          </h2>

          <p className="text-slate-500 dark:text-slate-400 text-center mt-2">
            Only PDF files are supported
          </p>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 bg-slate-100 dark:bg-slate-800 rounded-xl p-5">

            <div className="flex items-center gap-4">

              <FaFilePdf className="text-red-500 text-4xl flex-shrink-0" />

              <div>
                <h3 className="font-semibold break-all text-slate-900 dark:text-white">
                  {file.name}
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>

            </div>

            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-400 self-end sm:self-auto"
            >
              <FaTrash size={22} />
            </button>

          </div>

          <div className="mt-6">

            <label className="block text-lg font-semibold mb-2 text-slate-900 dark:text-white">
              Job Description (Optional)
            </label>

            <textarea
              rows={8}
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the Job Description here..."
              className="w-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 rounded-lg p-4 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors duration-300"
            />

          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "🔍 Analyzing Resume..." : "Analyze Resume"}
          </button>
        </>
      )}
    </motion.div>
  );
}

export default UploadBox;