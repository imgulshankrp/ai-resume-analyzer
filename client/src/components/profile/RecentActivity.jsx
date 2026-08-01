import { motion } from "framer-motion";
import {
  HiOutlineDocumentArrowUp,
  HiOutlineSparkles,
  HiOutlineDocumentChartBar,
  HiOutlineCheckCircle,
  HiArrowRight,
} from "react-icons/hi2";

const activities = [
  {
    title: "Resume Uploaded",
    description: "Your latest resume was uploaded successfully.",
    time: "2 hours ago",
    icon: HiOutlineDocumentArrowUp,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "AI Analysis Completed",
    description: "Gemini AI analyzed your resume and generated insights.",
    time: "Yesterday",
    icon: HiOutlineSparkles,
    gradient: "from-violet-500 to-fuchsia-500",
  },
  {
    title: "ATS Report Downloaded",
    description: "Downloaded your latest ATS performance report.",
    time: "2 days ago",
    icon: HiOutlineDocumentChartBar,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "Profile Updated",
    description: "Your profile information was updated successfully.",
    time: "Last Week",
    icon: HiOutlineCheckCircle,
    gradient: "from-orange-500 to-red-500",
  },
];

export default function RecentActivity() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-700
        bg-white
        dark:bg-slate-900
        shadow-xl
        p-8
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Track your latest resume activities
          </p>

        </div>

        <div className="rounded-xl bg-blue-100 dark:bg-blue-900/30 px-4 py-2 text-sm font-semibold text-blue-700 dark:text-blue-300">
          {activities.length} Events
        </div>

      </div>

      {/* Timeline */}

      <div className="relative">

        {/* Vertical Line */}

        <div className="absolute left-7 top-0 bottom-0 w-[2px] bg-slate-200 dark:bg-slate-700"></div>

        <div className="space-y-8">

          {activities.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  x: 6,
                }}
                className="relative flex gap-6"
              >
                {/* Icon */}

                <div
                  className={`
                    relative
                    z-10
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-gradient-to-br
                    ${activity.gradient}
                    shadow-lg
                  `}
                >
                  <Icon className="text-2xl text-white" />
                </div>

                {/* Content */}

                <div className="flex-1 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 p-5 transition-all hover:shadow-lg">

                  <div className="flex items-center justify-between">

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {activity.title}
                    </h3>

                    <span className="text-sm text-slate-500 dark:text-slate-400">
                      {activity.time}
                    </span>

                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {activity.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-blue-600 font-semibold">

                    View Details

                    <HiArrowRight />

                  </div>

                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </motion.div>
  );
}