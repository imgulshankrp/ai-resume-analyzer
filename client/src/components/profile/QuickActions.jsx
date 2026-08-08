import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HiOutlinePencilSquare,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
  HiOutlineArrowRight,
  HiOutlineCheckCircle,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import { toast } from "react-toastify";

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
];

export default function QuickActions() {
  const navigate = useNavigate();

  /* =========================================
     PROFILE COMPLETION
  ========================================= */

  let user = {};

  try {
    user = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    user = {};
  }

  const profileFields = [
    {
      label: "Full Name",
      value: user.name || user.fullName,
    },
    {
      label: "Email",
      value: user.email,
    },
    {
      label: "Phone Number",
      value: user.phone || user.phoneNumber,
    },
    {
      label: "Location",
      value: user.location,
    },
    {
      label: "Target Role",
      value: user.targetRole || user.role,
    },
    {
      label: "Portfolio",
      value: user.portfolio || user.website,
    },
  ];

  const completedFields = profileFields.filter(
    (field) =>
      field.value &&
      typeof field.value === "string" &&
      field.value.trim().length > 0
  ).length;

  const completionPercentage = Math.round(
    (completedFields / profileFields.length) * 100
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    toast.success("Logged out successfully.");

    navigate("/login", {
      replace: true,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* =========================================
          HEADER
      ========================================= */}

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
          4 Actions
        </div>
      </div>

      {/* =========================================
          ACTION LIST
      ========================================= */}

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
                <div className="flex items-center gap-5">
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} shadow-lg transition-transform duration-300 group-hover:scale-110`}
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

                <div className="flex items-center gap-2 font-semibold text-blue-600 transition-all duration-300 group-hover:translate-x-2">
                  <span className="hidden sm:block">
                    Open
                  </span>

                  <HiOutlineArrowRight className="text-xl" />
                </div>
              </Link>
            </motion.div>
          );
        })}

        {/* =========================================
            LOGOUT
        ========================================= */}

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.35 }}
          whileHover={{ x: 6 }}
        >
          <button
            onClick={handleLogout}
            className="
              group
              w-full
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-red-200
              bg-red-50
              p-5
              transition-all
              duration-300
              hover:bg-red-100
              hover:shadow-xl
              dark:border-red-800
              dark:bg-red-900/20
              dark:hover:bg-red-900/30
            "
          >
            <div className="flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-pink-500 to-red-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
                <HiOutlineArrowLeftOnRectangle className="text-2xl text-white" />
              </div>

              <div className="text-left">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Logout
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Securely sign out from your account.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 font-semibold text-red-600 transition-all duration-300 group-hover:translate-x-2">
              <span className="hidden sm:block">
                Logout
              </span>

              <HiOutlineArrowRight className="text-xl" />
            </div>
          </button>
        </motion.div>
      </div>

      {/* =========================================
          PROFILE COMPLETION CARD
      ========================================= */}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="
          mt-6
          rounded-2xl
          border
          border-blue-200
          bg-gradient-to-br
          from-blue-50
          via-cyan-50
          to-indigo-50
          p-6
          dark:border-blue-900/60
          dark:from-blue-950/40
          dark:via-slate-800
          dark:to-indigo-950/40
        "
      >
        {/* Card Header */}

        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
              <HiOutlineUserCircle className="text-2xl text-white" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Profile Completion
              </h3>

              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                Complete your profile for better ResumeAI results.
              </p>
            </div>
          </div>

          <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-bold text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
            {completionPercentage}%
          </span>
        </div>

        {/* Progress Bar */}

        <div className="mt-5">
          <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${completionPercentage}%`,
              }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-500"
            />
          </div>
        </div>

        {/* Completion Text */}

        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            {completedFields} of {profileFields.length} profile details completed
          </p>

          <Link
            to="/profile/edit"
            className="
              flex
              items-center
              gap-1
              text-sm
              font-bold
              text-blue-600
              transition-all
              hover:translate-x-1
              dark:text-cyan-400
            "
          >
            Complete Profile
            <HiOutlineArrowRight className="text-lg" />
          </Link>
        </div>

        {/* Checklist */}

        <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
          {profileFields.map((field) => {
            const completed =
              field.value &&
              typeof field.value === "string" &&
              field.value.trim().length > 0;

            return (
              <div
                key={field.label}
                className="flex items-center gap-2 text-sm"
              >
                <HiOutlineCheckCircle
                  className={
                    completed
                      ? "text-emerald-500"
                      : "text-slate-400 dark:text-slate-600"
                  }
                />

                <span
                  className={
                    completed
                      ? "text-slate-700 dark:text-slate-300"
                      : "text-slate-400 dark:text-slate-500"
                  }
                >
                  {field.label}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}