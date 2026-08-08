import { useState } from "react";
import { motion } from "framer-motion";
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle } from "react-icons/fa";

import MainLayout from "../components/layout/MainLayout";
import api from "../services/api";

function CompareResume() {
  const [resume1, setResume1] = useState(null);
  const [resume2, setResume2] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* ==========================================
        Handle File
  ========================================== */

  const handleFile = (e, index) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Only PDF files are allowed.");
      e.target.value = "";
      return;
    }

    if (index === 1) {
      setResume1(file);
    } else {
      setResume2(file);
    }

    e.target.value = "";
  };

  /* ==========================================
        Compare Resumes
  ========================================== */

  const compareResumes = async () => {
    if (!resume1 || !resume2) {
      alert("Please upload both resumes.");
      return;
    }

    try {
      setLoading(true);
      setResult(null);

      const formData = new FormData();

      formData.append("resume1", resume1);
      formData.append("resume2", resume2);

      const { data } = await api.post("/compare", formData);

      setResult(data);
    } catch (error) {
      console.error("Comparison error:", error);

      alert(error?.response?.data?.message || "Comparison failed.");
    } finally {
      setLoading(false);
    }
  };

  /* ==========================================
        Upload Card
  ========================================== */

  const UploadCard = ({ file, index, title, subtitle }) => {
    return (
      <div className="min-w-0">
        {/* Card Title */}

        <div className="mb-2 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              {title}
            </h2>

            <p className="mt-0.5 text-sm font-medium text-slate-600 dark:text-slate-400">
              {subtitle}
            </p>
          </div>

          <span
            className="
              rounded-full
              border
              border-slate-300
              bg-slate-100
              px-3
              py-1
              text-xs
              font-bold
              text-slate-700
              dark:border-slate-700
              dark:bg-slate-800
              dark:text-slate-300
            "
          >
            PDF
          </span>
        </div>

        {/* Upload Area */}

        <label
          className={`
            group
            relative
            flex
            h-[165px]
            cursor-pointer
            flex-col
            items-center
            justify-center
            rounded-2xl
            border-2
            border-dashed
            px-5
            text-center
            transition-all
            duration-300
            ${
              file
                ? `
                  border-emerald-500
                  bg-emerald-50
                  hover:bg-emerald-100
                  dark:border-emerald-500
                  dark:bg-emerald-950/20
                `
                : `
                  border-slate-300
                  bg-slate-50
                  hover:border-blue-500
                  hover:bg-blue-50
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:hover:border-blue-500
                  dark:hover:bg-blue-950/20
                `
            }
          `}
        >
          {file ? (
            <>
              <div
                className="
                  mb-2
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-emerald-100
                  dark:bg-emerald-900/40
                "
              >
                <FaCheckCircle className="text-2xl text-emerald-600 dark:text-emerald-400" />
              </div>

              <h3 className="max-w-[85%] break-all text-base font-bold text-slate-900 dark:text-white">
                {file.name}
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                {(file.size / 1024).toFixed(1)} KB
              </p>

              <span className="mt-1 text-xs font-bold text-blue-600 dark:text-blue-400">
                Click to replace
              </span>
            </>
          ) : (
            <>
              <div
                className="
                  mb-2
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  dark:bg-blue-900/40
                "
              >
                <FaCloudUploadAlt className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Upload Resume
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-400">
                Click to select a PDF file
              </p>

              <span
                className="
                  mt-2
                  rounded-full
                  bg-slate-200
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-slate-700
                  dark:bg-slate-800
                  dark:text-slate-300
                "
              >
                PDF only
              </span>
            </>
          )}

          <input
            type="file"
            accept=".pdf,application/pdf"
            hidden
            onChange={(e) => handleFile(e, index)}
          />
        </label>
      </div>
    );
  };

  /* ==========================================
        Page
  ========================================== */

  return (
    <MainLayout>
      <div
        className="
          min-h-[calc(100vh-80px)]
          overflow-hidden
          bg-slate-50
          px-4
          py-4
          dark:bg-slate-950
          sm:px-6
        "
      >
        <div className="mx-auto w-full max-w-6xl">
          {/* ==========================================
                Page Heading
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.35,
            }}
            className="mb-5 text-center"
          >
            {/* ICON + HEADING IN SAME LINE */}

            <div className="flex items-center justify-center gap-3">
              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-600
                  shadow-md
                  shadow-blue-600/20
                "
              >
                <FaFilePdf className="text-xl text-white" />
              </div>

              <h1
                className="
                  text-3xl
                  font-extrabold
                  tracking-tight
                  text-slate-900
                  dark:text-white
                "
              >
                Compare Resumes
              </h1>
            </div>

            <p
              className="
                mt-2
                text-sm
                font-medium
                text-slate-600
                dark:text-slate-400
              "
            >
              Compare two resumes to identify their strengths, skills, and
              differences.
            </p>
          </motion.div>

          {/* ==========================================
                Main Card
          ========================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
            }}
            className="
              rounded-3xl
              border
              border-slate-300
              bg-white
              p-5
              shadow-sm
              dark:border-slate-800
              dark:bg-slate-900
              sm:p-6
            "
          >
            {/* ==========================================
                  Resume Uploads
            ========================================== */}

            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <UploadCard
                file={resume1}
                index={1}
                title="Resume 1"
                subtitle="First candidate"
              />

              <UploadCard
                file={resume2}
                index={2}
                title="Resume 2"
                subtitle="Second candidate"
              />
            </div>

            {/* ==========================================
                  VS Divider
            ========================================== */}

            <div className="my-4 flex items-center gap-4">
              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />

              <span
                className="
                  rounded-full
                  border
                  border-slate-300
                  bg-white
                  px-3
                  py-1
                  text-xs
                  font-extrabold
                  text-slate-600
                  dark:border-slate-700
                  dark:bg-slate-900
                  dark:text-slate-400
                "
              >
                VS
              </span>

              <div className="h-px flex-1 bg-slate-300 dark:bg-slate-700" />
            </div>

            {/* {/* ==========================================
      Compare Button
========================================== */}

            <div className="mt-1 text-center">
              <button
                type="button"
                onClick={compareResumes}
                disabled={loading || !resume1 || !resume2}
                className={`
      inline-flex
      min-w-[230px]
      items-center
      justify-center
      rounded-xl
      px-8
      py-3
      text-base
      font-bold
      transition-all
      duration-300

      ${
        loading || !resume1 || !resume2
          ? `
            cursor-not-allowed
            border
            border-slate-300
            bg-slate-200
            text-slate-700
            shadow-sm
            dark:border-slate-700
            dark:bg-slate-800
            dark:text-slate-300
          `
          : `
            bg-blue-600
            text-white
            shadow-lg
            shadow-blue-600/25
            hover:bg-blue-700
            hover:shadow-xl
            hover:-translate-y-0.5
          `
      }
    `}
              >
                {loading ? "Comparing..." : "Compare Resumes"}
              </button>

              <p
                className={`
      mt-2
      text-sm
      font-semibold
      ${
        resume1 && resume2
          ? "text-emerald-600 dark:text-emerald-400"
          : "text-slate-600 dark:text-slate-400"
      }
    `}
              >
                {!resume1 || !resume2
                  ? "Upload both resumes to start the comparison."
                  : "✓ Both resumes are ready for comparison."}
              </p>
            </div>

            {/* ==========================================
                  Result
            ========================================== */}

            {result && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="
                  mt-5
                  max-h-[300px]
                  overflow-auto
                  rounded-2xl
                  border
                  border-emerald-300
                  bg-emerald-50
                  p-4
                  dark:border-emerald-900
                  dark:bg-emerald-950/20
                "
              >
                <div className="mb-3 flex items-center gap-3">
                  <FaCheckCircle className="text-xl text-emerald-600 dark:text-emerald-400" />

                  <div>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Comparison Result
                    </h2>

                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      Comparison completed successfully.
                    </p>
                  </div>
                </div>

                <pre
                  className="
                    whitespace-pre-wrap
                    break-words
                    text-sm
                    font-medium
                    leading-6
                    text-slate-800
                    dark:text-slate-300
                  "
                >
                  {JSON.stringify(result, null, 2)}
                </pre>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}

export default CompareResume;
