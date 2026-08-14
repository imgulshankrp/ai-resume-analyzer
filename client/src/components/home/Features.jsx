function Features() {
  const features = [
    {
      number: "01",
      icon: "📊",
      title: "ATS Score",
      description:
        "Understand how well your resume performs against Applicant Tracking Systems and identify areas that need improvement.",
    },
    {
      number: "02",
      icon: "📄",
      title: "Resume Analysis",
      description:
        "Get a detailed analysis of your resume structure, keywords, skills, readability, and overall quality.",
    },
    {
      number: "03",
      icon: "💡",
      title: "AI Suggestions",
      description:
        "Receive practical recommendations to strengthen your resume and improve your chances of getting shortlisted.",
    },
    {
      number: "04",
      icon: "🎯",
      title: "Job Matching",
      description:
        "Compare your resume with a job description and understand your skill match, gaps, and opportunities.",
    },
  ];

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        border-t
        border-white/[0.05]
        bg-[#0A1626]
        px-5
        py-24
        sm:px-8
        lg:px-10
      "
    >

      {/* Background */}
      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-0
          h-72
          w-72
          -translate-x-1/2
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />


      <div className="relative mx-auto w-full max-w-7xl">

        {/* ==================================
            HEADER
        =================================== */}

        <div className="mx-auto mb-14 max-w-3xl text-center">

          <div
            className="
              mb-5
              inline-flex
              items-center
              rounded-full
              border
              border-teal-400/20
              bg-teal-400/[0.06]
              px-4
              py-2
              text-xs
              font-semibold
              uppercase
              tracking-[0.2em]
              text-teal-300
            "
          >
            Powerful Features
          </div>


          <h2
            className="
              text-4xl
              font-extrabold
              tracking-tight
              text-white
              sm:text-5xl
            "
          >
            Everything you need to
            <span className="text-teal-300">
              {" "}build a better resume.
            </span>
          </h2>


          <p
            className="
              mx-auto
              mt-5
              max-w-2xl
              text-base
              leading-7
              text-slate-400
              sm:text-lg
            "
          >
            From ATS scoring to job matching, ResumeAI gives you
            the tools you need to understand, improve, and optimize
            your resume.
          </p>

        </div>


        {/* ==================================
            CARDS
        =================================== */}

        <div
          className="
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          {features.map((feature) => (
            <div
              key={feature.number}
              className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                border-white/[0.08]
                bg-[#0F1D2E]
                p-6
                transition-all
                duration-300
                hover:-translate-y-2
                hover:border-teal-400/30
                hover:shadow-2xl
                hover:shadow-teal-500/[0.08]
              "
            >

              {/* Number */}
              <span
                className="
                  absolute
                  right-5
                  top-5
                  text-xs
                  font-bold
                  tracking-widest
                  text-slate-700
                "
              >
                {feature.number}
              </span>


              {/* Icon */}
              <div
                className="
                  mb-7
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-teal-400/10
                  bg-teal-400/[0.08]
                  text-xl
                  transition
                  duration-300
                  group-hover:scale-110
                  group-hover:bg-teal-400/15
                "
              >
                {feature.icon}
              </div>


              {/* Title */}
              <h3
                className="
                  text-xl
                  font-bold
                  text-white
                "
              >
                {feature.title}
              </h3>


              {/* Description */}
              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-400
                "
              >
                {feature.description}
              </p>


              {/* Bottom line */}
              <div
                className="
                  mt-7
                  h-px
                  w-10
                  bg-teal-400/40
                  transition-all
                  duration-300
                  group-hover:w-16
                  group-hover:bg-teal-400
                "
              />

            </div>
          ))}

        </div>


        {/* Bottom CTA */}
        <div className="mt-12 text-center">

          <p className="mb-4 text-sm text-slate-500">
            Ready to improve your resume?
          </p>

          <button
            className="
              rounded-xl
              border
              border-teal-400/30
              bg-teal-400/[0.06]
              px-6
              py-3
              text-sm
              font-semibold
              text-teal-300
              transition
              duration-300
              hover:bg-teal-400
              hover:text-slate-950
            "
          >
            Start Analyzing →
          </button>

        </div>

      </div>

    </section>
  );
}

export default Features;