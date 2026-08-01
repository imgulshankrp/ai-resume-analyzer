import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineBriefcase,
  HiOutlineGlobeAlt,
  HiOutlineCamera,
} from "react-icons/hi2";

export default function AccountSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            👤 Account Information
          </h2>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Update your personal information.
          </p>
        </div>

        <button className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700">
          Save Changes
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-8 flex flex-col items-center">
        <div className="relative">
          <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-5xl font-bold text-white shadow-xl">
            G
          </div>

          <button className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg dark:bg-slate-800">
            <HiOutlineCamera className="text-xl text-blue-600" />
          </button>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Upload profile picture
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 grid gap-6 md:grid-cols-2">

        {/* Name */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlineUser />
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Gulshan Kumar"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlineEnvelope />
            Email
          </label>

          <input
            type="email"
            defaultValue="gulshan@example.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlinePhone />
            Phone Number
          </label>

          <input
            type="text"
            placeholder="+91 9876543210"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlineMapPin />
            Location
          </label>

          <input
            type="text"
            placeholder="New Delhi, India"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Job */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlineBriefcase />
            Job Title
          </label>

          <input
            type="text"
            placeholder="Frontend Developer"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Portfolio */}
        <div>
          <label className="mb-2 flex items-center gap-2 font-semibold text-slate-700 dark:text-slate-300">
            <HiOutlineGlobeAlt />
            Portfolio
          </label>

          <input
            type="url"
            placeholder="https://yourportfolio.com"
            className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </div>

      </div>
    </motion.div>
  );
}