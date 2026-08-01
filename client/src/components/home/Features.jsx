import { motion } from "framer-motion";
import {
  FaChartLine,
  FaFileAlt,
  FaLightbulb,
  FaUserCheck,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine />,
    color: "from-blue-500 to-cyan-500",
    title: "ATS Score",
    description:
      "Measure ATS compatibility and discover exactly how recruiters' systems evaluate your resume.",
  },
  {
    icon: <FaFileAlt />,
    color: "from-green-500 to-emerald-500",
    title: "Resume Analysis",
    description:
      "Analyze formatting, keywords, readability, structure, and overall resume quality in seconds.",
  },
  {
    icon: <FaLightbulb />,
    color: "from-yellow-400 to-orange-500",
    title: "AI Suggestions",
    description:
      "Receive intelligent recommendations to improve your resume and maximize interview opportunities.",
  },
  {
    icon: <FaUserCheck />,
    color: "from-purple-500 to-pink-500",
    title: "Skill Detection",
    description:
      "Automatically identify technical and soft skills to highlight your strongest qualifications.",
  },
];

function Features() {
  return (
    <section
      id="features"
      className="
        py-24
        bg-gradient-to-b
        from-gray-50
        to-white
        dark:from-slate-950
        dark:to-slate-900
        transition-colors
        duration-300
      "
    >
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span
            className="
              text-blue-600
              dark:text-blue-400
              font-semibold
              uppercase
              tracking-widest
            "
          >
            FEATURES
          </span>

          <h2
            className="
              mt-4
              text-3xl
              sm:text-4xl
              lg:text-5xl
              font-bold
              text-gray-900
              dark:text-white
            "
          >
            Everything You Need
          </h2>

          <p
            className="
              mt-6
              max-w-3xl
              mx-auto
              text-lg
              text-gray-600
              dark:text-slate-300
            "
          >
            Our AI-powered platform helps you build stronger resumes,
            improve ATS compatibility, and increase your chances of
            landing interviews.
          </p>
        </motion.div>

        {/* Cards */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">

          {features.map((feature, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.5,
              }}
              whileHover={{
                y: -10,
                scale: 1.03,
              }}
              className="
                group
                rounded-3xl
                border
                border-gray-200
                dark:border-slate-700
                bg-white
                dark:bg-slate-900
                shadow-lg
                hover:shadow-2xl
                transition-all
                duration-300
                p-8
              "
            >

              <div
                className={`
                  w-16
                  h-16
                  rounded-2xl
                  bg-gradient-to-r
                  ${feature.color}
                  flex
                  items-center
                  justify-center
                  text-white
                  text-3xl
                  shadow-lg
                  group-hover:scale-110
                  transition-transform
                `}
              >
                {feature.icon}
              </div>

              <h3
                className="
                  mt-8
                  text-xl
                  sm:text-2xl
                  font-bold
                  text-gray-900
                  dark:text-white
                "
              >
                {feature.title}
              </h3>

              <p
                className="
                  mt-4
                  leading-8
                  text-gray-600
                  dark:text-slate-300
                "
              >
                {feature.description}
              </p>

            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;