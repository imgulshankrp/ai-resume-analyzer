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
import StatsCards from "../components/dashboard/StatsCards";
import JDMatcher from "../components/dashboard/JDMatcher";
import ResumeChat from "../components/dashboard/ResumeChat";

import { API_URL } from "../config";

function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [analysis, setAnalysis] = useState(
    location.state?.analysis || location.state || null,
  );

  const [loading, setLoading] = useState(true);

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
        const { data } = await axios.get(`${API_URL}/api/dashboard/latest`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

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
  /* ===============================
      AI Resume Analysis
  =============================== */

  const handleAIAnalysis = async () => {
    try {
      setLoadingAI(true);

      const resumeText =
        analysis?.extractedText || analysis?.text || analysis?.resumeText || "";

      if (!resumeText) {
        alert("Resume text not found. Please upload the resume again.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/api/ai/analyze`,
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

      setAiResult(response.data.result);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Unable to analyze resume.");
    } finally {
      setLoadingAI(false);
    }
  };

  /* ===============================
        PDF Helper
  =============================== */

  const checkPage = (doc, y) => {
    if (y > 270) {
      doc.addPage();
      return 20;
    }
    return y;
  };

  /* ===============================
      Download Professional Report
  =============================== */

  const downloadReport = () => {
    const doc = new jsPDF();

    let ai = null;

    try {
      ai = aiResult ? JSON.parse(aiResult) : null;
    } catch {
      ai = null;
    }

    let y = 20;

    /* Header */

    doc.setFillColor(37, 99, 235);
    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(22);

    doc.text("AI Resume Analysis Report", 20, 22);

    doc.setFontSize(11);

    doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 30);

    doc.setTextColor(0, 0, 0);

    y = 50;

    doc.setFontSize(15);

    doc.text(`Candidate : ${user?.name || "User"}`, 20, y);

    y += 10;

    doc.text(`ATS Score : ${score}%`, 20, y);

    y += 10;

    doc.text(`Job Match : ${jobMatch}%`, 20, y);

    y += 15;

    /* Skills */

    y = checkPage(doc, y);

    doc.setFontSize(16);

    doc.setTextColor(37, 99, 235);

    doc.text("Skills Found", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(11);

    const skillsText = skills.length
      ? skills.join(", ")
      : "No skills detected.";

    const skillLines = doc.splitTextToSize(skillsText, 170);

    doc.text(skillLines, 20, y);

    y += skillLines.length * 7 + 10;

    /* Missing Skills */

    y = checkPage(doc, y);

    doc.setTextColor(220, 38, 38);

    doc.setFontSize(16);

    doc.text("Missing Skills", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(11);

    const missingText = missingSkills.length
      ? missingSkills.join(", ")
      : "No missing skills.";

    const missingLines = doc.splitTextToSize(missingText, 170);

    doc.text(missingLines, 20, y);

    y += missingLines.length * 7 + 10;

    /* Suggestions */

    y = checkPage(doc, y);

    doc.setTextColor(16, 185, 129);

    doc.setFontSize(16);

    doc.text("Suggestions", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    doc.setFontSize(11);

    if (!suggestions.length) {
      doc.text("No suggestions.", 20, y);

      y += 10;
    } else {
      suggestions.forEach((item) => {
        y = checkPage(doc, y);

        const lines = doc.splitTextToSize(item, 165);

        doc.text("• " + lines[0], 20, y);

        for (let i = 1; i < lines.length; i++) {
          y += 7;

          doc.text(lines[i], 25, y);
        }

        y += 10;
      });
    }
    /* ===============================
        AI Summary
    =============================== */

    if (ai) {
      y = checkPage(doc, y);

      doc.setTextColor(37, 99, 235);
      doc.setFontSize(16);
      doc.text("AI Summary", 20, y);

      y += 10;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      const summaryLines = doc.splitTextToSize(
        ai.summary || "No summary available.",
        170,
      );

      doc.text(summaryLines, 20, y);

      y += summaryLines.length * 7 + 10;

      /* Strengths */

      y = checkPage(doc, y);

      doc.setTextColor(22, 163, 74);
      doc.setFontSize(16);
      doc.text("Strengths", 20, y);

      y += 10;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      (ai.strengths || []).forEach((item) => {
        y = checkPage(doc, y);

        const lines = doc.splitTextToSize(item, 165);

        doc.text("• " + lines[0], 20, y);

        for (let i = 1; i < lines.length; i++) {
          y += 7;
          doc.text(lines[i], 25, y);
        }

        y += 8;
      });

      /* Weaknesses */

      y = checkPage(doc, y);

      doc.setTextColor(220, 38, 38);
      doc.setFontSize(16);
      doc.text("Weaknesses", 20, y);

      y += 10;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      (ai.weaknesses || []).forEach((item) => {
        y = checkPage(doc, y);

        const lines = doc.splitTextToSize(item, 165);

        doc.text("• " + lines[0], 20, y);

        for (let i = 1; i < lines.length; i++) {
          y += 7;
          doc.text(lines[i], 25, y);
        }

        y += 8;
      });

      /* Recommendation */

      y = checkPage(doc, y);

      doc.setTextColor(37, 99, 235);
      doc.setFontSize(16);
      doc.text("Final Recommendation", 20, y);

      y += 10;

      doc.setTextColor(0, 0, 0);
      doc.setFontSize(11);

      const recommendation =
        score >= 85
          ? "Excellent resume. You are ready to apply for most ATS-based recruitment systems."
          : score >= 70
            ? "Good resume. Improve projects, achievements, and keywords for a stronger ATS score."
            : score >= 50
              ? "Average resume. Add more technical skills, measurable achievements, and relevant projects."
              : "Your resume needs significant improvements before applying to competitive roles.";

      const recommendationLines = doc.splitTextToSize(recommendation, 170);

      doc.text(recommendationLines, 20, y);
    }

    /* ===============================
        Footer
    =============================== */

    const totalPages = doc.getNumberOfPages();

    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);

      doc.setDrawColor(220);

      doc.line(15, 285, 195, 285);

      doc.setFontSize(10);

      doc.setTextColor(120);

      doc.text(`Generated by AI Resume Analyzer`, 20, 291);

      doc.text(`Page ${i} of ${totalPages}`, 170, 291);
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

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleAIAnalysis}
            disabled={loadingAI}
            className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg"
          >
            {loadingAI ? "Analyzing..." : "🤖 Analyze with AI"}
          </button>

          <button
            onClick={downloadReport}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
          >
            📄 Download Report
          </button>

          <button
            onClick={() => navigate("/compare")}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg"
          >
            📑 Compare Resumes
          </button>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>

      <Header />

      <StatsCards />

      <AnalyticsChart
        score={score}
        jobMatch={jobMatch}
        skills={skills}
        missingSkills={missingSkills}
        suggestions={suggestions}
      />

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

      <JDMatcher
        resumeText={
          analysis?.extractedText ||
          analysis?.resumeText ||
          analysis?.text ||
          ""
        }
      />

      <ResumeChat
        resumeText={
          analysis?.extractedText ||
          analysis?.resumeText ||
          analysis?.text ||
          ""
        }
      />
    </motion.div>
  );
}

export default Dashboard;
