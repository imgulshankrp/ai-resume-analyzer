import { NavLink } from "react-router-dom";
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
  {
    name: "Logout",
    path: "/login",
    icon: LogOut,
  },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between">
      <div>
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-slate-200 dark:border-slate-800">
          <h1 className="text-2xl font-bold text-blue-600">
            ResumeAI
          </h1>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
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

      {/* Bottom Section */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
        {bottomItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </div>
    </aside>
  );
}