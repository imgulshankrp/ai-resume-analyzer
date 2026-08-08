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

  // ==============================
  // Select Resume
  // ==============================

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

  // ==============================
  // Remove Resume
  // ==============================

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    setJobDescription("");

    toast.info("Resume removed.");
  };

  // ==============================
  // Upload + Analyze
  // ==============================

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

  // ==============================
  // Loading State
  // ==============================

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          mx-auto
          flex
          min-h-[280px]
          w-full
          max-w-3xl
          items-center
          justify-center
          rounded-2xl
          border
          border-slate-200
          bg-white
          p-6
          shadow-xl
          dark:border-slate-700
          dark:bg-slate-900
        "
      >
        <div className="flex flex-col items-center gap-4">
          <LoadingSpinner />

          <p className="text-lg font-semibold text-slate-700 dark:text-slate-200">
            Analyzing your resume...
          </p>

          <p className="text-sm text-slate-500 dark:text-slate-400">
            Please wait a moment.
          </p>
        </div>
      </motion.div>
    );
  }

  // ==============================
  // Main Upload Box
  // ==============================

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="
        mx-auto
        w-full
        max-w-3xl
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-xl
        transition-colors
        duration-300
        sm:p-5
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {!file ? (
        /* ==================================
           EMPTY UPLOAD STATE
        ================================== */

        <label
          className="
            flex
            min-h-[300px]
            w-full
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-xl
            border-2
            border-dashed
            border-blue-300
            bg-blue-50/70
            px-5
            py-8
            text-center
            transition-all
            duration-300
            hover:border-blue-500
            hover:bg-blue-100
            dark:border-blue-700
            dark:bg-slate-800
            dark:hover:border-blue-500
            dark:hover:bg-slate-800
          "
        >
          <FaCloudUploadAlt
            className="
              mb-4
              text-5xl
              text-blue-600
              dark:text-blue-400
              sm:text-6xl
            "
          />

          <h2
            className="
              text-xl
              font-bold
              text-slate-900
              sm:text-2xl
              dark:text-white
            "
          >
            Upload Resume
          </h2>

          <p
            className="
              mt-2
              text-sm
              font-medium
              text-slate-500
              dark:text-slate-400
            "
          >
            Click here to select your PDF resume
          </p>

          <span
            className="
              mt-4
              rounded-full
              bg-blue-100
              px-4
              py-1.5
              text-xs
              font-semibold
              text-blue-700
              dark:bg-blue-900/40
              dark:text-blue-300
            "
          >
            PDF files only
          </span>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        /* ==================================
           SELECTED RESUME STATE
        ================================== */

        <div className="space-y-4">
          {/* Resume File */}

          <div
            className="
              flex
              min-h-[78px]
              items-center
              justify-between
              gap-3
              rounded-xl
              border
              border-blue-200
              bg-blue-50
              px-4
              py-3
              dark:border-blue-800
              dark:bg-slate-800
            "
          >
            <div className="flex min-w-0 items-center gap-3">
              <div
                className="
                  flex
                  h-12
                  w-12
                  flex-shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-red-100
                  dark:bg-red-900/30
                "
              >
                <FaFilePdf className="text-2xl text-red-500" />
              </div>

              <div className="min-w-0">
                <h3
                  className="
                    truncate
                    text-sm
                    font-bold
                    text-slate-900
                    sm:text-base
                    dark:text-white
                  "
                  title={file.name}
                >
                  {file.name}
                </h3>

                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={removeFile}
              aria-label="Remove resume"
              className="
                flex
                h-10
                w-10
                flex-shrink-0
                items-center
                justify-center
                rounded-lg
                text-red-500
                transition
                hover:bg-red-100
                hover:text-red-700
                dark:hover:bg-red-900/30
                dark:hover:text-red-400
              "
            >
              <FaTrash size={18} />
            </button>
          </div>

          {/* Job Description */}

          <div>
            <label
              htmlFor="jobDescription"
              className="
                mb-2
                block
                text-base
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Job Description
              <span className="ml-1 text-xs font-medium text-slate-400">
                (Optional)
              </span>
            </label>

            <textarea
              id="jobDescription"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the Job Description here..."
              rows={4}
              className="
                block
                h-[120px]
                w-full
                resize-none
                rounded-xl
                border
                border-slate-300
                bg-slate-50
                p-3
                text-sm
                text-slate-900
                outline-none
                transition-all
                duration-200
                placeholder:text-slate-400
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-500/20
                dark:border-slate-600
                dark:bg-slate-800
                dark:text-white
                dark:placeholder:text-slate-500
              "
            />
          </div>

          {/* Analyze Button */}

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading}
            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              text-sm
              font-bold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition-all
              duration-300
              hover:from-cyan-600
              hover:to-blue-700
              hover:shadow-xl
              disabled:cursor-not-allowed
              disabled:opacity-60
              sm:text-base
            "
          >
            {loading ? "🔍 Analyzing Resume..." : "Analyze Resume"}
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default UploadBox;