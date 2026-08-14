import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

import {
  login,
  googleLogin,
} from "../services/authService";

import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // =====================================
  // Handle Input
  // =====================================

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =====================================
  // Normal Login
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (!form.password) {
      toast.error("Please enter your password.");
      return;
    }

    try {
      setLoading(true);

      const data = await login(form);

      localStorage.setItem("token", data.token);

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success(
        data.message || "Login successful."
      );

      navigate("/dashboard");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Google Login
  // =====================================

  const handleGoogleLogin = async (
    credentialResponse
  ) => {
    try {
      setGoogleLoading(true);

      const credential =
        credentialResponse?.credential;

      if (!credential) {
        toast.error(
          "Google authentication failed."
        );
        return;
      }

      const data = await googleLogin(credential);

      if (data?.token) {
        localStorage.setItem(
          "token",
          data.token
        );
      }

      if (data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      toast.success(
        data?.message ||
          "Google login successful."
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "GOOGLE LOGIN ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Google login failed."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  // =====================================
  // Google Error
  // =====================================

  const handleGoogleError = () => {
    toast.error(
      "Google login was cancelled or failed."
    );
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#07111F]
        px-4
        py-6
        text-white
        sm:px-6
        sm:py-8
        lg:px-8
      "
    >

      {/* =====================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">

        <div
          className="
            absolute
            left-[-150px]
            top-[-150px]
            h-96
            w-96
            rounded-full
            bg-teal-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            bottom-[-180px]
            right-[-120px]
            h-[450px]
            w-[450px]
            rounded-full
            bg-blue-500/10
            blur-3xl
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-1/2
            h-72
            w-72
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            bg-indigo-500/10
            blur-3xl
          "
        />

      </div>


      {/* =====================================
          MAIN CARD
      ====================================== */}

      <div
        className="
          relative
          flex
          min-h-[calc(100vh-3rem)]
          items-center
          justify-center
        "
      >

        <div
          className="
            grid
            w-full
            max-w-5xl
            overflow-hidden
            rounded-3xl
            border
            border-white/[0.08]
            bg-[#0B1728]/95
            shadow-2xl
            shadow-black/40
            backdrop-blur-xl
            lg:grid-cols-2
          "
        >

          {/* =====================================
              LEFT BRAND SECTION
          ====================================== */}

          <div
            className="
              hidden
              flex-col
              justify-between
              bg-gradient-to-br
              from-[#0D3B4A]
              via-[#0B4260]
              to-[#172554]
              p-10
              lg:flex
            "
          >

            {/* Brand */}

            <div>

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-white/10
                    bg-white/10
                    text-lg
                    font-bold
                  "
                >
                  R
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Resume<span className="text-teal-300">
                      AI
                    </span>
                  </h2>

                  <p className="text-xs text-slate-300">
                    AI Resume Analyzer
                  </p>

                </div>

              </div>


              {/* Main Message */}

              <div className="mt-24">

                <p
                  className="
                    mb-4
                    text-xs
                    font-semibold
                    uppercase
                    tracking-[0.2em]
                    text-teal-300
                  "
                >
                  Welcome back
                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                  "
                >
                  Turn your resume
                  <br />
                  into your
                  <span className="text-teal-300">
                    {" "}next opportunity.
                  </span>
                </h2>

                <p
                  className="
                    mt-6
                    max-w-md
                    text-sm
                    leading-7
                    text-slate-300
                  "
                >
                  Continue analyzing your resume,
                  tracking ATS performance, matching
                  job descriptions, and improving your
                  chances of getting shortlisted.
                </p>

              </div>

            </div>


            {/* Security */}

            <div
              className="
                flex
                items-center
                gap-3
                text-xs
                text-slate-300
              "
            >

              <FaShieldAlt className="text-teal-300" />

              <span>
                Secure authentication and protected data.
              </span>

            </div>

          </div>


          {/* =====================================
              LOGIN SECTION
          ====================================== */}

          <div className="p-6 sm:p-10 lg:p-12">

            {/* Heading */}

            <div className="mb-8">

              <p
                className="
                  mb-2
                  text-xs
                  font-semibold
                  uppercase
                  tracking-[0.18em]
                  text-teal-400
                "
              >
                Welcome back
              </p>

              <h1
                className="
                  text-3xl
                  font-bold
                  tracking-tight
                  text-white
                  sm:text-4xl
                "
              >
                Sign in to ResumeAI
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Continue where you left off.
              </p>

            </div>


            {/* =====================================
                GOOGLE LOGIN
            ====================================== */}

            <div className="w-full">

              {googleLoading ? (

                <button
                  type="button"
                  disabled
                  className="
                    flex
                    h-11
                    w-full
                    items-center
                    justify-center
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800
                    text-sm
                    font-semibold
                    text-slate-300
                  "
                >
                  Connecting to Google...
                </button>

              ) : (

                <div className="flex w-full justify-center">

                  <GoogleLogin
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleError}
                    useOneTap={false}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    text="signin_with"
                    width="100%"
                  />

                </div>

              )}

            </div>


            {/* Divider */}

            <div className="my-7 flex items-center gap-4">

              <div className="h-px flex-1 bg-slate-700" />

              <span
                className="
                  text-[11px]
                  font-medium
                  uppercase
                  tracking-wider
                  text-slate-500
                "
              >
                Or continue with email
              </span>

              <div className="h-px flex-1 bg-slate-700" />

            </div>


            {/* =====================================
                LOGIN FORM
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}

              <div>

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-200
                  "
                >
                  Email Address
                </label>

                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                  className="
                    w-full
                    rounded-xl
                    border
                    border-slate-700
                    bg-slate-800/70
                    px-4
                    py-3
                    text-sm
                    text-white
                    outline-none
                    transition
                    placeholder:text-slate-500
                    focus:border-teal-400
                    focus:ring-2
                    focus:ring-teal-400/10
                  "
                />

              </div>


              {/* Password */}

              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    className="
                      block
                      text-sm
                      font-medium
                      text-slate-200
                    "
                  >
                    Password
                  </label>

                  <Link
                    to="/forgot-password"
                    className="
                      text-xs
                      font-medium
                      text-teal-400
                      transition
                      hover:text-teal-300
                    "
                  >
                    Forgot password?
                  </Link>

                </div>


                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-700
                      bg-slate-800/70
                      px-4
                      py-3
                      pr-12
                      text-sm
                      text-white
                      outline-none
                      transition
                      placeholder:text-slate-500
                      focus:border-teal-400
                      focus:ring-2
                      focus:ring-teal-400/10
                    "
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    className="
                      absolute
                      right-3
                      top-1/2
                      -translate-y-1/2
                      rounded-lg
                      p-2
                      text-slate-400
                      transition
                      hover:text-white
                    "
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >

                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}

                  </button>

                </div>

              </div>


              {/* Login Button */}

              <button
                type="submit"
                disabled={loading}
                className="
                  w-full
                  rounded-xl
                  bg-gradient-to-r
                  from-teal-400
                  to-blue-500
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-lg
                  shadow-teal-500/10
                  transition
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-xl
                  hover:shadow-teal-500/20
                  disabled:cursor-not-allowed
                  disabled:opacity-60
                  disabled:hover:translate-y-0
                "
              >
                {loading
                  ? "Signing in..."
                  : "Sign In"}
              </button>

            </form>


            {/* Signup */}

            <p
              className="
                mt-7
                text-center
                text-sm
                text-slate-400
              "
            >
              Don't have an account?{" "}

              <Link
                to="/signup"
                className="
                  font-semibold
                  text-teal-400
                  transition
                  hover:text-teal-300
                  hover:underline
                "
              >
                Create an account
              </Link>
            </p>


            {/* Footer */}

            <p
              className="
                mt-5
                text-center
                text-[11px]
                leading-5
                text-slate-600
              "
            >
              Your account and resume data are protected
              with secure authentication.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}