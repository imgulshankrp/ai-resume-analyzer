import { motion } from "framer-motion";
import {
  HiSparkles,
  HiArrowTrendingUp,
} from "react-icons/hi2";

export default function WelcomeBanner() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 shadow-2xl"
    >
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">

        {/* Left */}
        <div className="text-white">

          <p className="text-blue-100 text-sm">
            {today}
          </p>

          <h1 className="mt-2 text-4xl font-bold">
            {greeting}, {user?.name || "User"} 👋
          </h1>

          <p className="mt-4 max-w-2xl text-blue-100 leading-relaxed">
            Welcome back to your AI Resume Analyzer.
            Track your ATS score, improve your resume,
            compare versions and prepare for your next job.
          </p>

        </div>

        {/* Right */}
        <div className="rounded-2xl bg-white/15 backdrop-blur-lg p-6 border border-white/20 min-w-[280px]">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-white/20 p-3">
              <HiArrowTrendingUp className="text-3xl text-white" />
            </div>

            <div>

              <p className="text-sm text-blue-100">
                Resume Health
              </p>

              <h2 className="text-3xl font-bold text-white">
                Excellent
              </h2>

            </div>

          </div>

          <div className="mt-6 flex items-center gap-3">

            <HiSparkles className="text-2xl text-yellow-300" />

            <p className="text-sm text-blue-100 leading-relaxed">
              AI Tip: Add measurable achievements
              like "Increased performance by 30%"
              to improve your ATS score.
            </p>

          </div>

        </div>

      </div>
    </motion.div>
  );
}