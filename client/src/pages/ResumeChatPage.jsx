import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../components/layout/MainLayout";
import ResumeChat from "../components/chat/ResumeChat";
import { getResumeById } from "../services/resumeService";

function ResumeChatPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResume = async () => {
      try {
        setLoading(true);

        // Resume ID is required
        if (!id) {
          toast.warning("Please select a resume first.");
          navigate("/history");
          return;
        }

        const res = await getResumeById(id);

        const resume = res?.resume;

        const text =
          resume?.extractedText ||
          resume?.resumeText ||
          resume?.text ||
          "";

        if (!text.trim()) {
          toast.error(
            "Resume text is not available. Please upload the resume again."
          );
          return;
        }

        setResumeText(text);
      } catch (error) {
        console.error("Resume Chat - Load Resume Error:", error);

        toast.error(
          error?.response?.data?.message ||
            "Unable to load resume."
        );
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [id, navigate]);

  /* =========================
     Loading
  ========================= */

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto
                mb-5
                h-14
                w-14
                animate-spin
                rounded-full
                border-4
                border-blue-600
                border-t-transparent
              "
            />

            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              Loading Resume...
            </h2>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Preparing your resume for AI Chat.
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =========================
     No Resume Text
  ========================= */

  if (!resumeText) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div
            className="
              w-full
              max-w-md
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-8
              text-center
              shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >
            <h2 className="mb-3 text-2xl font-bold text-slate-900 dark:text-white">
              Resume Text Not Available
            </h2>

            <p className="mb-6 text-slate-500 dark:text-slate-400">
              We couldn't find the extracted text for this resume.
              Please upload the resume again.
            </p>

            <button
              onClick={() => navigate("/upload")}
              className="
                rounded-xl
                bg-blue-600
                px-6
                py-3
                font-semibold
                text-white
                transition
                hover:bg-blue-700
              "
            >
              Upload Resume
            </button>
          </div>
        </div>
      </MainLayout>
    );
  }

  /* =========================
     Resume Chat
  ========================= */

  return (
    <MainLayout>
      <ResumeChat resumeText={resumeText} />
    </MainLayout>
  );
}

export default ResumeChatPage;