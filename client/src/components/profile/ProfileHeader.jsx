import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineCamera,
  HiOutlineCheckBadge,
} from "react-icons/hi2";
import { FaChartLine, FaFileAlt, FaRobot } from "react-icons/fa";
import { Link } from "react-router-dom";

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
      transition={{ duration: 0.45 }}
      className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 p-8 shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -left-16 -top-16 h-72 w-72 rounded-full bg-white/10 blur-3xl"></div>
      <div className="absolute -right-20 -bottom-20 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Section */}

        <div className="flex flex-col sm:flex-row items-center gap-8">
          {/* Avatar */}

          <div className="relative">
            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-2xl">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-white text-5xl font-bold text-blue-600">
                  {user.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Online */}

            <span className="absolute bottom-3 right-3 h-6 w-6 rounded-full border-4 border-white bg-green-500"></span>

            {/* Camera */}

            <button className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-lg hover:scale-110 transition">
              <HiOutlineCamera className="text-xl text-blue-600" />
            </button>
          </div>

          {/* Info */}

          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start gap-2">
              <h1 className="text-4xl font-bold text-white">{user.name}</h1>

              <HiOutlineCheckBadge className="text-3xl text-cyan-300" />
            </div>

            <div className="mt-5 space-y-2 text-blue-100">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <HiOutlineEnvelope className="text-lg" />
                {user.email}
              </div>

              <div className="flex items-center justify-center sm:justify-start gap-2">
                <HiOutlineCalendarDays className="text-lg" />
                Member since {user.joined}
              </div>
            </div>

            <div className="mt-5 inline-flex rounded-full bg-white/20 backdrop-blur-md px-5 py-2 text-sm font-semibold text-white">
              ⭐ Resume Analyzer Pro
            </div>
          </div>
        </div>

        {/* Right Section */}

        <div className="flex flex-col items-center gap-6">
          <Link
            to="/profile/edit"
            className="flex items-center gap-3 rounded-2xl bg-white px-6 py-3 font-semibold text-blue-700 shadow-xl transition duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <HiOutlinePencilSquare className="text-xl" />
            Edit Profile
          </Link>

          {/* Stats */}

          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-2xl bg-white/15 backdrop-blur-md px-5 py-4 text-center border border-white/20">
              <FaChartLine className="mx-auto text-xl text-green-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">92%</h3>

              <p className="text-xs text-blue-100">ATS Score</p>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md px-5 py-4 text-center border border-white/20">
              <FaFileAlt className="mx-auto text-xl text-yellow-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">18</h3>

              <p className="text-xs text-blue-100">Resumes</p>
            </div>

            <div className="rounded-2xl bg-white/15 backdrop-blur-md px-5 py-4 text-center border border-white/20">
              <FaRobot className="mx-auto text-xl text-cyan-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">45</h3>

              <p className="text-xs text-blue-100">AI Chats</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
