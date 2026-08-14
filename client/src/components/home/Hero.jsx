import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="
        relative
        flex
        min-h-screen
        items-center
        overflow-hidden
        bg-[#07111F]
        px-5
        pb-12
        pt-28
        sm:px-8
        lg:px-10
      "
    >

      {/* =====================================
          BACKGROUND GLOW
      ====================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -left-40
          top-20
          h-96
          w-96
          rounded-full
          bg-teal-500/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-0
          h-[500px]
          w-[500px]
          rounded-full
          bg-blue-500/10
          blur-3xl
        "
      />


      {/* =====================================
          CONTENT
      ====================================== */}

      <div
        className="
          relative
          mx-auto
          grid
          w-full
          max-w-7xl
          items-center
          gap-12
          lg:grid-cols-[1.05fr_0.95fr]
        "
      >

        {/* ===================================
            LEFT
        ==================================== */}

        <div className="max-w-2xl">

          {/* Badge */}
          <div
            className="
              mb-6
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-teal-400/20
              bg-teal-400/[0.08]
              px-4
              py-2
              text-xs
              font-semibold
              tracking-wide
              text-teal-300
              sm:text-sm
            "
          >
            <span className="h-2 w-2 rounded-full bg-teal-400" />

            AI-POWERED RESUME ANALYZER
          </div>


          {/* Heading */}
          <h1
            className="
              text-4xl
              font-extrabold
              leading-[1.05]
              tracking-[-0.03em]
              text-white
              sm:text-5xl
              lg:text-6xl
              xl:text-7xl
            "
          >
            Build a resume
            <br />

            that gets you

            <span
              className="
                block
                bg-gradient-to-r
                from-teal-300
                via-cyan-300
                to-blue-400
                bg-clip-text
                text-transparent
              "
            >
              noticed.
            </span>
          </h1>


          {/* Description */}
          <p
            className="
              mt-6
              max-w-xl
              text-base
              leading-7
              text-slate-400
              sm:text-lg
            "
          >
            Analyze your resume, improve ATS compatibility,
            discover missing skills, and match your profile
            with real job opportunities — all in one place.
          </p>


          {/* CTA */}
          <div className="mt-8 flex flex-wrap items-center gap-4">

            <button
              onClick={() => navigate("/signup")}
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-teal-400
                to-blue-500
                px-6
                py-3.5
                text-sm
                font-bold
                text-white
                shadow-xl
                shadow-teal-500/20
                transition
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-teal-500/30
                sm:px-7
              "
            >
              Analyze My Resume

              <span
                className="
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </button>

          </div>


          {/* Trust indicators */}
          <div
            className="
              mt-8
              flex
              flex-wrap
              gap-x-6
              gap-y-3
              text-xs
              text-slate-500
              sm:text-sm
            "
          >
            <span className="flex items-center gap-2">
              <span className="text-teal-400">✓</span>
              ATS Analysis
            </span>

            <span className="flex items-center gap-2">
              <span className="text-teal-400">✓</span>
              AI Suggestions
            </span>

            <span className="flex items-center gap-2">
              <span className="text-teal-400">✓</span>
              Job Matching
            </span>
          </div>

        </div>


        {/* ===================================
            RIGHT — ANALYSIS CARD
        ==================================== */}

        <div className="relative mx-auto w-full max-w-md">

          {/* Glow */}
          <div
            className="
              absolute
              inset-10
              rounded-full
              bg-teal-400/10
              blur-3xl
            "
          />


          <div
            className="
              relative
              rounded-3xl
              border
              border-white/10
              bg-[#0D1B2C]/90
              p-6
              shadow-2xl
              shadow-black/40
              backdrop-blur-xl
              sm:p-7
            "
          >

            {/* Card Header */}
            <div className="flex items-center justify-between">

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex
                    h-11
                    w-11
                    items-center
                    justify-center
                    rounded-xl
                    bg-teal-400/10
                    text-xl
                  "
                >
                  📄
                </div>

                <div>
                  <h3 className="font-bold text-white">
                    Resume Analysis
                  </h3>

                  <p className="text-xs text-slate-500">
                    Latest analysis
                  </p>
                </div>

              </div>


              <span
                className="
                  rounded-full
                  border
                  border-teal-400/20
                  bg-teal-400/10
                  px-3
                  py-1
                  text-xs
                  font-semibold
                  text-teal-300
                "
              >
                Completed
              </span>

            </div>


            {/* Score */}
            <div className="flex justify-center py-8">

              <div
                className="
                  flex
                  h-40
                  w-40
                  flex-col
                  items-center
                  justify-center
                  rounded-full
                  border-[8px]
                  border-teal-400/20
                  bg-teal-400/[0.04]
                  shadow-[0_0_50px_rgba(20,184,166,0.12)]
                "
              >

                <span
                  className="
                    text-4xl
                    font-extrabold
                    text-teal-300
                  "
                >
                  92%
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  ATS Score
                </span>

              </div>

            </div>


            {/* Analysis Items */}
            <div className="space-y-3">

              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-3
                "
              >
                <span className="text-sm text-slate-300">
                  ATS Friendly
                </span>

                <span className="font-bold text-teal-400">
                  ✓
                </span>
              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-3
                "
              >
                <span className="text-sm text-slate-300">
                  AI Suggestions
                </span>

                <span className="font-bold text-teal-400">
                  ✓
                </span>
              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-3
                "
              >
                <span className="text-sm text-slate-300">
                  Job Match
                </span>

                <span className="font-semibold text-blue-400">
                  92%
                </span>
              </div>


              <div
                className="
                  flex
                  items-center
                  justify-between
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.03]
                  px-4
                  py-3
                "
              >
                <span className="text-sm text-slate-300">
                  PDF Report
                </span>

                <span className="text-sm font-semibold text-slate-300">
                  Ready
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;