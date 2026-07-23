import { useState } from "react";
import { FaCloudUploadAlt, FaFilePdf, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

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
      alert("Please upload PDF file only.");
      return;
    }

    setFile(selectedFile);
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDescription", jobDescription);

      const token = localStorage.getItem("token");

      const response = await api.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setAnalysis(response.data);

      navigate("/dashboard", {
        state: {
          ...response.data,
          file,
        },
      });
    } catch (error) {
      console.error(error);
      alert("Upload Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8">
      {!file ? (
        <label className="border-2 border-dashed border-blue-400 rounded-xl p-12 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition">
          <FaCloudUploadAlt className="text-6xl text-blue-600 mb-4" />

          <h2 className="text-2xl font-bold">Upload Resume</h2>

          <p className="text-gray-500 mt-2">Only PDF files are supported</p>

          <input
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      ) : (
        <>
          <div className="flex justify-between items-center bg-gray-100 rounded-xl p-5">
            <div className="flex items-center gap-4">
              <FaFilePdf className="text-red-500 text-4xl" />

              <div>
                <h3 className="font-semibold">{file.name}</h3>

                <p className="text-gray-500 text-sm">
                  {(file.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>

            <button
              onClick={removeFile}
              className="text-red-500 hover:text-red-700"
            >
              <FaTrash size={22} />
            </button>
          </div>

          <div className="mt-6">
            <label className="block text-lg font-semibold mb-2">
              Job Description (Optional)
            </label>

            <textarea
              rows="8"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Paste the Job Description here..."
              className="w-full border rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </>
      )}
    </div>
  );
}

export default UploadBox;
