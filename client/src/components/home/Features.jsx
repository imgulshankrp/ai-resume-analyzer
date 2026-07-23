import { FaChartLine, FaFileAlt, FaLightbulb, FaUserCheck } from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine className="text-4xl text-blue-600" />,
    title: "ATS Score",
    description:
      "Get an ATS compatibility score and understand how recruiters' systems view your resume.",
  },
  {
    icon: <FaFileAlt className="text-4xl text-green-600" />,
    title: "Resume Analysis",
    description:
      "Analyze your resume for formatting, keywords, readability, and structure.",
  },
  {
    icon: <FaLightbulb className="text-4xl text-yellow-500" />,
    title: "Smart Suggestions",
    description:
      "Receive personalized suggestions to improve your resume and increase interview chances.",
  },
  {
    icon: <FaUserCheck className="text-4xl text-purple-600" />,
    title: "Skill Detection",
    description:
      "Automatically detect technical and soft skills from your uploaded resume.",
  },
];

function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center text-gray-800">
          Why Choose Resume Analyzer?
        </h2>

        <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
          Everything you need to build a stronger, ATS-friendly resume.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 hover:-translate-y-2 hover:shadow-xl transition duration-300"
            >
              <div className="mb-5">{feature.icon}</div>

              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm leading-7">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;