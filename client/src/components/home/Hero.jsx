import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaFileAlt, FaRobot, FaChartLine } from "react-icons/fa";

function Hero() {
  return (
    <section className="relative overflow-hidden min-h-screen bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 flex items-center">
      {/* Background Blur */}
      <div className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-pink-400/20 rounded-full blur-3xl bottom-0 right-0"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-2gap-16 items-center">
        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-white font-medium mb-6">
            🚀 AI Powered Resume Analyzer
          </span>

          <h1 className="text-4xl sm:text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight">
            Build a Resume
            <br />
            That Lands
            <span className="text-yellow-300"> More Interviews</span>
          </h1>

          <p className="mt-8 text-lg lg:text-xl text-blue-100 leading-8 max-w-xl">
            Analyze your resume with AI, improve ATS compatibility, compare
            resumes, match job descriptions, chat with your resume, and download
            professional reports—all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            <Link
              to="/upload"
              className="bg-white text-blue-700 px-8 py-4 rounded-xl font-semibold shadow-xl hover:scale-105 transition duration-300"
            >
              Analyze Resume →
            </Link>

            <a
              href="#features"
              className="border-2 border-white text-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition duration-300"
            >
              Explore Features
            </a>
          </div>

          {/* Statistics */}

          <div className="grid grid-cols-3 gap-8 mt-20 mb-10">
            <div>
              <h2 className="text-4xl font-bold text-white">95%</h2>

              <p className="text-blue-200">ATS Accuracy</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white">AI</h2>

              <p className="text-blue-200">Resume Analysis</p>
            </div>

            <div>
              <h2 className="text-4xl font-bold text-white">PDF</h2>

              <p className="text-blue-200">Professional Reports</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}

        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex justify-center lg:mt-8"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-[360px] lg:mt-12">
            <div className="flex items-center gap-3 mb-6">
              <FaFileAlt className="text-blue-600 text-3xl" />

              <h3 className="text-2xl font-bold">Resume Analysis</h3>
            </div>

            <div className="w-44 h-44 rounded-full border-[10px] border-green-500 flex items-center justify-center mx-auto">
              <span className="text-4xl sm:text-5xl font-bold text-green-600">92%</span>
            </div>

            <div className="mt-8 space-y-5">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  ATS Friendly
                </span>

                <span>✔</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <FaRobot className="text-purple-500" />
                  AI Suggestions
                </span>

                <span>✔</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <FaChartLine className="text-blue-500" />
                  Job Match
                </span>

                <span>92%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <FaFileAlt className="text-red-500" />
                  PDF Report
                </span>

                <span>Ready</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
