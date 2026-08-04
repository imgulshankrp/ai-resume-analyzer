import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineEnvelope,
  HiOutlineCalendarDays,
  HiOutlinePencilSquare,
  HiOutlineCamera,
  HiOutlineCheckBadge,
} from "react-icons/hi2";

import {
  FaChartLine,
  FaFileAlt,
  FaRobot,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { getProfile } from "../../services/profileService";

export default function ProfileHeader() {
  const [loading, setLoading] = useState(true);
  const BACKEND_URL =
  import.meta.env.VITE_API_URL.replace("/api", "");

  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    createdAt: "",
    highestATS: 0,
    totalResumes: 0,
    totalChats: 0,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await getProfile();

      setUser({
        name: res.user.name || "",
        email: res.user.email || "",
        avatar: res.user.avatar || "",
        createdAt: res.user.createdAt || "",
        highestATS: res.user.highestATS || 0,
        totalResumes: res.user.totalResumes || 0,
        totalChats: res.user.totalChats || 0,
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="rounded-[30px] bg-white dark:bg-slate-900 p-10 shadow-xl text-center">
        <h2 className="text-xl font-semibold">
          Loading Profile...
        </h2>
      </div>
    );
  }

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

        {/* Left */}

        <div className="flex flex-col items-center gap-8 sm:flex-row">

          <div className="relative">

            <div className="h-32 w-32 overflow-hidden rounded-full border-4 border-white shadow-2xl">

              {user.avatar ? (

                <img
                  src={`${BACKEND_URL}${user.avatar}`}
                  alt={user.name}
                  className="h-full w-full object-cover"
                />

              ) : (

                <div className="flex h-full w-full items-center justify-center bg-white text-5xl font-bold text-blue-600">

                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}

                </div>

              )}

            </div>

            <span className="absolute bottom-3 right-3 h-6 w-6 rounded-full border-4 border-white bg-green-500"></span>

            <button
              type="button"
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-white p-2 shadow-lg transition hover:scale-110"
            >
              <HiOutlineCamera className="text-xl text-blue-600" />
            </button>

          </div>

          <div className="text-center sm:text-left">

            <div className="flex items-center justify-center gap-2 sm:justify-start">

              <h1 className="text-4xl font-bold text-white">

                {user.name}

              </h1>

              <HiOutlineCheckBadge className="text-3xl text-cyan-300" />

            </div>

            <div className="mt-5 space-y-2 text-blue-100">

              <div className="flex items-center justify-center gap-2 sm:justify-start">

                <HiOutlineEnvelope className="text-lg" />

                {user.email}

              </div>

              <div className="flex items-center justify-center gap-2 sm:justify-start">

                <HiOutlineCalendarDays className="text-lg" />

                Member since{" "}

                {user.createdAt
                  ? new Date(user.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        month: "long",
                        year: "numeric",
                      }
                    )
                  : "-"}

              </div>

            </div>

            <div className="mt-5 inline-flex rounded-full bg-white/20 px-5 py-2 text-sm font-semibold text-white backdrop-blur-md">

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

          {/* Statistics */}

          <div className="grid grid-cols-3 gap-4">

            {/* Highest ATS */}

            <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-center backdrop-blur-md">

              <FaChartLine className="mx-auto text-xl text-green-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">
                {user.highestATS || 0}%
              </h3>

              <p className="text-xs text-blue-100">
                Highest ATS
              </p>

            </div>

            {/* Total Resumes */}

            <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-center backdrop-blur-md">

              <FaFileAlt className="mx-auto text-xl text-yellow-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">
                {user.totalResumes || 0}
              </h3>

              <p className="text-xs text-blue-100">
                Resumes
              </p>

            </div>

            {/* AI Chats */}

            <div className="rounded-2xl border border-white/20 bg-white/15 px-5 py-4 text-center backdrop-blur-md">

              <FaRobot className="mx-auto text-xl text-cyan-300" />

              <h3 className="mt-2 text-2xl font-bold text-white">
                {user.totalChats || 0}
              </h3>

              <p className="text-xs text-blue-100">
                AI Chats
              </p>

            </div>

          </div>

        </div>

      </div>

    </motion.div>
  );
}