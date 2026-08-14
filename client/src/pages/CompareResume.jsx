import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

import MainLayout from "../components/layout/MainLayout";

import {
  FaArrowRight,
  FaCheckCircle,
  FaCloudUploadAlt,
  FaFilePdf,
  FaLightbulb,
  FaTrophy,
  FaSyncAlt,
  FaStar,
  FaBriefcase,
  FaGraduationCap,
  FaLayerGroup,
  FaArrowLeft,
  FaChartBar,
} from "react-icons/fa";

/* =========================================================
   HELPERS
========================================================= */

const normalize = (value) =>
  String(value || "").trim().toLowerCase();

const getScore = (resume) =>
  Number(
    resume?.score ??
      resume?.atsScore ??
      resume?.ats_score ??
      0
  );

const getSkills = (resume) => {
  const skills =
    resume?.skills ??
    resume?.foundSkills ??
    resume?.detectedSkills ??
    [];

  return Array.isArray(skills) ? skills : [];
};

function getComparisonResult(locationState) {
  const raw = locationState?.comparisonResult;

  if (!raw) return null;

  return raw?.comparison || raw?.result || raw;
};

/* =========================================================
   MAIN PAGE
========================================================= */

export default function CompareResume() {
  const navigate = useNavigate();
  const location = useLocation();

  const [resume1, setResume1] = useState(null);
  const [resume2, setResume2] = useState(null);
  const [loading, setLoading] = useState(false);

  const result = getComparisonResult(location.state);

  const firstResume = result?.resume1 || {};
  const secondResume = result?.resume2 || {};

  const score1 = getScore(firstResume);
  const score2 = getScore(secondResume);

  const skills1 = getSkills(firstResume);
  const skills2 = getSkills(secondResume);

  /* =======================================================
     SKILL COMPARISON
  ======================================================= */

  const {
    matchedSkills,
    uniqueSkills1,
    uniqueSkills2,
  } = useMemo(() => {
    const map1 = new Map(
      skills1.map((skill) => [
        normalize(skill),
        skill,
      ])
    );

    const map2 = new Map(
      skills2.map((skill) => [
        normalize(skill),
        skill,
      ])
    );

    const matched = [];
    const unique1 = [];
    const unique2 = [];

    map1.forEach((original, key) => {
      if (map2.has(key)) {
        matched.push(original);
      } else {
        unique1.push(original);
      }
    });

    map2.forEach((original, key) => {
      if (!map1.has(key)) {
        unique2.push(original);
      }
    });

    return {
      matchedSkills: matched,
      uniqueSkills1: unique1,
      uniqueSkills2: unique2,
    };
  }, [skills1, skills2]);

  const skillsMatch = useMemo(() => {
    const all = new Set(
      [...skills1, ...skills2].map(normalize)
    );

    return all.size
      ? Math.round(
          (matchedSkills.length / all.size) * 100
        )
      : 0;
  }, [skills1, skills2, matchedSkills]);

  const experienceMatch = Number(
    result?.experienceMatch ??
      result?.experience?.match ??
      0
  );

  const educationMatch = Number(
    result?.educationMatch ??
      result?.education?.match ??
      0
  );

  const contentMatch = Number(
    result?.contentMatch ??
      result?.content?.match ??
      0
  );

  const scoreDifference = Math.abs(
    score1 - score2
  );

  const winner =
    score1 === score2
      ? "Tie"
      : score1 > score2
      ? "Resume 1"
      : "Resume 2";

  const recommendation =
    result?.recommendation ||
    result?.aiRecommendation ||
    (winner === "Tie"
      ? "Both resumes have the same ATS score. Choose the version that is more relevant to the target job and has clearer, stronger evidence of impact."
      : `${winner} has the higher ATS score. Use it as the stronger starting point, then review the skill and content differences before applying.`);

  /* =======================================================
     FILE HANDLING
  ======================================================= */

  const handleFile = (setter) => (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please select a PDF resume.");
      event.target.value = "";
      return;
    }

    setter(file);
  };

  /* =======================================================
     COMPARE
  ======================================================= */

  const handleCompare = async () => {
    if (!resume1 || !resume2) {
      toast.warning(
        "Please upload both resumes before comparing."
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("resume1", resume1);
      formData.append("resume2", resume2);

      const { data } = await api.post(
        "/compare",
        formData
      );

      navigate("/compare", {
        replace: true,
        state: {
          comparisonResult: data,
        },
      });

      toast.success(
        "Resume comparison completed successfully."
      );
    } catch (error) {
      console.error(
        "COMPARE RESUMES ERROR:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to compare resumes."
      );
    } finally {
      setLoading(false);
    }
  };

  /* =======================================================
     NEW COMPARISON
  ======================================================= */

  const handleNewComparison = () => {
    setResume1(null);
    setResume2(null);

    navigate("/compare", {
      replace: true,
      state: null,
    });
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <MainLayout>
      {result ? (
        <ComparisonResult
          firstResume={firstResume}
          secondResume={secondResume}
          score1={score1}
          score2={score2}
          scoreDifference={scoreDifference}
          matchedSkills={matchedSkills}
          uniqueSkills1={uniqueSkills1}
          uniqueSkills2={uniqueSkills2}
          skillsMatch={skillsMatch}
          experienceMatch={experienceMatch}
          educationMatch={educationMatch}
          contentMatch={contentMatch}
          winner={winner}
          recommendation={recommendation}
          onBack={() =>
            navigate("/compare", {
              replace: true,
              state: null,
            })
          }
          onNewComparison={handleNewComparison}
        />
      ) : (
        <UploadComparison
          resume1={resume1}
          resume2={resume2}
          loading={loading}
          onResume1={handleFile(setResume1)}
          onResume2={handleFile(setResume2)}
          onCompare={handleCompare}
        />
      )}
    </MainLayout>
  );
}

