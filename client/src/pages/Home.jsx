import { useNavigate } from "react-router-dom";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";

function Home() {
  const navigate = useNavigate();

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-[#07111F] text-white">

      {/* =========================================
          PROFESSIONAL TOP NAV
      ========================================== */}
      <header
        className="
          fixed
          left-0
          right-0
          top-0
          z-50
          border-b
          border-white/[0.06]
          bg-[#07111F]/80
          backdrop-blur-xl
        "
      >
        <div
          className="
            mx-auto
            flex
            h-20
            max-w-7xl
            items-center
            justify-between
            px-5
            sm:px-8
            lg:px-10
          "
        >

          {/* Logo */}
          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gradient-to-br
                from-teal-400
                to-blue-500
                shadow-lg
                shadow-teal-500/20
              "
            >
              <span className="text-lg">
                📄
              </span>
            </div>

            <div>
              <h2 className="text-lg font-bold tracking-tight">
                Resume<span className="text-teal-400">AI</span>
              </h2>

              <p className="hidden text-[10px] text-slate-500 sm:block">
                AI Resume Analyzer
              </p>
            </div>

          </div>


          {/* Navigation */}
          <div className="flex items-center gap-2 sm:gap-4">

            <button
              onClick={scrollToFeatures}
              className="
                rounded-xl
                px-4
                py-2.5
                text-sm
                font-medium
                text-slate-300
                transition
                duration-300
                hover:bg-white/[0.06]
                hover:text-white
                sm:px-5
              "
            >
              Features
            </button>


            <button
              onClick={() => navigate("/signup")}
              className="
                rounded-xl
                bg-gradient-to-r
                from-teal-400
                to-blue-500
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                shadow-lg
                shadow-teal-500/20
                transition
                duration-300
                hover:-translate-y-0.5
                hover:shadow-xl
                hover:shadow-teal-500/30
                sm:px-6
              "
            >
              Sign Up
            </button>

          </div>

        </div>
      </header>


      {/* =========================================
          HERO — PAGE 1
      ========================================== */}
      <main>

        <section className="min-h-screen">
          <Hero />
        </section>


        {/* =========================================
            FEATURES — PAGE 2
        ========================================== */}
        <section
          id="features"
          className="min-h-screen"
        >
          <Features />
        </section>

      </main>

    </div>
  );
}

export default Home;