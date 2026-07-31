import Sidebar from "../common/Sidebar";
import Navbar from "../common/Navbar";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">

      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 lg:block">
        <Sidebar />
      </aside>

      {/* Main */}
      <div className="flex min-h-screen flex-col lg:ml-72">

        {/* Top Navbar */}
        <Navbar />

        {/* Page */}
        <main className="flex-1 p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}