import { motion } from "framer-motion";
import {
  HiOutlinePencilSquare,
  HiOutlineClock,
  HiOutlineCog6Tooth,
  HiOutlineArrowLeftOnRectangle,
} from "react-icons/hi2";
import { Link } from "react-router-dom";

const actions = [
  {
    title: "Edit Profile",
    icon: HiOutlinePencilSquare,
    link: "/profile/edit",
    color: "bg-indigo-500",
  },
  {
    title: "Resume History",
    icon: HiOutlineClock,
    link: "/history",
    color: "bg-emerald-500",
  },
  {
    title: "Settings",
    icon: HiOutlineCog6Tooth,
    link: "/settings",
    color: "bg-orange-500",
  },
  {
    title: "Logout",
    icon: HiOutlineArrowLeftOnRectangle,
    link: "/login",
    color: "bg-red-500",
  },
];

export default function QuickActions() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      <h2 className="mb-6 text-xl font-bold text-slate-900 dark:text-white">
        Quick Actions
      </h2>

      <div className="grid gap-4 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              to={action.link}
            >
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="flex items-center gap-4 rounded-2xl border border-slate-200 p-4 transition hover:shadow-md dark:border-slate-700"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${action.color} text-white`}
                >
                  <Icon className="text-xl" />
                </div>

                <span className="font-semibold text-slate-800 dark:text-slate-200">
                  {action.title}
                </span>
              </motion.div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
}