import { useState } from "react";
import {
  useNavigate,
  useLocation,
  Link,
} from "react-router-dom";

import { toast } from "react-toastify";

import { FaLock } from "react-icons/fa";

import { resetPassword } from "../services/authService";

export default function ResetPassword() {
  const navigate = useNavigate();

  const location = useLocation();

  const email =
    location.state?.email || "";

  const [form, setForm] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      form.password !==
      form.confirmPassword
    ) {
      return toast.error(
        "Passwords do not match."
      );
    }

    try {
      setLoading(true);

      const data =
        await resetPassword({
          email,
          otp: form.otp,
          password:
            form.password,
        });

      toast.success(
        data.message ||
          "Password reset successfully."
      );

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {

      toast.error(
        err.response?.data
          ?.message ||
          "Password reset failed."
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 transition-colors duration-300 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-2xl dark:border-slate-800 dark:bg-slate-900">

        {/* Logo */}

        <div className="mb-8 flex flex-col items-center">

          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 shadow-lg">

            <FaLock className="text-2xl text-white" />

          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">

            Reset Password

          </h1>

          <p className="mt-2 text-center text-slate-500 dark:text-slate-400">

            Enter the OTP sent to

          </p>

          <p className="mt-1 font-semibold text-blue-600">

            {email}

          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >
                    {/* OTP */}

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Verification OTP
            </label>

            <input
              type="text"
              name="otp"
              value={form.otp}
              onChange={handleChange}
              maxLength={6}
              placeholder="Enter 6-digit OTP"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-center text-xl tracking-[8px] outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          {/* New Password */}

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              New Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter new password"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          {/* Confirm Password */}

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Resetting Password..."
              : "Reset Password"}
          </button>

        </form>

        {/* Back to Login */}

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">

          Remember your password?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Back to Login
          </Link>

        </p>

      </div>

    </div>
  );
}