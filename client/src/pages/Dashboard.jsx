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
import LoadingSpinner from "../components/common/LoadingSpinner";

import { API_URL } from "../config";
import { toast } from "react-toastify";
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
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <LoadingSpinner text="Loading Dashboard..." />
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
        toast.warning("Resume text not found. Please upload the resume again.");
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

      // Save AI result
      setAiResult(response.data.result);

      toast.success("AI analysis completed successfully!");
    } catch (error) {
      console.error(error);

      toast.error(error.response?.data?.message || "Unable to analyze resume.");
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
      className="
min-h-screen
bg-gradient-to-br
from-slate-100
via-blue-50
to-indigo-100
max-w-7xl
mx-auto
p-8
space-y-8
"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Top Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-2xl">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
                Welcome back, {user?.name || "User"} 👋
              </h1>

              <p className="mt-2 text-blue-100 text-lg">
                Analyze, improve and compare your resume with AI.
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl sm:text-5xl font-bold">{score}%</div>

              <div className="text-blue-100">ATS Score</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(147,51,234,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={handleAIAnalysis}
            disabled={loadingAI}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loadingAI ? "⏳ Analyzing..." : "🤖 Analyze with AI"}
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(37,99,235,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={downloadReport}
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            📄 Download Report
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(22,163,74,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={() => navigate("/compare")}
            className="bg-gradient-to-r from-green-600 to-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            📑 Compare Resumes
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 10px 25px rgba(239,68,68,0.35)",
            }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            onClick={handleLogout}
            className="bg-gradient-to-r from-red-500 to-rose-600 text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-xl transition-all duration-300"
          >
            🚪 Logout
          </motion.button>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Header />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <StatsCards />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <AnalyticsChart
          score={score}
          jobMatch={jobMatch}
          skills={skills}
          missingSkills={missingSkills}
          suggestions={suggestions}
        />
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
        >
          <ScoreCard score={score} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ scale: 1.02 }}
        >
          <ResumePreview file={file} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          whileHover={{ scale: 1.02 }}
        >
          <JobMatchCard jobMatch={jobMatch} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45 }}
          whileHover={{ scale: 1.02 }}
        >
          <SummaryCard summary={summary} />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        whileHover={{ scale: 1.01 }}
      >
        <SkillsCard skills={skills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55 }}
        whileHover={{ scale: 1.01 }}
      >
        <MissingSkillsCard missingSkills={missingSkills} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        whileHover={{ scale: 1.01 }}
      >
        <SuggestionsCard suggestions={suggestions} />
      </motion.div>

      {aiResult && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
        >
          <AIAnalysisCard data={aiResult} />
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <JDMatcher
          resumeText={
            analysis?.extractedText ||
            analysis?.resumeText ||
            analysis?.text ||
            ""
          }
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.75 }}
      >
        <ResumeChat
          resumeText={
            analysis?.extractedText ||
            analysis?.resumeText ||
            analysis?.text ||
            ""
          }
        />
      </motion.div>
    </motion.div>
  );
}

export default Dashboard;
