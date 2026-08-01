import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../api/auth";
import { FaRobot } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await loginUser(form);

      localStorage.setItem("token", data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      );

      toast.success("Login Successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 800);

    } catch (err) {
      toast.error(
        err.response?.data?.message ||
        "Invalid email or password"
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

            <FaRobot className="text-3xl text-white" />

          </div>

          <h1 className="mt-5 text-3xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Login to your ResumeAI account
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />

          </div>

          <div>

            <label className="mb-2 block font-medium text-slate-700 dark:text-slate-300">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-blue-600 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              required
            />

          </div>

          <button
            disabled={loading}
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white transition hover:scale-[1.02] disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="mt-6 text-center text-slate-600 dark:text-slate-400">

          Don't have an account?{" "}

          <Link
            to="/signup"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}