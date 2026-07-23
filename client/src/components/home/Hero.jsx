import { motion } from "framer-motion";
import { Link } from "react-router-dom";



function Hero() {
  return (
    <section className="min-h-[90vh] bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
            Build a Resume
            <br />
            That Gets
            <span className="text-yellow-300"> Interview Calls</span>
          </h1>

          <p className="text-blue-100 mt-6 text-lg leading-8">
            Upload your resume and receive an ATS score, skill analysis,
            improvement suggestions, and personalized feedback in seconds.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              to="/upload"
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-semibold hover:scale-105 transition"
            >
              Analyze Resume
            </Link>

            <a
              href="#features"
              className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Learn More
            </a>
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-center"
        >
          <div className="bg-white rounded-3xl shadow-2xl p-8 w-80">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              Resume Score
            </h3>

            <div className="w-40 h-40 rounded-full border-8 border-green-500 flex items-center justify-center mx-auto">
              <span className="text-4xl font-bold text-green-600">
                92%
              </span>
            </div>

            <div className="mt-8 space-y-3">
              <div className="flex justify-between">
                <span>Skills</span>
                <span>✔</span>
              </div>

              <div className="flex justify-between">
                <span>Education</span>
                <span>✔</span>
              </div>

              <div className="flex justify-between">
                <span>Experience</span>
                <span>✔</span>
              </div>

              <div className="flex justify-between">
                <span>ATS Friendly</span>
                <span>✔</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

export default Hero;
