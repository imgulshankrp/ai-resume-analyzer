import { useState } from "react";
import { motion } from "framer-motion";
import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

export default function SecuritySection() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <div className="flex items-center gap-3">

            <div className="rounded-2xl bg-indigo-100 p-3 dark:bg-indigo-900/30">
              <HiOutlineLockClosed className="text-3xl text-indigo-600" />
            </div>

            <div>

              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Security
              </h2>

              <p className="mt-1 text-slate-500 dark:text-slate-400">
                Protect your ResumeAI account.
              </p>

            </div>

          </div>

        </div>

        <button className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Save Changes
        </button>

      </div>

      {/* Password Section */}

      <div className="mt-10 grid gap-6">

        {/* Current Password */}

        <div>

          <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
            Current Password
          </label>

          <div className="relative">

            <input
              type={showCurrent ? "text" : "password"}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowCurrent(!showCurrent)}
              className="absolute right-4 top-4"
            >
              {showCurrent ? (
                <HiOutlineEyeSlash className="text-xl text-slate-500" />
              ) : (
                <HiOutlineEye className="text-xl text-slate-500" />
              )}
            </button>

          </div>

        </div>

        {/* New Password */}

        <div>

          <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
            New Password
          </label>

          <div className="relative">

            <input
              type={showNew ? "text" : "password"}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowNew(!showNew)}
              className="absolute right-4 top-4"
            >
              {showNew ? (
                <HiOutlineEyeSlash className="text-xl text-slate-500" />
              ) : (
                <HiOutlineEye className="text-xl text-slate-500" />
              )}
            </button>

          </div>

        </div>

        {/* Confirm Password */}

        <div>

          <label className="mb-2 block font-semibold text-slate-700 dark:text-slate-300">
            Confirm Password
          </label>

          <div className="relative">

            <input
              type={showConfirm ? "text" : "password"}
              placeholder="Confirm password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-4"
            >
              {showConfirm ? (
                <HiOutlineEyeSlash className="text-xl text-slate-500" />
              ) : (
                <HiOutlineEye className="text-xl text-slate-500" />
              )}
            </button>

          </div>

        </div>

        {/* Password Strength */}

        <div>

          <div className="mb-2 flex items-center justify-between">

            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Password Strength
            </span>

            <span className="text-sm font-semibold text-green-600">
              Strong
            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">

            <div className="h-3 w-4/5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"></div>

          </div>

        </div>

      </div>

      {/* Security Options */}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        {/* 2FA */}

        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <HiOutlineShieldCheck className="text-3xl text-green-600" />

              <div>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-slate-500">
                  Extra protection for your account.
                </p>

              </div>

            </div>

            <button
              onClick={() => setTwoFactor(!twoFactor)}
              className={`relative h-7 w-14 rounded-full transition ${
                twoFactor
                  ? "bg-green-600"
                  : "bg-slate-300 dark:bg-slate-700"
              }`}
            >
              <span
                className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                  twoFactor ? "left-8" : "left-1"
                }`}
              />
            </button>

          </div>

        </div>

        {/* Active Sessions */}

        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

          <div className="flex items-center gap-4">

            <HiOutlineDevicePhoneMobile className="text-3xl text-blue-600" />

            <div>

              <h3 className="font-bold text-slate-900 dark:text-white">
                Active Sessions
              </h3>

              <p className="text-sm text-slate-500">
                2 devices currently logged in.
              </p>

            </div>

          </div>

          <button className="mt-5 rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
            Logout All Devices
          </button>

        </div>

      </div>
    </motion.div>
  );
}