import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import {
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeSlash,
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile,
} from "react-icons/hi2";

import { changePassword } from "../../services/authService";

export default function SecuritySection() {

  const [saving, setSaving] = useState(false);

  const [showCurrent, setShowCurrent] =
    useState(false);

  const [showNew, setShowNew] =
    useState(false);

  const [showConfirm, setShowConfirm] =
    useState(false);

  const [twoFactor, setTwoFactor] =
    useState(false);

  const [form, setForm] = useState({

    currentPassword: "",

    newPassword: "",

    confirmPassword: "",

  });

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const passwordStrength = () => {

    const pwd = form.newPassword;

    if (pwd.length < 6)
      return {
        width: "20%",
        text: "Weak",
        color: "bg-red-500",
      };

    if (pwd.length < 10)
      return {
        width: "60%",
        text: "Medium",
        color: "bg-yellow-500",
      };

    return {
      width: "100%",
      text: "Strong",
      color: "bg-green-500",
    };

  };

  const strength = passwordStrength();

  const handleSave = async () => {

    if (
      !form.currentPassword ||
      !form.newPassword ||
      !form.confirmPassword
    ) {

      toast.error(
        "Please fill all password fields."
      );

      return;

    }

    if (
      form.newPassword !==
      form.confirmPassword
    ) {

      toast.error(
        "Passwords do not match."
      );

      return;

    }

    try {

      setSaving(true);

      await changePassword({

        currentPassword:
          form.currentPassword,

        newPassword:
          form.newPassword,

      });

      toast.success(
        "Password updated successfully."
      );

      setForm({

        currentPassword: "",

        newPassword: "",

        confirmPassword: "",

      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to change password."
      );

    } finally {

      setSaving(false);

    }

  };

  return (

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-900"
    >
          {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div className="flex items-center gap-4">

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

        <button
          onClick={handleSave}
          disabled={saving}
          className="rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save Changes"}
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
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowCurrent(!showCurrent)
              }
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
              name="newPassword"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowNew(!showNew)
              }
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
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-12 outline-none transition focus:border-indigo-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirm(!showConfirm)
              }
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

            <span className="text-sm font-semibold text-indigo-600">
              {strength.text}
            </span>

          </div>

          <div className="h-3 rounded-full bg-slate-200 dark:bg-slate-700">

            <div
              className={`h-3 rounded-full transition-all duration-500 ${strength.color}`}
              style={{
                width: strength.width,
              }}
            />

          </div>

        </div>

      </div>
            {/* Security Options */}

      <div className="mt-10 grid gap-6 lg:grid-cols-2">

        {/* Two Factor Authentication */}

        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <HiOutlineShieldCheck className="text-3xl text-green-600" />

              <div>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  Two-Factor Authentication
                </h3>

                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Add an extra layer of security to your account.
                </p>

              </div>

            </div>

            <button
              type="button"
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

          <p className="mt-5 text-sm leading-6 text-slate-500 dark:text-slate-400">
            Two-factor authentication UI is ready. Backend verification
            (OTP / Email / Authenticator App) can be connected later.
          </p>

        </div>

        {/* Active Sessions */}

        <div className="rounded-2xl border border-slate-200 p-6 dark:border-slate-700">

          <div className="flex items-center gap-4">

            <HiOutlineDevicePhoneMobile className="text-3xl text-blue-600" />

            <div>

              <h3 className="font-bold text-slate-900 dark:text-white">
                Active Sessions
              </h3>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                Manage all logged in devices.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() =>
              toast.info(
                "Logout All Devices will be connected in the next phase."
              )
            }
            className="mt-6 rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Logout All Devices
          </button>

        </div>

      </div>

      {/* Footer */}

      <div className="mt-10 rounded-2xl border border-indigo-100 bg-indigo-50 p-5 dark:border-slate-700 dark:bg-slate-800">

        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">

          Keep your account secure by using a strong password and changing
          it regularly. Never share your password with anyone. Two-factor
          authentication and session management can be enabled for
          additional protection.

        </p>

      </div>

    </motion.div>

  );

}