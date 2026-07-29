import {
  FaTachometerAlt,
  FaUser,
  FaRobot,
  FaBriefcase,
  FaComments,
  FaHistory,
  FaBalanceScale,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import SidebarItem from "./SidebarItem";

const menuItems = [
  { title: "Dashboard", icon: <FaTachometerAlt />, path: "/dashboard" },
  { title: "Profile", icon: <FaUser />, path: "/profile" },
  { title: "AI Analysis", icon: <FaRobot />, path: "/ai-analysis" },
  { title: "JD Matcher", icon: <FaBriefcase />, path: "/jd-matcher" },
  { title: "Resume Chat", icon: <FaComments />, path: "/resume-chat" },
  { title: "History", icon: <FaHistory />, path: "/history" },
  { title: "Compare", icon: <FaBalanceScale />, path: "/compare" },
  { title: "Settings", icon: <FaCog />, path: "/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-900 text-white flex flex-col justify-between shadow-xl">
      <div>
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">
            AI Resume Analyzer
          </h1>
          <p className="text-sm text-slate-400">
            Smart Resume Intelligence
          </p>
        </div>

        <nav className="mt-6 flex flex-col gap-2 px-4">
          {menuItems.map((item) => (
            <SidebarItem
              key={item.title}
              icon={item.icon}
              title={item.title}
              path={item.path}
            />
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-700">
        <SidebarItem
          icon={<FaSignOutAlt />}
          title="Logout"
          path="/logout"
        />
      </div>
    </aside>
  );
}