import { motion } from "framer-motion";
import {
  HiArrowUpTray,
  HiSparkles,
  HiClock,
  HiDocumentText,
} from "react-icons/hi2";

import useDashboard from "../../hooks/useDashboard";

/* =========================================
   FORMAT ACTIVITY TIME
========================================= */

function formatTime(date) {
  if (!date) {
    return "";
  }

  const activityDate = new Date(date);

  if (Number.isNaN(activityDate.getTime())) {
    return "";
  }

  const now = new Date();

  const diff = now.getTime() - activityDate.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) {
    return "Just now";
  }

  if (minutes < 60) {
    return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  }

  if (hours < 24) {
    return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  }

  if (days === 1) {
    return "Yesterday";
  }

  if (days < 7) {
    return `${days} days ago`;
  }

  return activityDate.toLocaleDateString();
}

/* =========================================
   ACTIVITY ICON
========================================= */

function getActivityIcon(type) {
  switch (type) {
    case "upload":
      return HiArrowUpTray;

    case "analysis":
      return HiSparkles;

    default:
      return HiDocumentText;
  }
}

/* =========================================
   ACTIVITY COLOR
========================================= */

function getActivityColor(type) {
  switch (type) {
    case "upload":
      return "bg-blue-500";

    case "analysis":
      return "bg-purple-500";

    default:
      return "bg-emerald-500";
  }
}

/* =========================================
   ACTIVITY TIMELINE
========================================= */

export default function ActivityTimeline() {
  const {
    activities = [],
    loading,
  } = useDashboard();

  // Show only the 4 most recent activities
  const visibleActivities = activities.slice(0, 4);

  return (
    <motion.div
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
      }}
      className="
        w-full
        overflow-hidden
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-4
        shadow-sm
        sm:p-6
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      {/* =====================================
          HEADER
      ====================================== */}

      <div
        className="
          mb-5
          flex
          items-start
          justify-between
          gap-4
        "
      >
        <div className="min-w-0">
          <h2
            className="
              text-xl
              font-bold
              text-slate-900
              sm:text-2xl
              dark:text-white
            "
          >
            Recent Activity
          </h2>

          <p
            className="
              mt-1
              text-sm
              text-slate-500
              sm:text-base
              dark:text-slate-400
            "
          >
            Your latest AI resume activities
          </p>
        </div>

        {/* Clock */}

        <div
          className="
            flex
            h-10
            w-10
            flex-shrink-0
            items-center
            justify-center
            rounded-2xl
            bg-blue-100
            sm:h-12
            sm:w-12
            dark:bg-blue-900/40
          "
        >
          <HiClock
            className="
              text-xl
              text-blue-600
              sm:text-2xl
              dark:text-blue-400
            "
          />
        </div>
      </div>

      {/* =====================================
          LOADING STATE
      ====================================== */}

      {loading && (
        <div className="space-y-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="
                h-20
                animate-pulse
                rounded-2xl
                bg-slate-100
                dark:bg-slate-800
              "
            />
          ))}
        </div>
      )}

      {/* =====================================
          EMPTY STATE
      ====================================== */}

      {!loading && activities.length === 0 && (
        <div
          className="
            flex
            min-h-[200px]
            flex-col
            items-center
            justify-center
            rounded-2xl
            border
            border-dashed
            border-slate-300
            bg-slate-50
            px-5
            text-center
            dark:border-slate-700
            dark:bg-slate-800/50
          "
        >
          <div
            className="
              mb-4
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-slate-200
              dark:bg-slate-700
            "
          >
            <HiClock
              className="
                text-3xl
                text-slate-400
                dark:text-slate-500
              "
            />
          </div>

          <h3
            className="
              text-lg
              font-semibold
              text-slate-700
              dark:text-slate-200
            "
          >
            No recent activity
          </h3>

          <p
            className="
              mt-1
              max-w-md
              text-sm
              text-slate-500
              dark:text-slate-400
            "
          >
            Your resume activities will appear here after
            you upload and analyze a resume.
          </p>
        </div>
      )}

      {/* =====================================
          ACTIVITIES
      ====================================== */}

      {!loading && visibleActivities.length > 0 && (
        <div className="space-y-4">
          {visibleActivities.map((activity, index) => {
            const Icon = getActivityIcon(activity.type);

            const color = getActivityColor(
              activity.type
            );

            return (
              <motion.div
                key={
                  activity.id ||
                  `${activity.type}-${index}`
                }
                initial={{
                  opacity: 0,
                  x: -20,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                className="
                  flex
                  min-w-0
                  gap-3
                  sm:gap-4
                "
              >
                {/* =================================
                    ICON + CONNECTING LINE
                ================================== */}

                <div
                  className="
                    flex
                    flex-shrink-0
                    flex-col
                    items-center
                  "
                >
                  <div
                    className={`
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-full
                      text-white
                      shadow-md
                      sm:h-12
                      sm:w-12
                      ${color}
                    `}
                  >
                    <Icon
                      className="
                        text-lg
                        sm:text-xl
                      "
                    />
                  </div>

                  {/* Line only between visible activities */}
                  {index !== visibleActivities.length - 1 && (
                    <div
                      className="
                        mt-2
                        h-6
                        w-0.5
                        bg-slate-200
                        dark:bg-slate-700
                      "
                    />
                  )}
                </div>

                {/* =================================
                    ACTIVITY CONTENT
                ================================== */}

                <div
                  className="
                    min-w-0
                    flex-1
                    rounded-2xl
                    bg-slate-50
                    p-3
                    transition
                    duration-200
                    hover:bg-slate-100
                    sm:p-4
                    dark:bg-slate-800
                    dark:hover:bg-slate-700
                  "
                >
                  {/* Title + Time */}

                  <div
                    className="
                      flex
                      flex-col
                      gap-1
                      sm:flex-row
                      sm:items-center
                      sm:justify-between
                      sm:gap-3
                    "
                  >
                    <h3
                      className="
                        break-words
                        font-semibold
                        text-slate-900
                        dark:text-white
                      "
                    >
                      {activity.title}
                    </h3>

                    <span
                      className="
                        flex-shrink-0
                        text-xs
                        text-slate-500
                        dark:text-slate-400
                      "
                    >
                      {formatTime(activity.time)}
                    </span>
                  </div>

                  {/* Description */}

                  <p
                    className="
                      mt-1.5
                      break-words
                      text-sm
                      leading-5
                      text-slate-600
                      dark:text-slate-400
                    "
                  >
                    {activity.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}