import { useState } from "react";
import Navbar from "../common/Navbar";
import Sidebar from "../common/Sidebar";

export default function MainLayout({ children }) {
  // Desktop: sidebar open by default
  // Mobile/tablet: sidebar closed by default
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window === "undefined") return true;

    return window.innerWidth >= 1024;
  });

  const handleMenuClick = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">

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
          MAIN AREA
      ===================================================== */}
      <div className="flex pt-20 min-h-screen">

        {/* ===================================================
            SIDEBAR
        =================================================== */}
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
            dark:border-slate-800
            dark:bg-slate-900
            transition-transform
            duration-300
            ease-in-out

            ${
              sidebarOpen
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >
          <Sidebar />
        </aside>

        {/* ===================================================
            MAIN CONTENT
        =================================================== */}
        <main
          className={`
            min-h-[calc(100vh-5rem)]
            min-w-0
            flex-1
            overflow-x-hidden
            transition-all
            duration-300

            ${
              sidebarOpen
                ? "lg:ml-72"
                : "lg:ml-0"
            }
          `}
        >
          <div className="w-full min-w-0 p-4 sm:p-5 lg:p-6">
            {children}
          </div>
        </main>

        {/* ===================================================
            MOBILE BACKDROP
        =================================================== */}
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
              lg:hidden
            "
          />
        )}

      </div>
    </div>
  );
}