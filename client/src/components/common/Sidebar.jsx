import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  Brain,
  MessageSquare,
  Briefcase,
  GitCompare,
  History,
  User,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload Resume",
    path: "/upload",
    icon: Upload,
  },
  {
    name: "AI Analysis",
    path: "/analysis",
    icon: Brain,
  },
  {
    name: "Resume Chat",
    path: "/chat",
    icon: MessageSquare,
  },
  {
    name: "JD Matcher",
    path: "/jd-matcher",
    icon: Briefcase,
  },
  {
    name: "Compare Resume",
    path: "/compare",
    icon: GitCompare,
  },
  {
    name: "History",
    path: "/history",
    icon: History,
  },
];

const bottomItems = [
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", { replace: true });
  };

  return (
    <aside className="flex min-h-screen w-72 flex-col justify-between border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">

      {/* Top */}

      <div>

        {/* Logo */}

        <div className="flex h-20 items-center justify-center border-b border-slate-200 dark:border-slate-800">

          <h1 className="text-2xl font-bold text-blue-600">
            ResumeAI
          </h1>

        </div>

        {/* Navigation */}

        <nav className="space-y-2 p-4">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  }`
                }
              >
                <Icon size={20} />

                <span>{item.name}</span>
              </NavLink>
            );
          })}

        </nav>

      </div>

      {/* Bottom */}

      <div className="space-y-2 border-t border-slate-200 p-4 dark:border-slate-800">

        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-300 ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`
              }
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

        {/* Logout */}

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-600 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <LogOut size={20} />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}