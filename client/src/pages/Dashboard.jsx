import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import DashboardAnalytics from "../components/dashboard/DashboardAnalytics";
import RecentResume from "../components/dashboard/RecentResume";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import UserCard from "../components/dashboard/UserCard";
import UpgradeCard from "../components/dashboard/UpgradeCard";

export default function Dashboard() {
  return (
    <MainLayout>
      <motion.div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          space-y-8
          px-3
          py-4
          sm:px-5
          sm:py-6
          lg:px-8
        "
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* =========================
            WELCOME
        ========================== */}
        <WelcomeBanner />

        {/* =========================
            STATISTICS
        ========================== */}
        <StatsCards />

        {/* =========================
            ANALYTICS
        ========================== */}
        <DashboardAnalytics />

        {/* =========================
            RECENT RESUME + QUICK ACTIONS
        ========================== */}
        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-6
            lg:gap-8
            xl:grid-cols-2
          "
        >
          {/* Recent Resume */}
          <motion.div
            className="flex min-w-0 h-full"
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.2,
            }}
          >
            <div className="w-full h-full">
              <RecentResume />
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            className="flex min-w-0 h-full"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.3,
            }}
          >
            <div className="w-full h-full">
              <QuickActions />
            </div>
          </motion.div>
        </div>

        {/* =========================
            RECENT ACTIVITY + USER CARD
        ========================== */}
        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-6
            lg:gap-8
            xl:grid-cols-3
          "
        >
          {/* Recent Activity */}
          <motion.div
            className="
              flex
              min-w-0
              h-full
              xl:col-span-2
            "
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.35,
            }}
          >
            <div className="w-full h-full">
              <ActivityTimeline />
            </div>
          </motion.div>

          {/* User Card */}
          <motion.div
            className="flex min-w-0 h-full"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.45,
              delay: 0.4,
            }}
          >
            <div className="w-full h-full">
              <UserCard />
            </div>
          </motion.div>
        </div>

        {/* =========================
            UPGRADE
        ========================== */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.45,
            delay: 0.45,
          }}
        >
          <UpgradeCard />
        </motion.div>
      </motion.div>
    </MainLayout>
  );
}