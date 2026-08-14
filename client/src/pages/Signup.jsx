import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";

import {
  register,
  googleLogin,
} from "../services/authService";

import {
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from "react-icons/fa";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
  // Normal Signup
  // =====================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email address.");
      return;
    }

    if (form.password.length < 6) {
      toast.error(
        "Password must contain at least 6 characters."
      );
      return;
    }

    setLoading(true);

    try {
      const data = await register(form);

      toast.success(
        data.message ||
          "Verification OTP sent to your email."
      );

      navigate("/verify-email", {
        state: {
          email: form.email,
        },
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================
  // Google Signup
  // =====================================

  const handleGoogleSuccess = async (
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

      const token =
        data?.token ||
        data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      if (data?.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );
      }

      toast.success(
        data?.message ||
          "Google authentication successful."
      );

      navigate("/dashboard");
    } catch (err) {
      console.error(
        "GOOGLE SIGNUP ERROR:",
        err
      );

      toast.error(
        err.response?.data?.message ||
          "Google authentication failed."
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
      "Google sign-up was cancelled or failed."
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
          MAIN CONTENT
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
                    Resume<span className="text-teal-300">AI</span>
                  </h2>

                  <p className="text-xs text-slate-300">
                    AI Resume Analyzer
                  </p>

                </div>

              </div>


              {/* Main message */}

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
                  Build smarter. Apply better.
                </p>

                <h2
                  className="
                    text-4xl
                    font-extrabold
                    leading-tight
                    tracking-tight
                  "
                >
                  Create a resume
                  <br />
                  that gets you
                  <span className="text-teal-300">
                    {" "}noticed.
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
                  Analyze your resume, improve ATS
                  compatibility, discover missing skills,
                  and match your profile with job
                  descriptions.
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
                Your resume data is securely protected.
              </span>

            </div>

          </div>


          {/* =====================================
              SIGNUP FORM
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
                Get started
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
                Create your account
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                Start building a stronger resume today.
              </p>

            </div>


            {/* =====================================
                GOOGLE SIGNUP
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
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap={false}
                    theme="filled_black"
                    shape="rectangular"
                    size="large"
                    text="signup_with"
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
                FORM
            ====================================== */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}

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
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  autoComplete="name"
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

                <label
                  className="
                    mb-2
                    block
                    text-sm
                    font-medium
                    text-slate-200
                  "
                >
                  Password
                </label>

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
                    placeholder="Create a password"
                    autoComplete="new-password"
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

                <p className="mt-2 text-xs text-slate-500">
                  Use at least 6 characters.
                </p>

              </div>


              {/* Create Account */}

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
                  ? "Creating Account..."
                  : "Create Account"}
              </button>

            </form>


            {/* Login */}

            <p
              className="
                mt-7
                text-center
                text-sm
                text-slate-400
              "
            >
              Already have an account?{" "}

              <Link
                to="/login"
                className="
                  font-semibold
                  text-teal-400
                  transition
                  hover:text-teal-300
                  hover:underline
                "
              >
                Sign in
              </Link>
            </p>


            {/* Terms */}

            <p
              className="
                mt-5
                text-center
                text-[11px]
                leading-5
                text-slate-600
              "
            >
              By creating an account, you agree to our
              terms and privacy policy.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}