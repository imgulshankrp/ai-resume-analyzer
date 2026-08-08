import { motion } from "framer-motion";
import {
  HiUserCircle,
  HiDocumentText,
  HiChartBar,
  HiFire,
} from "react-icons/hi2";

import useDashboard from "../../hooks/useDashboard";

export default function UserCard() {
  const { stats, loading } = useDashboard();

  // Safely read logged-in user
  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user") || "{}");
  } catch (error) {
    console.error("Failed to read user data:", error);
  }

  const userName = user?.name || "Guest User";

  const totalResumes = Number(stats?.totalResumes ?? 0);
  const bestScore = Number(stats?.bestScore ?? 0);

  const hasActivity = totalResumes > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        h-full
        rounded-3xl
        border border-slate-200
        bg-white
        p-5
        shadow-sm
        transition-all
        duration-300
        hover:shadow-lg
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* =========================
          PROFILE
      ========================== */}

      <div className="flex flex-col items-center text-center">

        {/* Avatar */}

        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            bg-gradient-to-br
            from-blue-500
            to-cyan-500
            shadow-lg
            shadow-blue-500/20
          "
        >
          <HiUserCircle className="text-[56px] text-white" />
        </div>

        {/* Name */}

        <h2
          className="
            mt-4
            max-w-full
            truncate
            px-2
            text-xl
            font-bold
            text-slate-900
            dark:text-white
          "
          title={userName}
        >
          {userName}
        </h2>

        {/* Role */}

        <p
          className="
            mt-1
            text-sm
            font-medium
            text-slate-500
            dark:text-slate-400
          "
        >
          Resume Explorer
        </p>

      </div>


      {/* =========================
          QUICK STATS
      ========================== */}

      <div className="mt-6 space-y-3">

        {/* Total Resumes */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            transition-all
            duration-200
            hover:border-blue-200
            hover:bg-blue-50
            dark:border-slate-700
            dark:bg-slate-800
            dark:hover:border-blue-800
            dark:hover:bg-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-100
                dark:bg-blue-900/40
              "
            >
              <HiDocumentText className="text-lg text-blue-600 dark:text-blue-400" />
            </div>

            <span
              className="
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Total Resumes
            </span>

          </div>

          <strong
            className="
              text-lg
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {loading ? "..." : totalResumes}
          </strong>

        </div>


        {/* Best ATS */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            transition-all
            duration-200
            hover:border-emerald-200
            hover:bg-emerald-50
            dark:border-slate-700
            dark:bg-slate-800
            dark:hover:border-emerald-800
            dark:hover:bg-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-100
                dark:bg-emerald-900/40
              "
            >
              <HiChartBar className="text-lg text-emerald-600 dark:text-emerald-400" />
            </div>

            <span
              className="
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Best ATS
            </span>

          </div>

          <strong
            className="
              text-lg
              font-bold
              text-slate-900
              dark:text-white
            "
          >
            {loading ? "..." : `${bestScore}%`}
          </strong>

        </div>


        {/* Activity */}

        <div
          className="
            flex
            items-center
            justify-between
            rounded-2xl
            border
            border-slate-200
            bg-slate-50
            px-4
            py-3
            dark:border-slate-700
            dark:bg-slate-800
          "
        >
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-orange-100
                dark:bg-orange-900/40
              "
            >
              <HiFire className="text-lg text-orange-600 dark:text-orange-400" />
            </div>

            <span
              className="
                text-sm
                font-medium
                text-slate-700
                dark:text-slate-200
              "
            >
              Activity
            </span>

          </div>

          <div className="flex items-center gap-2">

            <span
              className={`
                h-2.5
                w-2.5
                rounded-full
                ${
                  hasActivity
                    ? "bg-emerald-500"
                    : "bg-slate-400"
                }
              `}
            />

            <strong
              className={`
                text-sm
                font-semibold
                ${
                  hasActivity
                    ? "text-emerald-600 dark:text-emerald-400"
                    : "text-slate-500 dark:text-slate-400"
                }
              `}
            >
              {loading
                ? "Loading"
                : hasActivity
                ? "Active"
                : "No Activity"}
            </strong>

          </div>

        </div>

      </div>


      {/* =========================
          SUMMARY
      ========================== */}

      <div
        className="
          mt-5
          rounded-2xl
          border
          border-blue-100
          bg-gradient-to-r
          from-blue-50
          to-cyan-50
          p-4
          dark:border-blue-900/40
          dark:from-blue-900/20
          dark:to-cyan-900/20
        "
      >

        <p
          className="
            text-xs
            leading-relaxed
            text-blue-700
            dark:text-blue-300
          "
        >
          {loading
            ? "Loading your resume statistics..."
            : totalResumes > 0
            ? `You have analyzed ${totalResumes} resume${
                totalResumes === 1 ? "" : "s"
              } so far${
                bestScore > 0
                  ? `, with a best ATS score of ${bestScore}%.`
                  : "."
              }`
            : "Upload your first resume to start building your analysis history."}
        </p>

      </div>

    </motion.div>
  );
}