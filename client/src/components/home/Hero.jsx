import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FaCheckCircle,
  FaFileAlt,
  FaRobot,
  FaChartLine,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      className="
        relative
        overflow-hidden
        min-h-screen
        flex
        items-center
        bg-gradient-to-br
        from-blue-700
        via-indigo-700
        to-purple-800
      "
    >
      {/* Background Blur */}

      <div className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl"></div>

      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-pink-400/20 blur-3xl"></div>

      <div
        className="
          relative
          mx-auto
          grid
          max-w-7xl
          grid-cols-1
          gap-16
          px-6
          py-12
          lg:grid-cols-2
          lg:py-20
          items-center
        "
      >

        {/* Left Side */}

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >

          <span
            className="
              inline-flex
              items-center
              rounded-full
              bg-white/20
              px-5
              py-2
              text-sm
              font-semibold
              text-white
              backdrop-blur-md
            "
          >
            🚀 AI Powered Resume Analyzer
          </span>

          <h1
            className="
              mt-8
              text-4xl
              font-extrabold
              leading-tight
              text-white
              sm:text-5xl
              lg:text-7xl
            "
          >
            Build a Resume

            <br />

            That Lands

            <span className="text-yellow-300">
              {" "}
              More Interviews
            </span>
          </h1>

          <p
            className="
              mt-8
              max-w-xl
              text-lg
              leading-8
              text-blue-100
              lg:text-xl
            "
          >
            Analyze your resume with AI, improve ATS compatibility,
            compare resumes, match job descriptions,
            chat with your resume, and download
            professional reports—all in one place.
          </p>

          <div className="mt-10 flex flex-col gap-5 sm:flex-row">

            <Link
              to="/upload"
              className="
                rounded-xl
                bg-white
                px-8
                py-4
                text-center
                font-semibold
                text-blue-700
                shadow-xl
                transition-all
                duration-300
                hover:scale-105
              "
            >
              Analyze Resume →
            </Link>

            <a
              href="#features"
              className="
                rounded-xl
                border-2
                border-white
                px-8
                py-4
                text-center
                font-semibold
                text-white
                transition-all
                duration-300
                hover:bg-white
                hover:text-blue-700
              "
            >
              Explore Features
            </a>

          </div>
                    {/* Statistics */}

          <div className="mt-20 mb-10 grid grid-cols-3 gap-8">

            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur-md
              "
            >
              <h2 className="text-4xl font-bold text-white">
                95%
              </h2>

              <p className="mt-2 text-blue-100">
                ATS Accuracy
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur-md
              "
            >
              <h2 className="text-4xl font-bold text-white">
                AI
              </h2>

              <p className="mt-2 text-blue-100">
                Resume Analysis
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="
                rounded-2xl
                bg-white/10
                p-5
                backdrop-blur-md
              "
            >
              <h2 className="text-4xl font-bold text-white">
                PDF
              </h2>

              <p className="mt-2 text-blue-100">
                Professional Reports
              </p>
            </motion.div>

          </div>

        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:mt-8"
        >

          <div
            className="
              w-[360px]
              rounded-3xl
              border
              border-gray-200
              bg-white
              p-8
              shadow-2xl
              transition-all
              duration-300
              dark:border-slate-700
              dark:bg-slate-900
            "
          >

            <div className="mb-6 flex items-center gap-3">

              <FaFileAlt className="text-3xl text-blue-600 dark:text-blue-400" />

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                Resume Analysis
              </h3>

            </div>

            <div className="mx-auto flex h-44 w-44 items-center justify-center rounded-full border-[10px] border-green-500">

              <span className="text-5xl font-bold text-green-600 dark:text-green-400">
                92%
              </span>

            </div>

            <div className="mt-8 space-y-5">

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FaCheckCircle className="text-green-500" />
                  ATS Friendly
                </span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  ✔
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FaRobot className="text-purple-500" />
                  AI Suggestions
                </span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  ✔
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FaChartLine className="text-blue-500" />
                  Job Match
                </span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  92%
                </span>

              </div>

              <div className="flex items-center justify-between">

                <span className="flex items-center gap-2 text-gray-800 dark:text-gray-200">
                  <FaFileAlt className="text-red-500" />
                  PDF Report
                </span>

                <span className="font-semibold text-gray-900 dark:text-white">
                  Ready
                </span>

              </div>
                          </div>

          </div>

        </motion.div>

      </div>

      {/* Decorative Elements */}

      <div className="pointer-events-none absolute left-16 top-28 hidden h-4 w-4 rounded-full bg-cyan-300/60 lg:block"></div>

      <div className="pointer-events-none absolute right-20 top-40 hidden h-5 w-5 rounded-full bg-pink-300/60 lg:block"></div>

      <div className="pointer-events-none absolute bottom-20 left-1/3 hidden h-6 w-6 rounded-full bg-yellow-300/40 lg:block"></div>

    </section>
  );
}

export default Hero;