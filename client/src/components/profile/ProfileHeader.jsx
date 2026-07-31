import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
} from "react-icons/hi2";

export default function ProfileHeader({
  user = {
    name: "Gulshan Kumar",
    email: "gulshan@example.com",
    avatar: "",
    joined: "July 2026",
  },
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />

      <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="h-28 w-28 overflow-hidden rounded-full border-4 border-indigo-500 shadow-lg">
            {user.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 text-4xl font-bold text-white">
                {user.name.charAt(0)}
              </div>
            )}
          </div>

          {/* User Info */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
              {user.name}
            </h1>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <HiOutlineEnvelope className="text-lg" />
                <span>{user.email}</span>
              </div>

              <div className="flex items-center gap-2">
                <HiOutlineCalendarDays className="text-lg" />
                <span>Member since {user.joined}</span>
              </div>
            </div>

            {/* Badge */}
            <div className="mt-4 inline-flex rounded-full bg-indigo-100 px-4 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              Resume Analyzer Pro User
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700">
            <HiOutlinePencilSquare className="text-lg" />
            Edit Profile
          </button>
        </div>
      </div>
    </motion.div>
  );
}