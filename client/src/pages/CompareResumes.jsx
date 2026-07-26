import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import ResumeUploadCard from "../components/comparison/ResumeUploadCard";
import ResumeComparisonTable from "../components/comparison/ResumeComparisonTable";
import ComparisonResult from "../components/comparison/ComparisonResult";

import { API_URL } from "../config";

function CompareResumes() {
  const [resume1, setResume1] = useState(null);
  const [resume2, setResume2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const token = localStorage.getItem("token");

  const handleCompare = async () => {
    if (!resume1 || !resume2) {
      toast.warning("Please upload both resumes.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume1", resume1);
      formData.append("resume2", resume2);

      const { data } = await axios.post(
        `${API_URL}/api/compare`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(data);
      toast.success("Comparison completed successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-center">
        Resume Comparison
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ResumeUploadCard
          title="Resume A"
          onSelect={setResume1}
        />

        <ResumeUploadCard
          title="Resume B"
          onSelect={setResume2}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleCompare}
          disabled={loading}
          className="mt-8 px-8 py-3 rounded-xl text-white font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Comparing..." : "Compare Resumes"}
        </button>
      </div>

      {result && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mt-10 space-y-8"
        >
          <ResumeComparisonTable data={result} />
          <ComparisonResult data={result} />
        </motion.div>
      )}
    </motion.div>
  );
}

export default CompareResumes;