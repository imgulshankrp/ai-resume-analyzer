import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import MainLayout from "../components/layout/MainLayout";
import JDMatcher from "../components/jdmatcher/JDMatcher";
import { getResumeById } from "../services/resumeService";

function JDMatcherPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const loadResume = async () => {
      try {
        setLoading(true);

        // ============================================
        // Resume ID is required
        // ============================================

        if (!id) {
          toast.warning("Please select a resume first.");
          navigate("/history");
          return;
        }

        // ============================================
        // Get resume from backend
        // ============================================

        const response = await getResumeById(id);

        const resume =
          response?.resume ||
          response?.data?.resume ||
          response?.data ||
          response;

        // ============================================
        // Get extracted resume text
        // ============================================

        const text =
          resume?.extractedText ||
          resume?.resumeText ||
          resume?.text ||
          resume?.analysis?.extractedText ||
          resume?.analysis?.resumeText ||
          "";

        if (!text || !text.trim()) {
          toast.error(
            "Resume text is not available. Please upload the resume again."
          );
          return;
        }

        if (mounted) {
          setResumeText(text);
        }
      } catch (error) {
        console.error(
          "JD Matcher - Load Resume Error:",
          error
        );

        if (mounted) {
          toast.error(
            error?.response?.data?.message ||
              "Unable to load resume."
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    loadResume();

    return () => {
      mounted = false;
    };
  }, [id, navigate]);

  // ============================================
  // Loading
  // ============================================

  if (loading) {
    return (
      <MainLayout>
        <div className="flex min-h-[70vh] items-center justify-center px-4">
          <div className="text-center">

            <div
              className="
                mx-auto
                h-12
                w-12
                animate-spin
                rounded-full
                border-4
                border-slate-200
                border-t-blue-600
                dark:border-slate-700
                dark:border-t-blue-500
              "
            />

            <h2
              className="
                mt-5
                text-xl
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Loading Resume...
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Preparing your resume for job matching.
            </p>

          </div>
        </div>
      </MainLayout>
    );
  }

  // ============================================
  // Resume text unavailable
  // ============================================

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

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                bg-amber-100
                text-amber-600
                dark:bg-amber-900/30
                dark:text-amber-400
              "
            >
              !
            </div>

            <h2
              className="
                mt-5
                text-2xl
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              Resume Text Not Available
            </h2>

            <p
              className="
                mt-3
                text-sm
                leading-6
                text-slate-500
                dark:text-slate-400
              "
            >
              We couldn't find the extracted text for this
              resume. Please upload the resume again.
            </p>

            <div className="mt-6 flex justify-center gap-3">

              <button
                type="button"
                onClick={() => navigate("/history")}
                className="
                  rounded-xl
                  border
                  border-slate-200
                  bg-white
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-slate-50
                  dark:border-slate-700
                  dark:bg-slate-800
                  dark:text-slate-200
                  dark:hover:bg-slate-700
                "
              >
                History
              </button>

              <button
                type="button"
                onClick={() => navigate("/upload")}
                className="
                  rounded-xl
                  bg-gradient-to-r
                  from-cyan-500
                  to-blue-600
                  px-5
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg
                  shadow-blue-500/20
                  transition
                  hover:-translate-y-0.5
                "
              >
                Upload Resume
              </button>

            </div>

          </div>
        </div>
      </MainLayout>
    );
  }

  // ============================================
  // JD Matcher
  // ============================================

  return (
    <MainLayout>
      <JDMatcher resumeText={resumeText} />
    </MainLayout>
  );
}

export default JDMatcherPage;