import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 transition-all duration-300">

      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-72 border-r border-slate-200 dark:border-slate-800 lg:block">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="lg:ml-72 flex min-h-screen flex-col">

        {/* Navbar */}
        <header className="sticky top-0 z-30">
          <Navbar />
        </header>

        {/* Page Content */}
        <main className="flex-1">

          <div className="mx-auto w-full max-w-[1600px] px-5 py-6 sm:px-8 lg:px-10">

            {children}

          </div>

        </main>

      </div>

    </div>
  );
}