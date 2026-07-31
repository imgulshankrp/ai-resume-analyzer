import {
  useLocation,
  Navigate,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import jsPDF from "jspdf";
import { toast } from "react-toastify";

import MainLayout from "../components/layout/MainLayout";

import ScoreCard from "../components/analysis/ScoreCard";
import SummaryCard from "../components/analysis/SummaryCard";
import SkillsCard from "../components/analysis/SkillsCard";
import MissingSkillsCard from "../components/analysis/MissingSkillsCard";
import SuggestionsCard from "../components/analysis/SuggestionsCard";
import ResumePreview from "../components/analysis/ResumePreview";
import AIAnalysisCard from "../components/analysis/AIAnalysisCard";

import AnalyticsChart from "../components/dashboard/AnalyticsChart";

import JDMatcher from "../components/jdmatcher/JDMatcher";
import JobMatchCard from "../components/jdmatcher/JobMatchCard";

import ResumeChat from "../components/chat/ResumeChat";

import { API_URL } from "../config";

function Analysis() {
  const location = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const analysis = location.state?.analysis;

  const file = location.state?.file;

  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  const [aiResult, setAiResult] = useState("");

  const [loadingAI, setLoadingAI] = useState(false);

  if (!analysis) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-slate-900">
            <h2 className="mb-3 text-2xl font-bold dark:text-white">
              No Resume Analysis Found
            </h2>

            <p className="mb-6 text-slate-500 dark:text-slate-400">
              You haven't analyzed any resume in this session. Please upload a
              resume to start the analysis.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Upload Resume
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  const score = analysis.score || 0;

  const jobMatch = analysis.jobMatch ?? analysis.jdMatch ?? 0;

  const skills = analysis.skills || analysis.foundSkills || [];

  const missingSkills = analysis.missingSkills || [];

  const suggestions = analysis.suggestions || [];

  const summary = analysis.summary || "No summary available.";

  const skillStrength = Math.min(skills.length * 8, 100);

  /* ===============================
        AI Resume Analysis
  =============================== */

  const handleAIAnalysis = async () => {
    try {
      setLoadingAI(true);

      const resumeText =
        analysis?.extractedText || analysis?.resumeText || analysis?.text || "";

      if (!resumeText) {
        toast.warning("Resume text not found. Please upload the resume again.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/ai/analyze`,
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

      toast.success("AI Analysis Completed!");
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
        Download Report
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

    y = checkPage(doc, y);

    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("Skills Found", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    const skillLines = doc.splitTextToSize(
      skills.length ? skills.join(", ") : "No skills detected.",
      170,
    );

    doc.text(skillLines, 20, y);

    y += skillLines.length * 7 + 10;

    y = checkPage(doc, y);

    doc.setTextColor(220, 38, 38);
    doc.setFontSize(16);
    doc.text("Missing Skills", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(11);

    const missingLines = doc.splitTextToSize(
      missingSkills.length ? missingSkills.join(", ") : "No missing skills.",
      170,
    );

    doc.text(missingLines, 20, y);

    y += missingLines.length * 7 + 10;

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

    doc.save("Resume-Analysis-Report.pdf");
  };
  return (
    <MainLayout>
      <motion.div
        className="max-w-7xl mx-auto space-y-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 dark:text-white">
              Resume Analysis
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2">
              Detailed ATS analysis powered by AI.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleAIAnalysis}
              disabled={loadingAI}
              className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold disabled:opacity-60"
            >
              {loadingAI ? "Analyzing..." : "🤖 Analyze with AI"}
            </button>

            <button
              onClick={downloadReport}
              className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
            >
              📄 Download Report
            </button>

            <div className="flex gap-3">
              <button
                onClick={() => navigate(-1)}
                className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-800 text-white font-semibold"
              >
                ← Back
              </button>

              <button
                onClick={() => navigate("/dashboard")}
                className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                Dashboard
              </button>
            </div>
          </div>
        </div>

        {/* Score + Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScoreCard score={score} />

          <ResumePreview file={file} />
        </div>

        {/* Summary + Job Match */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SummaryCard summary={summary} score={score} skills={skills} />

          <JobMatchCard jobMatch={jobMatch} />
        </div>

        {/* Analytics */}
        <AnalyticsChart
          score={score}
          jobMatch={jobMatch}
          skills={skills}
          missingSkills={missingSkills}
          suggestions={suggestions}
        />

        {/* Resume Strength */}
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 dark:text-white">
            Resume Strength
          </h2>

          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2 dark:text-white">
                <span>Skills</span>

                <span>{skillStrength}%</span>
              </div>

              <progress className="w-full" value={skillStrength} max="100" />
            </div>

            <div>
              <div className="flex justify-between mb-2 dark:text-white">
                <span>Overall ATS</span>

                <span>{score}%</span>
              </div>

              <progress className="w-full" value={score} max="100" />
            </div>
          </div>
        </div>

        {/* Skills */}
        <SkillsCard skills={skills} />

        {/* Missing Skills */}
        <MissingSkillsCard missingSkills={missingSkills} />

        {/* Suggestions */}
        <SuggestionsCard suggestions={suggestions} />

        {/* AI Analysis */}
        {aiResult && <AIAnalysisCard data={aiResult} />}

        {/* JD Matcher */}
        {tab === "jd" && (
          <JDMatcher
            resumeText={
              analysis?.extractedText ||
              analysis?.resumeText ||
              analysis?.text ||
              ""
            }
          />
        )}

        {tab === "chat" && (
          <ResumeChat
            resumeText={
              analysis?.extractedText ||
              analysis?.resumeText ||
              analysis?.text ||
              ""
            }
          />
        )}

        {/* Resume Chat */}
        <ResumeChat
          resumeText={
            analysis?.extractedText ||
            analysis?.resumeText ||
            analysis?.text ||
            ""
          }
        />
      </motion.div>
    </MainLayout>
  );
}

export default Analysis;
