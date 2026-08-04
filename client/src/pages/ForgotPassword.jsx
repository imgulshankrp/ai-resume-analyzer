import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaEnvelope } from "react-icons/fa";

import { forgotPassword } from "../services/authService";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.error("Please enter your email.");
    }

    try {
      setLoading(true);

      const data = await forgotPassword({
        email,
      });

      toast.success(
        data.message ||
          "OTP sent successfully."
      );

      navigate("/reset-password", {
        state: {
          email,
        },
      });

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
          "Failed to send OTP."
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

            <FaEnvelope className="text-2xl text-white" />

          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            Forgot Password
          </h1>

          <p className="mt-2 text-center text-slate-500 dark:text-slate-400">
            Enter your registered email to receive a password reset OTP.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
                    {/* Email */}

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              placeholder="Enter your registered email"
              required
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />

          </div>

          {/* Submit */}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Sending OTP..."
              : "Send OTP"}
          </button>

        </form>

        {/* Back to Login */}

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">

          Remember your password?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}