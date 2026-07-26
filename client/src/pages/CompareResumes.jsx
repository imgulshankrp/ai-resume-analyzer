import { useState } from "react";
import axios from "axios";

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
      alert("Upload both resumes.");
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
    } catch (err) {
      console.error(err);
      alert("Comparison failed.");
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="max-w-7xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Resume Comparison
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

        <ResumeUploadCard
          title="Resume A"
          onSelect={setResume1}
        />

        <ResumeUploadCard
          title="Resume B"
          onSelect={setResume2}
        />

      </div>

      <button
        onClick={handleCompare}
        className="mt-8 bg-blue-600 text-white px-6 py-3 rounded-lg"
      >
        {loading ? "Comparing..." : "Compare Resumes"}
      </button>

      {result && (
        <>
          <ResumeComparisonTable data={result} />
          <ComparisonResult data={result} />
        </>
      )}
    </div>
  );
}

export default CompareResumes;