import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

import WelcomeBanner from "../components/dashboard/WelcomeBanner";
import StatsCards from "../components/dashboard/StatsCards";
import AnalyticsChart from "../components/dashboard/AnalyticsChart";
import RecentResume from "../components/dashboard/RecentResume";
import QuickActions from "../components/dashboard/QuickActions";
import ActivityTimeline from "../components/dashboard/ActivityTimeline";
import UpgradeCard from "../components/dashboard/UpgradeCard";
import UserCard from "../components/dashboard/UserCard";
import DashboardAnalytics from "../components/dashboard/DashboardAnalytics.jsx";

export default function Dashboard() {
  return (
    <MainLayout>
      <motion.div
        className="mx-auto w-full max-w-[1600px] space-y-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Welcome */}
        <WelcomeBanner />

        {/* Stats */}
        <StatsCards />

        {/* Analytics */}
        <DashboardAnalytics />

        {/* Recent Resume + Quick Actions */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <RecentResume />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <QuickActions />
          </motion.div>
        </div>

        {/* Timeline + User */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <ActivityTimeline />
          </div>

          <UserCard />
        </div>

        {/* Upgrade */}
        <UpgradeCard />
      </motion.div>
    </MainLayout>
  );
}
