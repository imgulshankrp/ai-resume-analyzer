import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const linkStyle = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-blue-600"
        : "text-gray-700 hover:text-blue-600"
    }`;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          AI Resume Analyzer
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/" className={linkStyle("/")}>
            Home
          </Link>

          <Link to="/upload" className={linkStyle("/upload")}>
            Upload
          </Link>

          <Link to="/history" className={linkStyle("/history")}>
            History
          </Link>

          <Link to="/dashboard" className={linkStyle("/dashboard")}>
            Dashboard
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;