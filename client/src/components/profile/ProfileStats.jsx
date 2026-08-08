import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import {
  HiOutlineDocumentText,
  HiOutlineChartBar,
  HiOutlineSparkles,
  HiOutlineTrophy,
  HiArrowTrendingUp,
} from "react-icons/hi2";

import { getProfile } from "../../services/profileService";
import { API_URL } from "../../config";

export default function ProfileStats() {
  const [stats, setStats] = useState([
    {
      title: "Total Resumes",
      value: "0",
      subtitle: "Uploaded",
      icon: HiOutlineDocumentText,
      gradient: "from-blue-500 to-cyan-500",
      trend: "0",
    },
    {
      title: "Highest ATS",
      value: "0%",
      subtitle: "Best Resume",
      icon: HiOutlineTrophy,
      gradient: "from-emerald-500 to-green-600",
      trend: "0%",
    },
    {
      title: "Average ATS",
      value: "0%",
      subtitle: "Overall Score",
      icon: HiOutlineChartBar,
      gradient: "from-orange-500 to-red-500",
      trend: "0%",
    },
    {
      title: "AI Analysis",
      value: "0",
      subtitle: "Completed",
      icon: HiOutlineSparkles,
      gradient: "from-violet-500 to-fuchsia-500",
      trend: "0",
    },
  ]);

  useEffect(() => {
    loadProfileStats();
  }, []);

  const loadProfileStats = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("No authentication token found.");
        return;
      }

      /* ==========================================
         PROFILE DATA
      ========================================== */

      const profileResponse = await getProfile();

      const user = profileResponse?.user || {};

      /* ==========================================
         RESUME HISTORY
      ========================================== */

      const historyResponse = await axios.get(
        `${API_URL}/history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resumes = historyResponse?.data?.resumes || [];

      /* ==========================================
         TOTAL RESUMES
      ========================================== */

      const totalResumes = resumes.length;

      /* ==========================================
         GET VALID ATS SCORES
      ========================================== */

      const scores = resumes
        .map((resume) => Number(resume?.score))
        .filter(
          (score) =>
            Number.isFinite(score) &&
            score >= 0 &&
            score <= 100
        );

      /* ==========================================
         HIGHEST ATS
      ========================================== */

      const highestATS =
        scores.length > 0
          ? Math.max(...scores)
          : 0;

      /* ==========================================
         AVERAGE ATS
      ========================================== */

      const averageATS =
        scores.length > 0
          ? Math.round(
              scores.reduce(
                (total, score) => total + score,
                0
              ) / scores.length
            )
          : 0;

      /* ==========================================
         AI ANALYSIS
         
         Keep using the value returned by profile
         because AI analysis count is separate from
         resume score calculation.
      ========================================== */

      const totalChats = Number(user?.totalChats) || 0;

      /* ==========================================
         UPDATE STATS
      ========================================== */

      setStats([
        {
          title: "Total Resumes",
          value: totalResumes,
          subtitle: "Uploaded",
          icon: HiOutlineDocumentText,
          gradient: "from-blue-500 to-cyan-500",
          trend: `${totalResumes}`,
        },

        {
          title: "Highest ATS",
          value: `${highestATS}%`,
          subtitle: "Best Resume",
          icon: HiOutlineTrophy,
          gradient: "from-emerald-500 to-green-600",
          trend: `${highestATS}%`,
        },

        {
          title: "Average ATS",
          value: `${averageATS}%`,
          subtitle: "Overall Score",
          icon: HiOutlineChartBar,
          gradient: "from-orange-500 to-red-500",
          trend: `${averageATS}%`,
        },

        {
          title: "AI Analysis",
          value: totalChats,
          subtitle: "Completed",
          icon: HiOutlineSparkles,
          gradient: "from-violet-500 to-fuchsia-500",
          trend: `${totalChats}`,
        },
      ]);
    } catch (error) {
      console.error(
        "Profile Stats Error:",
        error?.response?.data || error
      );
    }
  };

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={item.title}
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.4,
              delay: index * 0.08,
            }}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            className="
              group
              relative
              overflow-hidden
              rounded-3xl
              border
              border-slate-200
              dark:border-slate-700
              bg-white
              dark:bg-slate-900
              p-7
              shadow-lg
              hover:shadow-2xl
              transition-all
              duration-300
            "
          >
            {/* Background Glow */}

            <div
              className="
                absolute
                -right-8
                -top-8
                h-32
                w-32
                rounded-full
                bg-slate-100
                dark:bg-slate-800
                blur-3xl
                opacity-60
                group-hover:scale-125
                transition-all
                duration-500
              "
            ></div>

            {/* Content */}

            <div className="relative flex items-start justify-between">
              <div>
                <p
                  className="
                    text-sm
                    font-medium
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {item.title}
                </p>

                <h2
                  className="
                    mt-4
                    text-4xl
                    font-bold
                    text-slate-900
                    dark:text-white
                  "
                >
                  {item.value}
                </h2>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-500
                    dark:text-slate-400
                  "
                >
                  {item.subtitle}
                </p>

                <div
                  className="
                    mt-5
                    inline-flex
                    items-center
                    gap-2
                    rounded-full
                    bg-green-100
                    dark:bg-green-900/30
                    px-3
                    py-1
                    text-sm
                    font-semibold
                    text-green-700
                    dark:text-green-300
                  "
                >
                  <HiArrowTrendingUp />

                  {item.trend}
                </div>
              </div>

              {/* Icon */}

              <div
                className={`
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  bg-gradient-to-br
                  ${item.gradient}
                  shadow-xl
                  group-hover:scale-110
                  group-hover:rotate-6
                  transition-all
                  duration-300
                `}
              >
                <Icon className="text-3xl text-white" />
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}