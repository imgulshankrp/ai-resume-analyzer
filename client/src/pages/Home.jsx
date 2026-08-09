import { useState } from "react";

import Navbar from "../components/common/Navbar";
import Sidebar from "../components/common/Sidebar";

import Hero from "../components/home/Hero";
import Features from "../components/home/Features";

function Home() {
  // Desktop: sidebar open
  // Mobile/tablet: sidebar closed
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;

    return window.innerWidth >= 1024;
  });

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <div className="fixed left-0 right-0 top-0 z-50">
        <Navbar
          sidebarOpen={sidebarOpen}
          onMenuClick={handleMenuClick}
        />
      </div>

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-20
          bottom-0
          z-40
          w-72
          overflow-y-auto
          border-r
          border-slate-200
          bg-white
          shadow-xl
          transition-transform
          duration-300
          ease-in-out
          dark:border-slate-800
          dark:bg-slate-900
          
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar />
      </aside>

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={() => setSidebarOpen(false)}
          className="
            fixed
            inset-0
            top-20
            z-30
            bg-black/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}

      {/* =====================================================
          HOME CONTENT
      ===================================================== */}

      <main
        className={`
          min-h-screen
          pt-20
          transition-all
          duration-300

          ${
            sidebarOpen
              ? "lg:ml-72"
              : "lg:ml-0"
          }
        `}
      >
        <Hero />

        <Features />
      </main>

    </div>
  );
}

export default Home;