import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlinePencilSquare,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRight,
} from "react-icons/hi2";

const actions = [
  {
    title: "Edit Profile",
    description: "Update your personal information and profile photo.",
    icon: HiOutlinePencilSquare,
    link: "/profile/edit",
    color: "from-cyan-500 to-blue-600",
  },
  {
    title: "Resume History",
    description: "View all previously analyzed resumes.",
    icon: HiOutlineClock,
    link: "/history",
    color: "from-emerald-500 to-green-600",
  },
  {
    title: "Settings",
    description: "Manage notifications, appearance and security.",
    icon: HiOutlineCog6Tooth,
    link: "/settings",
    color: "from-amber-500 to-orange-600",
  },
  {
    title: "Logout",
    description: "Securely sign out from your account.",
    icon: HiOutlineArrowLeftOnRectangle,
    link: "/login",
    color: "from-pink-500 to-rose-600",
  },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Frequently used account shortcuts
          </p>
        </div>

        <div className="rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300">
          {actions.length} Actions
        </div>
      </div>

      {/* Action List */}
      <div className="space-y-4">
                {actions.map((action, index) => {
          const Icon = action.icon;

          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                x: 6,
              }}
            >
              <Link
                to={action.link}
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-slate-200
                  dark:border-slate-700
                  bg-slate-50
                  dark:bg-slate-800
                  p-5
                  transition-all
                  duration-300
                  hover:border-blue-500
                  hover:bg-white
                  dark:hover:bg-slate-700
                  hover:shadow-xl
                "
              >
                {/* Left */}

                <div className="flex items-center gap-5">

                  <div
                    className={`
                      flex
                      h-14
                      w-14
                      items-center
                      justify-center
                      rounded-2xl
                      bg-gradient-to-br
                      ${action.color}
                      shadow-lg
                      transition-transform
                      duration-300
                      group-hover:scale-110
                    `}
                  >
                    <Icon className="text-2xl text-white" />
                  </div>

                  <div>

                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {action.title}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {action.description}
                    </p>

                  </div>

                </div>

                {/* Right */}

                <div className="flex items-center gap-2 text-blue-600 font-semibold transition-all duration-300 group-hover:translate-x-2">

                  <span className="hidden sm:block">
                    Open
                  </span>

                  <HiOutlineArrowRight className="text-xl" />

                </div>

              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}