/* =========================================================
   UPLOAD COMPARISON
========================================================= */

function UploadComparison({
  resume1,
  resume2,
  loading,
  onResume1,
  onResume2,
  onCompare,
}) {
  return (
    <div
      className="
        min-h-[calc(100vh-5rem)]
        bg-slate-50
        px-4
        py-8
        text-slate-900
        transition-colors
        duration-300
        dark:bg-slate-950
        dark:text-white
        sm:px-6
        lg:px-8
      "
    >
      <div className="mx-auto max-w-6xl">

        {/* HEADER */}

        <header className="mx-auto mb-8 max-w-3xl text-center">

          <div
            className="
              mx-auto
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-2xl
              bg-gradient-to-br
              from-cyan-500
              to-blue-600
              shadow-lg
              shadow-cyan-500/20
            "
          >
            <FaLayerGroup className="text-2xl text-white" />
          </div>

          <p
            className="
              mb-2
              text-sm
              font-semibold
              uppercase
              tracking-[0.2em]
              text-cyan-600
              dark:text-cyan-400
            "
          >
            Resume Comparison
          </p>

          <h1
            className="
              text-3xl
              font-bold
              tracking-tight
              text-slate-900
              dark:text-white
              sm:text-4xl
            "
          >
            Compare two resumes side by side
          </h1>

          <p
            className="
              mt-3
              text-sm
              leading-6
              text-slate-600
              dark:text-slate-400
              sm:text-base
            "
          >
            Identify ATS score differences, shared skills,
            unique strengths, and areas that need improvement.
          </p>

        </header>

        {/* UPLOAD CONTAINER */}

        <section
          className="
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-xl
            transition-colors
            duration-300
            dark:border-slate-800
            dark:bg-slate-900
            sm:p-7
          "
        >

          <div
            className="
              grid
              items-stretch
              gap-5
              lg:grid-cols-[1fr_auto_1fr]
            "
          >

            <UploadCard
              title="Resume 1"
              subtitle="First candidate"
              file={resume1}
              onChange={onResume1}
              tone="cyan"
            />

            {/* VS */}

            <div className="hidden items-center justify-center lg:flex">
              <span
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-300
                  bg-slate-100
                  text-xs
                  font-bold
                  text-slate-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-slate-400
                "
              >
                VS
              </span>
            </div>

            <div className="flex justify-center lg:hidden">
              <span
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-slate-300
                  bg-slate-100
                  text-xs
                  font-bold
                  text-slate-500
                  dark:border-slate-700
                  dark:bg-slate-950
                  dark:text-slate-400
                "
              >
                VS
              </span>
            </div>

            <UploadCard
              title="Resume 2"
              subtitle="Second candidate"
              file={resume2}
              onChange={onResume2}
              tone="blue"
            />

          </div>

          {/* BUTTON */}

          <div
            className="
              mt-8
              border-t
              border-slate-200
              pt-7
              text-center
              dark:border-slate-800
            "
          >

            <button
              type="button"
              onClick={onCompare}
              disabled={
                !resume1 ||
                !resume2 ||
                loading
              }
              className="
                inline-flex
                min-w-[230px]
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-7
                py-3.5
                font-semibold
                text-white
                shadow-lg
                shadow-blue-500/20
                transition
                hover:-translate-y-0.5
                hover:shadow-blue-500/30
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              {loading ? (
                <>
                  <span
                    className="
                      h-5
                      w-5
                      animate-spin
                      rounded-full
                      border-2
                      border-white
                      border-t-transparent
                    "
                  />

                  Comparing...
                </>
              ) : (
                <>
                  Compare Resumes
                  <FaArrowRight />
                </>
              )}

            </button>

            <p
              className="
                mt-3
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              {resume1 && resume2
                ? "Both resumes are ready for comparison."
                : "Upload both PDF resumes to start the comparison."}
            </p>

          </div>

        </section>

      </div>
    </div>
  );
}

