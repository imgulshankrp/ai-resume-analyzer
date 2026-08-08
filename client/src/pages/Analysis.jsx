import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
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

import { API_URL } from "../config";
import { getResumeById } from "../services/resumeService";

function Analysis() {
  const navigate = useNavigate();

  const { id } = useParams();

  const [searchParams] = useSearchParams();

  const tab = searchParams.get("tab");

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const [analysis, setAnalysis] = useState(null);

  const [loading, setLoading] = useState(true);

  const [loadingAI, setLoadingAI] = useState(false);

  const [aiResult, setAiResult] = useState("");

  const score = analysis?.analysis?.score ?? analysis?.score ?? 0;

  const jobMatch =
    analysis?.analysis?.jobMatch ??
    analysis?.jobMatch ??
    analysis?.jdMatch ??
    0;

  const skills =
    analysis?.analysis?.skills ??
    analysis?.skills ??
    analysis?.foundSkills ??
    [];

  const missingSkills =
    analysis?.analysis?.missingSkills ?? analysis?.missingSkills ?? [];

  const suggestions =
    analysis?.analysis?.suggestions ?? analysis?.suggestions ?? [];

  const summary =
    analysis?.analysis?.summary ?? analysis?.summary ?? "No summary available.";

  const skillStrength = Math.min(skills.length * 8, 100);

  const loadResume = async () => {
    if (!id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      const res = await getResumeById(id);

      setAnalysis(res.resume);
    } catch (err) {
      console.error(err);

      if (err?.response?.status === 404) {
        setAnalysis(null);
      } else {
        toast.error(err?.response?.data?.message || "Unable to load resume.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, [id]);

  useEffect(() => {
    if (!loading && analysis) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [loading, analysis]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[75vh] items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <div
              className="
                mx-auto
                mb-6
                h-16
                w-16
                animate-spin
                rounded-full
                border-4
                border-blue-600
                border-t-transparent
              "
            />

            <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
              Loading Resume...
            </h2>

            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Preparing your resume analysis...
            </p>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  if (!analysis) {
    return (
      <MainLayout>
        <div className="flex min-h-[75vh] items-center justify-center px-6">
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="
              w-full
              max-w-xl
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-10
              text-center
              shadow-xl
              dark:border-slate-700
              dark:bg-slate-900
            "
          >
            <div className="mb-6 text-7xl">📄</div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              No Resume Found
            </h1>

            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Upload your resume to unlock ATS Score, AI Analysis, Resume Chat,
              JD Matcher, Missing Skills, Suggestions and Analytics.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate("/upload")}
                className="
                  rounded-xl
                  bg-blue-600
                  px-6
                  py-3
                  font-semibold
                  text-white
                  hover:bg-blue-700
                "
              >
                Upload Resume
              </button>

              <button
                onClick={() => navigate("/history")}
                className="
                  rounded-xl
                  border
                  border-slate-300
                  px-6
                  py-3
                  font-semibold
                  dark:border-slate-700
                "
              >
                View History
              </button>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }
  /* ==========================================
          AI Resume Analysis
  ========================================== */

  const handleAIAnalysis = async () => {
    if (!analysis) {
      toast.warning("Please upload a resume first.");
      navigate("/upload");
      return;
    }

    const resumeText =
      analysis?.extractedText || analysis?.resumeText || analysis?.text || "";

    if (!resumeText.trim()) {
      toast.warning("Resume text not found. Please upload the resume again.");
      return;
    }

    try {
      setLoadingAI(true);

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

      if (response?.data?.result) {
        setAiResult(response.data.result);

        toast.success("AI Analysis Completed!");
      } else {
        toast.warning("No AI response received.");
      }
    } catch (error) {
      console.error(error);

      const status = error?.response?.status;

      switch (status) {
        case 400:
          toast.warning("Invalid resume data.");
          break;

        case 401:
          toast.error("Session expired. Please login again.");
          navigate("/login");
          break;

        case 404:
          toast.warning("Resume not found.");
          navigate("/upload");
          break;

        case 429:
          toast.warning("Too many requests.");
          break;

        case 500:
          toast.error("AI server unavailable.");
          break;

        default:
          toast.error(
            error?.response?.data?.message || "Unable to analyze resume.",
          );
      }
    } finally {
      setLoadingAI(false);
    }
  };

  /* ==========================================
          PDF Helper
  ========================================== */

  const checkPage = (doc, y) => {
    if (y >= 270) {
      doc.addPage();
      return 20;
    }

    return y;
  };

  /* ==========================================
          Download Report
  ========================================== */

  const downloadReport = () => {
    if (!analysis) {
      toast.warning("No analysis available.");
      return;
    }

    const doc = new jsPDF();

    let y = 20;

    doc.setFillColor(37, 99, 235);

    doc.rect(0, 0, 210, 35, "F");

    doc.setTextColor(255, 255, 255);

    doc.setFontSize(22);

    doc.text("AI Resume Analysis Report", 20, 22);

    doc.setFontSize(11);

    doc.text(`Generated : ${new Date().toLocaleString()}`, 20, 30);

    doc.setTextColor(0, 0, 0);

    y = 50;

    doc.setFontSize(16);

    doc.text(`Candidate : ${user?.name || "User"}`, 20, y);

    y += 10;

    doc.text(`ATS Score : ${score}%`, 20, y);

    y += 10;

    doc.text(`Job Match : ${jobMatch}%`, 20, y);

    y += 15;

    y = checkPage(doc, y);

    doc.setTextColor(37, 99, 235);

    doc.text("Summary", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    const summaryLines = doc.splitTextToSize(summary, 170);

    doc.text(summaryLines, 20, y);

    y += summaryLines.length * 7 + 12;

    y = checkPage(doc, y);

    doc.setTextColor(37, 99, 235);

    doc.text("Skills Found", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    const skillLines = doc.splitTextToSize(
      skills.length ? skills.join(", ") : "No skills detected.",
      170,
    );

    doc.text(skillLines, 20, y);

    y += skillLines.length * 7 + 12;

    y = checkPage(doc, y);

    doc.setTextColor(220, 38, 38);

    doc.text("Missing Skills", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    const missingLines = doc.splitTextToSize(
      missingSkills.length ? missingSkills.join(", ") : "No missing skills.",
      170,
    );

    doc.text(missingLines, 20, y);

    y += missingLines.length * 7 + 12;

    y = checkPage(doc, y);

    doc.setTextColor(16, 185, 129);

    doc.text("Suggestions", 20, y);

    y += 10;

    doc.setTextColor(0, 0, 0);

    if (!suggestions.length) {
      doc.text("No suggestions available.", 20, y);
    } else {
      suggestions.forEach((item) => {
        y = checkPage(doc, y);

        const lines = doc.splitTextToSize("• " + item, 170);

        doc.text(lines, 20, y);

        y += lines.length * 7 + 6;
      });
    }

    if (aiResult) {
      y = checkPage(doc, y);

      doc.setTextColor(99, 102, 241);

      doc.text("AI Insights", 20, y);

      y += 10;

      doc.setTextColor(0, 0, 0);

      const aiLines = doc.splitTextToSize(
        typeof aiResult === "string"
          ? aiResult
          : JSON.stringify(aiResult, null, 2),
        170,
      );

      doc.text(aiLines, 20, y);
    }

    doc.save("Resume-Analysis-Report.pdf");

    toast.success("Report downloaded successfully.");
  };
  return (
    <MainLayout>
      <motion.div
        className="mx-auto max-w-7xl space-y-8"
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        {/* ===============================
                Header
        =============================== */}

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-4xl font-bold text-white"
                >
                  Resume Analysis
                </motion.h1>

                <p className="mt-3 text-blue-100">
                  Detailed ATS analysis powered by AI with resume insights,
                  skill detection, suggestions and job matching.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleAIAnalysis}
                  disabled={loadingAI}
                  className="
                    rounded-xl
                    bg-purple-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-purple-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >
                  {loadingAI ? "Analyzing..." : "🤖 Analyze with AI"}
                </button>

                <button
                  onClick={downloadReport}
                  className="
                    rounded-xl
                    bg-emerald-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-emerald-700
                  "
                >
                  📄 Download Report
                </button>

                <button
                  onClick={() => navigate(-1)}
                  className="
                    rounded-xl
                    bg-slate-700
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-slate-800
                  "
                >
                  ← Back
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="
                    rounded-xl
                    bg-blue-600
                    px-5
                    py-3
                    font-semibold
                    text-white
                    transition-all
                    duration-300
                    hover:scale-105
                    hover:bg-blue-700
                  "
                >
                  Dashboard
                </button>
              </div>
            </div>

            {/* Quick Stats */}

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-blue-100">ATS Score</p>

                <h3 className="mt-2 text-3xl font-bold text-white">{score}%</h3>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-blue-100">Job Match</p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {jobMatch}%
                </h3>
              </div>

              <div className="rounded-2xl bg-white/10 p-5 backdrop-blur">
                <p className="text-sm text-blue-100">Skills Detected</p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  {skills.length}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* ===============================
                Score + Preview
        =============================== */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <ScoreCard score={score} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <ResumePreview
              file={{
                fileName: analysis.fileName,
                filePath: analysis.filePath,
              }}
            />
          </motion.div>
        </div>
        {/* =========================================
                Summary + Job Match
        ========================================= */}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <SummaryCard summary={summary} score={score} skills={skills} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <JobMatchCard jobMatch={jobMatch} />
          </motion.div>
        </div>

        {/* =========================================
                    Analytics
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <AnalyticsChart
            score={score}
            jobMatch={jobMatch}
            skills={skills}
            missingSkills={missingSkills}
            suggestions={suggestions}
          />
        </motion.div>

        {/* =========================================
                Resume Strength
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <h2 className="mb-8 text-2xl font-bold text-slate-900 dark:text-white">
            Resume Strength
          </h2>

          <div className="space-y-8">
            {/* Skills Strength */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Skills Coverage
                </span>

                <span className="font-bold text-blue-600">
                  {skillStrength}%
                </span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${skillStrength}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-blue-500
                    to-indigo-600
                  "
                />
              </div>
            </div>

            {/* ATS Strength */}

            <div>
              <div className="mb-2 flex justify-between">
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  Overall ATS Score
                </span>

                <span className="font-bold text-emerald-600">{score}%</span>
              </div>

              <div className="h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: `${score}%`,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  className="
                    h-full
                    rounded-full
                    bg-gradient-to-r
                    from-emerald-500
                    to-green-600
                  "
                />
              </div>
            </div>
          </div>
        </motion.div>
        {/* =========================================
                Skills
        ========================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <SkillsCard skills={skills} />
        </motion.div>

        {/* =========================================
                Missing Skills
        ========================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <MissingSkillsCard missingSkills={missingSkills} />
        </motion.div>

        {/* =========================================
                Suggestions
        ========================================= */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          <SuggestionsCard suggestions={suggestions} />
        </motion.div>

        {/* =========================================
                AI Analysis
        ========================================= */}

        {aiResult && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.45,
            }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <AIAnalysisCard data={aiResult} />
          </motion.div>
        )}
        {/* =========================================
                JD Matcher
        ========================================= */}

        {tab === "jd" && (
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-lg
              dark:border-slate-800
              dark:bg-slate-900
            "
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
        )}

        {/* =========================================
                Resume Chat
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-6
            shadow-lg
            dark:border-slate-800
            dark:bg-slate-900
          "
        >
          
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}

export default Analysis;
