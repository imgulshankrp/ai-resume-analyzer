import { useState } from "react";

import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

export default function MainLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = () => {
    setSidebarOpen(true);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">

      {/* =====================================================
          DESKTOP SIDEBAR
          Visible when sidebar is open
      ===================================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          hidden w-72
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          dark:border-slate-800
          dark:bg-slate-950
          lg:block
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar onClose={closeSidebar} />
      </aside>


      {/* =====================================================
          MOBILE SIDEBAR
      ===================================================== */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-[60]
          w-72 max-w-[85vw]
          border-r border-slate-200
          bg-white
          shadow-2xl
          transition-transform duration-300
          dark:border-slate-800
          dark:bg-slate-950
          lg:hidden
          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        <Sidebar onClose={closeSidebar} />
      </aside>


      {/* =====================================================
          MOBILE OVERLAY
      ===================================================== */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          onClick={closeSidebar}
          className="
            fixed inset-0 z-50
            bg-slate-950/50
            backdrop-blur-[2px]
            lg:hidden
          "
        />
      )}


      {/* =====================================================
          MAIN AREA
      ===================================================== */}
      <div
        className={`
          flex min-h-screen flex-col
          transition-all duration-300
          ${
            sidebarOpen
              ? "lg:ml-72"
              : "lg:ml-0"
          }
        `}
      >

        {/* ===================================================
            NAVBAR
        =================================================== */}
        <header className="sticky top-0 z-40">
          <Navbar
            sidebarOpen={sidebarOpen}
            onMenuClick={toggleSidebar}
          />
        </header>


        {/* ===================================================
            PAGE CONTENT
        =================================================== */}
        <main className="flex-1">

          <div
            className="
              mx-auto
              w-full
              max-w-[1600px]
              px-4
              py-5
              sm:px-6
              sm:py-6
              lg:px-8
              lg:py-7
            "
          >
            {children}
          </div>

        </main>

      </div>

    </div>
  );
}