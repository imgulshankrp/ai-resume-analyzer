import { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaFilePdf } from "react-icons/fa";
import api from "../services/api";

function CompareResume() {
  const [resume1, setResume1] = useState(null);
  const [resume2, setResume2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleFile = (e, index) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      return;
    }

    if (index === 1) {
      setResume1(file);
    } else {
      setResume2(file);
    }
  };

  const compareResumes = async () => {
    if (!resume1 || !resume2) {
      alert("Please upload both resumes.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume1", resume1);
      formData.append("resume2", resume2);

      const { data } = await api.post("/compare", formData);

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  const UploadCard = ({ file, index }) => (
    <label className="flex flex-col items-center justify-center border-2 border-dashed border-blue-400 dark:border-blue-500 rounded-2xl bg-white dark:bg-slate-900 hover:bg-blue-50 dark:hover:bg-slate-800 transition-all duration-300 cursor-pointer h-72 shadow-lg">

      {!file ? (
        <>
          <FaCloudUploadAlt className="text-6xl text-blue-500 mb-4" />

          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Upload PDF Resume
          </h3>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Click to select resume
          </p>
        </>
      ) : (
        <>
          <FaFilePdf className="text-6xl text-red-500 mb-4" />

          <h3 className="text-lg font-bold text-slate-900 dark:text-white text-center px-4 break-all">
            {file.name}
          </h3>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            {(file.size / 1024).toFixed(2)} KB
          </p>
        </>
      )}

      <input
        type="file"
        accept=".pdf"
        hidden
        onChange={(e) => handleFile(e, index)}
      />
    </label>
  );

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-colors duration-300 px-6 py-12">

      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-5xl font-bold text-center text-slate-900 dark:text-white mb-12"
      >
        Resume Comparison
      </motion.h1>

      <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">

        <UploadCard
          file={resume1}
          index={1}
        />

        <UploadCard
          file={resume2}
          index={2}
        />

      </div>

      <div className="flex justify-center mt-10">

        <button
          onClick={compareResumes}
          disabled={loading}
          className="px-10 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold shadow-xl transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Comparing..." : "Compare Resumes"}
        </button>

      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="max-w-5xl mx-auto mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
            Comparison Result
          </h2>

          <pre className="whitespace-pre-wrap text-slate-700 dark:text-slate-300">
            {JSON.stringify(result, null, 2)}
          </pre>
        </motion.div>
      )}

    </div>
  );
}

export default CompareResume;