import { motion } from "framer-motion";
import {
  HiSparkles,
  HiDocumentDuplicate,
  HiChatBubbleLeftRight,
  HiBriefcase,
  HiClock,
  HiUserCircle,
  HiArrowRight,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function QuickActions() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "AI Resume Analysis",
      description: "Analyze your resume and improve ATS score.",
      icon: HiSparkles,
      iconBg: "bg-cyan-500/15",
      iconColor: "text-cyan-400",
      badge: "Popular",
      badgeColor: "bg-cyan-500/20 text-cyan-300",
      path: "/upload",
    },
    {
      title: "Compare Resume",
      description: "Compare multiple resumes instantly.",
      icon: HiDocumentDuplicate,
      iconBg: "bg-orange-500/15",
      iconColor: "text-orange-400",
      badge: "New",
      badgeColor: "bg-orange-500/20 text-orange-300",
      path: "/compare",
    },
    {
      title: "Resume Chat",
      description: "Ask AI questions about your resume.",
      icon: HiChatBubbleLeftRight,
      iconBg: "bg-purple-500/15",
      iconColor: "text-purple-400",
      badge: "AI",
      badgeColor: "bg-purple-500/20 text-purple-300",
      path: "/chat",
    },
    {
      title: "Job Matcher",
      description: "Find jobs matching your skills and profile.",
      icon: HiBriefcase,
      iconBg: "bg-emerald-500/15",
      iconColor: "text-emerald-400",
      badge: "Smart",
      badgeColor: "bg-emerald-500/20 text-emerald-300",
      path: "/jd-matcher",
    },
    {
      title: "Resume History",
      description: "View and manage your analyzed resumes.",
      icon: HiClock,
      iconBg: "bg-blue-500/15",
      iconColor: "text-blue-400",
      badge: "Files",
      badgeColor: "bg-blue-500/20 text-blue-300",
      path: "/history",
    },
    {
      title: "Edit Profile",
      description: "Update your profile and career information.",
      icon: HiUserCircle,
      iconBg: "bg-pink-500/15",
      iconColor: "text-pink-400",
      badge: "Profile",
      badgeColor: "bg-pink-500/20 text-pink-300",
      path: "/profile",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex h-full flex-col rounded-3xl border border-slate-700/70 bg-slate-900/80 p-5 shadow-xl backdrop-blur-sm sm:p-6"
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI tools for your resume
          </p>
        </div>

        <span className="rounded-full bg-blue-500/15 px-4 py-2 text-sm font-semibold text-blue-300">
          6 Tools
        </span>
      </div>

      {/* Actions */}
      <div className="grid flex-1 grid-cols-1 gap-4 sm:grid-cols-2">
        {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.button
              key={action.title}
              type="button"
              onClick={() => navigate(action.path)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.35,
                delay: index * 0.08,
              }}
              whileHover={{
                y: -3,
                scale: 1.01,
              }}
              whileTap={{
                scale: 0.98,
              }}
              className="group flex min-h-[145px] flex-col justify-between rounded-2xl border border-slate-700 bg-slate-800/70 p-4 text-left transition-all duration-300 hover:border-cyan-400/70 hover:bg-slate-800 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              {/* Top */}
              <div className="flex items-start justify-between gap-3">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${action.iconBg}`}
                >
                  <Icon className={`text-2xl ${action.iconColor}`} />
                </div>

                <span
                  className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${action.badgeColor}`}
                >
                  {action.badge}
                </span>
              </div>

              {/* Content */}
              <div className="mt-4">
                <h3 className="text-base font-bold text-white">
                  {action.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-400">
                  {action.description}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs font-semibold text-cyan-400 transition-colors group-hover:text-cyan-300">
                  Open Tool
                </span>

                <HiArrowRight className="text-lg text-cyan-400 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

export default QuickActions;