/* =========================================================
   UPLOAD CARD
========================================================= */

function UploadCard({
  title,
  subtitle,
  file,
  onChange,
  tone,
}) {
  const cyan = tone === "cyan";

  return (
    <div
      className={`
        rounded-2xl
        border
        p-5
        ${
          cyan
            ? "border-cyan-200 bg-cyan-50 dark:border-cyan-500/20 dark:bg-cyan-950/10"
            : "border-blue-200 bg-blue-50 dark:border-blue-500/20 dark:bg-blue-950/10"
        }
      `}
    >

      <div className="mb-4 flex items-start justify-between gap-4">

        <div>

          <h2
            className={`
              font-semibold
              ${
                cyan
                  ? "text-cyan-700 dark:text-cyan-400"
                  : "text-blue-700 dark:text-blue-400"
              }
            `}
          >
            {title}
          </h2>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            {subtitle}
          </p>

        </div>

        <span
          className="
            rounded-full
            border
            border-slate-200
            bg-slate-100
            px-3
            py-1
            text-[11px]
            font-semibold
            text-slate-500
            dark:border-slate-700
            dark:bg-slate-950
            dark:text-slate-400
          "
        >
          PDF
        </span>

      </div>

      <label
        className={`
          group
          flex
          min-h-[235px]
          cursor-pointer
          flex-col
          items-center
          justify-center
          rounded-2xl
          border-2
          border-dashed
          p-6
          text-center
          transition
          ${
            cyan
              ? "border-cyan-300 bg-cyan-50 hover:border-cyan-500 dark:border-cyan-500/30 dark:bg-slate-950/60 dark:hover:border-cyan-400"
              : "border-blue-300 bg-blue-50 hover:border-blue-500 dark:border-blue-500/30 dark:bg-slate-950/60 dark:hover:border-blue-400"
          }
        `}
      >

        <input
          type="file"
          accept=".pdf,application/pdf"
          onChange={onChange}
          className="hidden"
        />

        <div
          className={`
            mb-4
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            ${
              cyan
                ? "bg-cyan-100 dark:bg-cyan-500/10"
                : "bg-blue-100 dark:bg-blue-500/10"
            }
          `}
        >
          {file ? (
            <FaFilePdf
              className={`
                text-3xl
                ${
                  cyan
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-blue-600 dark:text-blue-400"
                }
              `}
            />
          ) : (
            <FaCloudUploadAlt
              className={`
                text-3xl
                ${
                  cyan
                    ? "text-cyan-600 dark:text-cyan-400"
                    : "text-blue-600 dark:text-blue-400"
                }
              `}
            />
          )}
        </div>

        {file ? (
          <>
            <p
              className="
                max-w-full
                truncate
                text-sm
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              {file.name}
            </p>

            <p
              className="
                mt-2
                text-xs
                font-medium
                text-emerald-600
                dark:text-emerald-400
              "
            >
              PDF selected
            </p>

            <p
              className="
                mt-3
                text-xs
                text-slate-500
              "
            >
              Click to replace
            </p>
          </>
        ) : (
          <>
            <p
              className="
                text-lg
                font-semibold
                text-slate-900
                dark:text-white
              "
            >
              Upload Resume
            </p>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
                dark:text-slate-400
              "
            >
              Click to select a PDF file
            </p>

            <span
              className="
                mt-4
                rounded-full
                border
                border-slate-200
                bg-slate-100
                px-3
                py-1
                text-xs
                text-slate-500
                dark:border-slate-700
                dark:bg-slate-900
              "
            >
              PDF only
            </span>
          </>
        )}

      </label>
    </div>
  );
}

