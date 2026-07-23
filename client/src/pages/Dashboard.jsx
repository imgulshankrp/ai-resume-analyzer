import { useLocation, Navigate, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

import Header from "../components/dashboard/Header";
import ScoreCard from "../components/dashboard/ScoreCard";
import SummaryCard from "../components/dashboard/SummaryCard";
import SkillsCard from "../components/dashboard/SkillsCard";
import MissingSkillsCard from "../components/dashboard/MissingSkillsCard";
import JobMatchCard from "../components/dashboard/JobMatchCard";
import SuggestionsCard from "../components/dashboard/SuggestionsCard";
import ResumePreview from "../components/dashboard/ResumePreview";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import AIAnalysisCard from "../components/dashboard/AIAnalysisCard";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [analysis, setAnalysis] = useState(
    location.state?.analysis || location.state || null,
  );

  const [loading, setLoading] = useState(true);

  // AI State
  const [aiResult, setAiResult] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchLatestAnalysis = async () => {
      if (analysis) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/dashboard/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (data.success) {
          setAnalysis(data.analysis);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestAnalysis();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl font-semibold">
        Loading Dashboard...
      </div>
    );
  }

  if (!analysis) {
    return <Navigate to="/upload" replace />;
  }

  const file = analysis.file || analysis;

  const score = analysis.score || 0;
  const jobMatch = analysis.jobMatch ?? analysis.jdMatch ?? 0;
  const skills = analysis.skills || analysis.foundSkills || [];
  const missingSkills = analysis.missingSkills || [];
  const suggestions = analysis.suggestions || [];
  const summary = analysis.summary || "No summary available.";

  const handleAIAnalysis = async () => {
    try {
      setLoadingAI(true);

      console.log("Analysis Object:", analysis);

      const resumeText =
        analysis?.extractedText || analysis?.text || analysis?.resumeText || "";

      if (!resumeText) {
        alert("Resume text not found. Please upload the resume again.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/ai/analyze",
        {
          resumeText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      console.log(response.data);

      setAiResult(response.data.result);
    } catch (error) {
      console.error(error);

      const message =
        error.response?.data?.message ||
        error.message ||
        "Unable to analyze the resume. Please try again.";

      alert(message);
    } finally {
      setLoadingAI(false);
    }
  };

  const downloadReport = () => {
    const doc = new jsPDF();

    let ai = null;

    try {
      ai = aiResult ? JSON.parse(aiResult) : null;
    } catch (e) {
      ai = null;
    }

    let y = 20;

    doc.setFontSize(20);
    doc.text("AI Resume Analysis Report", 20, y);

    y += 20;

    doc.setFontSize(14);
    doc.text(`ATS Score: ${score}%`, 20, y);

    y += 10;

    doc.text(`Job Match: ${jobMatch}%`, 20, y);

    y += 15;

    doc.setFontSize(16);
    doc.text("Skills", 20, y);

    y += 10;

    doc.setFontSize(11);

    const skillsText =
      skills.length > 0 ? skills.join(", ") : "No skills detected";

    const skillLines = doc.splitTextToSize(skillsText, 170);

    doc.text(skillLines, 20, y);

    y += skillLines.length * 7 + 10;

    doc.setFontSize(16);
    doc.text("Missing Skills", 20, y);

    y += 10;

    doc.setFontSize(11);

    const missingText =
      missingSkills.length > 0 ? missingSkills.join(", ") : "No missing skills";

    const missingLines = doc.splitTextToSize(missingText, 170);

    doc.text(missingLines, 20, y);

    y += missingLines.length * 7 + 10;

    doc.setFontSize(16);
    doc.text("Suggestions", 20, y);

    y += 10;

    doc.setFontSize(11);

    if (suggestions.length === 0) {
      doc.text("No suggestions.", 20, y);
      y += 10;
    } else {
      suggestions.forEach((item) => {
        const lines = doc.splitTextToSize(item, 165);
        doc.text("- " + lines[0], 20, y);

        for (let i = 1; i < lines.length; i++) {
          y += 7;
          doc.text(lines[i], 25, y);
        }

        y += 10;
      });
    }

    if (ai) {
      doc.setFontSize(16);
      doc.text("AI Summary", 20, y);

      y += 10;

      doc.setFontSize(11);

      const summaryLines = doc.splitTextToSize(
        ai.summary || "No summary available.",
        170,
      );

      doc.text(summaryLines, 20, y);

      y += summaryLines.length * 7 + 10;

      doc.setFontSize(16);
      doc.text("Strengths", 20, y);

      y += 10;

      doc.setFontSize(11);

      (ai.strengths || []).forEach((item) => {
        doc.text("- " + item, 20, y);
        y += 8;
      });

      y += 5;

      doc.setFontSize(16);
      doc.text("Weaknesses", 20, y);

      y += 10;

      doc.setFontSize(11);

      (ai.weaknesses || []).forEach((item) => {
        doc.text("- " + item, 20, y);
        y += 8;
      });

      y += 5;

      doc.setFontSize(16);
      doc.text("Final Recommendation", 20, y);

      y += 10;

      doc.setFontSize(11);

      const recommendation =
        ai.atsScore >= 80
          ? "Excellent resume. Ready for most ATS systems."
          : ai.atsScore >= 60
            ? "Good resume. Improve keywords and projects."
            : "Resume needs significant improvement.";

      const recLines = doc.splitTextToSize(recommendation, 170);

      doc.text(recLines, 20, y);
    }

    doc.save("Resume-Analysis-Report.pdf");
  };
  return (
    <motion.div
      className="max-w-7xl mx-auto p-8 space-y-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-500">AI Resume Analyzer Dashboard</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleAIAnalysis}
            disabled={loadingAI}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg transition flex items-center gap-2"
          >
            {loadingAI && (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}

            {loadingAI ? "Analyzing Resume..." : "🤖 Analyze with AI"}
          </button>

          <button
            onClick={downloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            📄 Download Report
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      <Header />

      <AnalyticsChart score={score} jobMatch={jobMatch} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ScoreCard score={score} />

        <ResumePreview file={file} />

        <JobMatchCard jobMatch={jobMatch} />

        <SummaryCard summary={summary} />
      </div>

      <SkillsCard skills={skills} />

      <MissingSkillsCard missingSkills={missingSkills} />

      <SuggestionsCard suggestions={suggestions} />

      {aiResult && <AIAnalysisCard data={aiResult} />}
    </motion.div>
  );
}

export default Dashboard;
