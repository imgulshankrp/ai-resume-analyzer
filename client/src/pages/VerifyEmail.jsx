import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  verifyEmail,
  resendOTP,
} from "../services/authService";

export default function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const email =
    location.state?.email || "";

  const [otp, setOtp] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [seconds, setSeconds] =
    useState(60);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);
    // =============================
  // Verify OTP
  // =============================

  const handleVerify = async (e) => {
    e.preventDefault();

    if (otp.length !== 6) {
      return toast.error(
        "Please enter a valid 6-digit OTP."
      );
    }

    try {
      setLoading(true);

      const res = await verifyEmail({
        email,
        otp,
      });

      if (res.success) {
        toast.success(
          "Email verified successfully!"
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Verification failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =============================
  // Resend OTP
  // =============================

  const handleResend = async () => {
    try {
      const res = await resendOTP({
        email,
      });

      if (res.success) {
        toast.success(
          "OTP sent successfully."
        );

        setSeconds(60);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to resend OTP."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl dark:bg-slate-900">

        <div className="mb-8 text-center">

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Verify Email
          </h1>

          <p className="mt-3 text-slate-500 dark:text-slate-400">

            Enter the 6-digit verification code sent to

          </p>

          <p className="mt-1 font-semibold text-blue-600">

            {email}

          </p>

        </div>

        <form
          onSubmit={handleVerify}
          className="space-y-6"
        >

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) =>
              setOtp(
                e.target.value.replace(
                  /\D/g,
                  ""
                )
              )
            }
            placeholder="Enter OTP"
            className="w-full rounded-2xl border border-slate-300 px-5 py-4 text-center text-2xl tracking-[12px] outline-none transition focus:border-blue-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
                    <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 text-lg font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "Verifying..."
              : "Verify Email"}
          </button>

        </form>

        <div className="mt-8 text-center">

          {seconds > 0 ? (

            <p className="text-sm text-slate-500 dark:text-slate-400">

              Resend OTP in{" "}

              <span className="font-semibold text-blue-600">

                {seconds}s

              </span>

            </p>

          ) : (

            <button
              onClick={handleResend}
              className="font-semibold text-blue-600 transition hover:underline"
            >
              Resend OTP
            </button>

          )}

        </div>

        <div className="mt-8 border-t border-slate-200 pt-6 text-center dark:border-slate-700">

          <Link
            to="/login"
            className="text-sm font-medium text-slate-500 transition hover:text-blue-600 dark:text-slate-400"
          >
            ← Back to Login
          </Link>

        </div>

      </div>

    </div>

  );
}