/* =========================================================
   COMPARISON RESULT
========================================================= */

function ComparisonResult({
  firstResume,
  secondResume,
  score1,
  score2,
  scoreDifference,
  matchedSkills,
  uniqueSkills1,
  uniqueSkills2,
  skillsMatch,
  experienceMatch,
  educationMatch,
  contentMatch,
  winner,
  recommendation,
  onBack,
  onNewComparison,
}) {
  return (
    <div
      className="
        min-h-[calc(100vh-5rem)]
        bg-slate-50
        px-4
        py-6
        text-slate-900
        transition-colors
        duration-300
        dark:bg-slate-950
        dark:text-white
        sm:px-6
        lg:px-8
      "
    >

      <div className="mx-auto max-w-7xl">

        {/* TOP BUTTONS */}

        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

          <button
            type="button"
            onClick={onBack}
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-slate-700
              shadow-sm
              transition
              hover:border-cyan-500
              hover:text-cyan-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:text-cyan-400
            "
          >
            <FaArrowLeft />
            Back to Compare
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="
              rounded-xl
              border
              border-slate-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-semibold
              text-slate-700
              shadow-sm
              transition
              hover:border-cyan-500
              hover:text-cyan-600
              dark:border-slate-700
              dark:bg-slate-900
              dark:text-slate-300
              dark:hover:text-cyan-400
            "
          >
            Print / Save Report
          </button>

        </div>

        {/* HEADER CARD */}

        <section
          className="
            mb-6
            overflow-hidden
            rounded-3xl
            border
            border-slate-200
            bg-white
            shadow-xl
            dark:border-slate-800
            dark:bg-slate-900
          "
        >

          <div
            className="
              bg-gradient-to-r
              from-cyan-50
              via-blue-50
              to-transparent
              p-6
              dark:from-cyan-600/20
              dark:via-blue-600/10
              dark:to-transparent
              sm:p-8
            "
          >

            <div
              className="
                flex
                flex-col
                gap-6
                md:flex-row
                md:items-center
                md:justify-between
              "
            >

              <div className="flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-100
                    ring-1
                    ring-emerald-200
                    dark:bg-emerald-500/10
                    dark:ring-emerald-400/20
                  "
                >
                  <FaCheckCircle
                    className="
                      text-3xl
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  />
                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-semibold
                      uppercase
                      tracking-[0.18em]
                      text-emerald-600
                      dark:text-emerald-400
                    "
                  >
                    Comparison complete
                  </p>

                  <h1
                    className="
                      mt-1
                      text-2xl
                      font-bold
                      text-slate-900
                      dark:text-white
                      sm:text-3xl
                    "
                  >
                    Resume Comparison Report
                  </h1>

                  <p
                    className="
                      mt-2
                      text-sm
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    A side-by-side view of ATS performance,
                    skills and key differences.
                  </p>

                </div>

              </div>

              <div
                className="
                  rounded-2xl
                  border
                  border-slate-200
                  bg-slate-50
                  px-6
                  py-4
                  text-center
                  dark:border-slate-700
                  dark:bg-slate-950/70
                "
              >

                <p
                  className="
                    text-xs
                    font-medium
                    text-slate-500
                  "
                >
                  ATS score gap
                </p>

                <p
                  className="
                    mt-1
                    text-3xl
                    font-bold
                    text-cyan-600
                    dark:text-cyan-400
                  "
                >
                  {scoreDifference}%
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* SCORE PANELS */}

        <section
          className="
            grid
            gap-5
            lg:grid-cols-[1fr_auto_1fr]
          "
        >

          <ScorePanel
            label="Resume 1"
            name={
              firstResume.fileName ||
              firstResume.name ||
              "Resume 1"
            }
            score={score1}
            tone="cyan"
            winner={winner === "Resume 1"}
          />

          <div className="hidden items-center justify-center lg:flex">
            <div
              className="
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-full
                border
                border-slate-300
                bg-white
                text-xs
                font-bold
                text-slate-500
                shadow-lg
                dark:border-slate-700
                dark:bg-slate-950
                dark:text-slate-400
              "
            >
              VS
            </div>
          </div>

          <ScorePanel
            label="Resume 2"
            name={
              secondResume.fileName ||
              secondResume.name ||
              "Resume 2"
            }
            score={score2}
            tone="blue"
            winner={winner === "Resume 2"}
          />

        </section>

        {/* METRICS */}

        <section
          className="
            mt-6
            grid
            gap-5
            sm:grid-cols-2
            xl:grid-cols-4
          "
        >

          <MetricCard
            icon={<FaStar />}
            title="Skills Match"
            value={`${skillsMatch}%`}
            progress={skillsMatch}
            tone="cyan"
          />

          <MetricCard
            icon={<FaBriefcase />}
            title="Experience Match"
            value={`${clamp(experienceMatch)}%`}
            progress={experienceMatch}
            tone="amber"
          />

          <MetricCard
            icon={<FaGraduationCap />}
            title="Education Match"
            value={`${clamp(educationMatch)}%`}
            progress={educationMatch}
            tone="blue"
          />

          <MetricCard
            icon={<FaChartBar />}
            title="Content Match"
            value={`${clamp(contentMatch)}%`}
            progress={contentMatch}
            tone="purple"
          />

        </section>

        {/* SKILL COMPARISON */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-slate-200
            bg-white
            p-5
            shadow-xl
            dark:border-slate-800
            dark:bg-slate-900
            sm:p-7
          "
        >

          <div className="mb-6 flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                bg-cyan-100
                text-cyan-600
                dark:bg-cyan-500/10
                dark:text-cyan-400
              "
            >
              <FaLayerGroup />
            </div>

            <div>

              <h2
                className="
                  text-xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                Skill Comparison
              </h2>

              <p
                className="
                  text-sm
                  text-slate-500
                  dark:text-slate-400
                "
              >
                See what the resumes share and where they differ.
              </p>

            </div>

          </div>

          <div className="grid gap-5 lg:grid-cols-3">

            <SkillGroup
              title="Shared Skills"
              count={matchedSkills.length}
              skills={matchedSkills}
              tone="green"
              empty="No common skills detected."
            />

            <SkillGroup
              title="Resume 1 Only"
              count={uniqueSkills1.length}
              skills={uniqueSkills1}
              tone="cyan"
              empty="No unique skills detected."
            />

            <SkillGroup
              title="Resume 2 Only"
              count={uniqueSkills2.length}
              skills={uniqueSkills2}
              tone="blue"
              empty="No unique skills detected."
            />

          </div>

        </section>

        {/* BREAKDOWN + WINNER */}

        <section
          className="
            mt-6
            grid
            gap-5
            lg:grid-cols-[1.2fr_0.8fr]
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-slate-200
              bg-white
              p-6
              shadow-xl
              dark:border-slate-800
              dark:bg-slate-900
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-blue-100
                  text-blue-600
                  dark:bg-blue-500/10
                  dark:text-blue-400
                "
              >
                <FaChartBar />
              </div>

              <div>

                <h2
                  className="
                    text-xl
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  Detailed Breakdown
                </h2>

                <p
                  className="
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  Comparison metrics at a glance.
                </p>

              </div>

            </div>

            <div className="space-y-6">

              <Breakdown
                title="Skills Match"
                value={skillsMatch}
                tone="cyan"
              />

              <Breakdown
                title="Experience Match"
                value={experienceMatch}
                tone="amber"
              />

              <Breakdown
                title="Education Match"
                value={educationMatch}
                tone="blue"
              />

              <Breakdown
                title="Content Match"
                value={contentMatch}
                tone="purple"
              />

            </div>

          </div>

          {/* WINNER */}

          <div
            className="
              rounded-3xl
              border
              border-amber-200
              bg-gradient-to-br
              from-amber-50
              to-white
              p-6
              shadow-xl
              dark:border-amber-500/20
              dark:from-amber-500/10
              dark:to-slate-900
            "
          >

            <div
              className="
                flex
                h-full
                flex-col
                items-center
                justify-center
                text-center
              "
            >

              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-amber-100
                  dark:bg-amber-500/10
                "
              >
                <FaTrophy
                  className="
                    text-3xl
                    text-amber-600
                    dark:text-amber-400
                  "
                />
              </div>

              <p
                className="
                  mt-5
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-amber-600
                  dark:text-amber-400
                "
              >
                Overall result
              </p>

              <h2
                className="
                  mt-2
                  text-3xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                {winner === "Tie"
                  ? "It's a Tie"
                  : `${winner} Wins`}
              </h2>

              <p
                className="
                  mt-3
                  max-w-sm
                  text-sm
                  leading-6
                  text-slate-600
                  dark:text-slate-400
                "
              >
                {winner === "Tie"
                  ? "Both resumes have the same ATS score. Use the job requirements to decide which version is more suitable."
                  : `${winner} has the higher ATS score by ${scoreDifference} percentage point${
                      scoreDifference === 1
                        ? ""
                        : "s"
                    }.`}
              </p>

            </div>

          </div>

        </section>

        {/* RECOMMENDATION */}

        <section
          className="
            mt-6
            rounded-3xl
            border
            border-purple-200
            bg-gradient-to-r
            from-purple-50
            to-white
            p-6
            shadow-xl
            dark:border-purple-500/20
            dark:from-purple-500/10
            dark:to-slate-900
            sm:p-7
          "
        >

          <div className="flex items-start gap-4">

            <div
              className="
                flex
                h-12
                w-12
                shrink-0
                items-center
                justify-center
                rounded-xl
                bg-purple-100
                text-purple-600
                dark:bg-purple-500/10
                dark:text-purple-400
              "
            >
              <FaLightbulb className="text-xl" />
            </div>

            <div>

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-purple-600
                  dark:text-purple-400
                "
              >
                Recommendation
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-bold
                  text-slate-900
                  dark:text-white
                "
              >
                What should you use?
              </h2>

              <p
                className="
                  mt-3
                  leading-7
                  text-slate-700
                  dark:text-slate-300
                "
              >
                {recommendation}
              </p>

            </div>

          </div>

        </section>

        {/* NEW COMPARISON */}

        <div className="flex justify-center py-8">

          <button
            type="button"
            onClick={onNewComparison}
            className="
              inline-flex
              items-center
              gap-3
              rounded-xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              px-7
              py-3.5
              font-semibold
              text-white
              shadow-lg
              shadow-blue-500/20
              transition
              hover:-translate-y-0.5
            "
          >
            <FaSyncAlt />
            Compare Another Resume
          </button>

        </div>

      </div>
    </div>
  );
}

/* =========================================================
   SCORE PANEL
========================================================= */

function ScorePanel({
  label,
  name,
  score,
  tone,
  winner,
}) {
  const cyan = tone === "cyan";

  const accent = cyan
    ? "text-cyan-600 dark:text-cyan-400"
    : "text-blue-600 dark:text-blue-400";

  const border = cyan
    ? "border-cyan-200 dark:border-cyan-500/20"
    : "border-blue-200 dark:border-blue-500/20";

  const background = cyan
    ? "from-cyan-50 dark:from-cyan-950/30"
    : "from-blue-50 dark:from-blue-950/30";

  const bar = cyan
    ? "from-cyan-400 to-blue-500"
    : "from-blue-400 to-indigo-500";

  return (
    <div
      className={`
        rounded-3xl
        border
        ${border}
        bg-gradient-to-br
        ${background}
        to-white
        p-6
        shadow-xl
        dark:to-slate-900
      `}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex min-w-0 items-center gap-4">

          <div
            className="
              flex
              h-12
              w-12
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-slate-100
              dark:bg-slate-950
            "
          >
            <FaFilePdf
              className={`text-2xl ${accent}`}
            />
          </div>

          <div className="min-w-0">

            <p
              className={`
                text-sm
                font-semibold
                ${accent}
              `}
            >
              {label}
            </p>

            <h2
              className="
                mt-1
                truncate
                font-bold
                text-slate-900
                dark:text-white
              "
            >
              {name}
            </h2>

          </div>

        </div>

        {winner && (
          <span
            className="
              shrink-0
              rounded-full
              bg-amber-100
              px-3
              py-1
              text-xs
              font-bold
              text-amber-700
              dark:bg-amber-500/10
              dark:text-amber-400
            "
          >
            Higher
          </span>
        )}

      </div>

      <div
        className="
          my-6
          border-t
          border-slate-200
          dark:border-slate-800
        "
      />

      <div className="text-center">

        <p
          className="
            text-sm
            text-slate-500
            dark:text-slate-400
          "
        >
          ATS Score
        </p>

        <p
          className={`
            mt-1
            text-5xl
            font-extrabold
            ${accent}
          `}
        >
          {score}%
        </p>

        <p
          className="
            mt-2
            text-xs
            text-slate-500
            dark:text-slate-400
          "
        >
          {score >= 85
            ? "Strong ATS readiness"
            : score >= 70
            ? "Good ATS readiness"
            : "Needs improvement"}
        </p>

      </div>

      <div
        className="
          mt-6
          h-2
          overflow-hidden
          rounded-full
          bg-slate-200
          dark:bg-slate-800
        "
      >
        <div
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${bar}
          `}
          style={{
            width: `${clamp(score)}%`,
          }}
        />
      </div>

    </div>
  );
}

/* =========================================================
   METRIC CARD
========================================================= */

function MetricCard({
  icon,
  title,
  value,
  progress,
  tone,
}) {
  const tones = {
    cyan:
      "bg-cyan-100 text-cyan-600 dark:bg-cyan-500/10 dark:text-cyan-400",

    amber:
      "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",

    blue:
      "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",

    purple:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  };

  const bars = {
    cyan: "from-cyan-400 to-blue-500",
    amber: "from-amber-400 to-orange-500",
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-pink-500",
  };

  return (
    <div
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-lg
        dark:border-slate-800
        dark:bg-slate-900
      "
    >

      <div className="flex items-center gap-3">

        <div
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-xl
            ${tones[tone]}
          `}
        >
          {icon}
        </div>

        <div>

          <p
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {title}
          </p>

          <p
            className="
              mt-1
              text-2xl
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {value}
          </p>

        </div>

      </div>

      <div
        className="
          mt-5
          h-1.5
          overflow-hidden
          rounded-full
          bg-slate-200
          dark:bg-slate-800
        "
      >
        <div
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${bars[tone]}
          `}
          style={{
            width: `${clamp(progress)}%`,
          }}
        />
      </div>

    </div>
  );
}

/* =========================================================
   SKILL GROUP
========================================================= */

function SkillGroup({
  title,
  count,
  skills,
  tone,
  empty,
}) {
  const styles = {
    green: {
      border:
        "border-emerald-200 dark:border-emerald-500/20",
      bg:
        "bg-emerald-50 dark:bg-emerald-500/5",
      text:
        "text-emerald-700 dark:text-emerald-400",
      pill:
        "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-500/20 dark:bg-emerald-500/5 dark:text-emerald-300",
    },

    cyan: {
      border:
        "border-cyan-200 dark:border-cyan-500/20",
      bg:
        "bg-cyan-50 dark:bg-cyan-500/5",
      text:
        "text-cyan-700 dark:text-cyan-400",
      pill:
        "border-cyan-200 bg-cyan-50 text-cyan-700 dark:border-cyan-500/20 dark:bg-cyan-500/5 dark:text-cyan-300",
    },

    blue: {
      border:
        "border-blue-200 dark:border-blue-500/20",
      bg:
        "bg-blue-50 dark:bg-blue-500/5",
      text:
        "text-blue-700 dark:text-blue-400",
      pill:
        "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/5 dark:text-blue-300",
    },
  };

  const style = styles[tone];

  return (
    <div
      className={`
        rounded-2xl
        border
        ${style.border}
        ${style.bg}
        p-5
      `}
    >

      <div className="flex items-center justify-between gap-3">

        <div>

          <h3
            className={`
              font-semibold
              ${style.text}
            `}
          >
            {title}
          </h3>

          <p
            className="
              mt-1
              text-xs
              text-slate-500
              dark:text-slate-400
            "
          >
            Skills identified in the comparison
          </p>

        </div>

        <span
          className="
            rounded-lg
            bg-slate-100
            px-3
            py-1
            text-xs
            font-bold
            text-slate-600
            dark:bg-slate-950
            dark:text-slate-300
          "
        >
          {count}
        </span>

      </div>

      <div
        className="
          mt-5
          flex
          min-h-[110px]
          flex-wrap
          content-start
          gap-2
        "
      >

        {skills.length ? (
          skills.map((skill, index) => (
            <span
              key={`${skill}-${index}`}
              className={`
                rounded-full
                border
                px-3
                py-1.5
                text-xs
                font-medium
                ${style.pill}
              `}
            >
              {skill}
            </span>
          ))
        ) : (
          <p
            className="
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            {empty}
          </p>
        )}

      </div>

    </div>
  );
}

/* =========================================================
   BREAKDOWN
========================================================= */

function Breakdown({
  title,
  value,
  tone,
}) {
  const safe = clamp(value);

  const bars = {
    cyan: "from-cyan-400 to-blue-500",
    amber: "from-amber-400 to-orange-500",
    blue: "from-blue-400 to-indigo-500",
    purple: "from-purple-400 to-pink-500",
  };

  return (
    <div>

      <div
        className="
          mb-2
          flex
          items-center
          justify-between
          gap-4
        "
      >

        <span
          className="
            text-sm
            font-medium
            text-slate-700
            dark:text-slate-300
          "
        >
          {title}
        </span>

        <span
          className="
            text-sm
            font-bold
            text-slate-900
            dark:text-white
          "
        >
          {safe}%
        </span>

      </div>

      <div
        className="
          h-2
          overflow-hidden
          rounded-full
          bg-slate-200
          dark:bg-slate-800
        "
      >

        <div
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${bars[tone]}
          `}
          style={{
            width: `${safe}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   CLAMP
========================================================= */

function clamp(value) {
  return Math.min(
    100,
    Math.max(0, Number(value) || 0)
  );
}