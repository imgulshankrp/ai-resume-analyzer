import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

import AccountSection from "../components/settings/AccountSection";
import AppearanceSection from "../components/settings/AppearanceSection";
import NotificationSection from "../components/settings/NotificationSection";
import SecuritySection from "../components/settings/SecuritySection";
 import PrivacySection from "../components/settings/PrivacySection";
import DangerZone from "../components/settings/DangerZone";

export default function Settings() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-7xl space-y-8"
      >
        {/* Header */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 p-8 shadow-2xl">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div>
              <h1 className="text-4xl font-bold text-white">
                ⚙️ Settings
              </h1>

              <p className="mt-3 max-w-2xl text-blue-100 text-lg">
                Manage your account, security, notifications,
                appearance and privacy preferences from one place.
              </p>
            </div>

            <div className="rounded-2xl border border-white/20 bg-white/10 px-6 py-5 backdrop-blur-md">
              <p className="text-sm text-blue-100">
                Account Status
              </p>

              <h2 className="mt-2 text-3xl font-bold text-white">
                Active
              </h2>

              <p className="mt-2 text-sm text-blue-100">
                Everything is configured correctly.
              </p>
            </div>
          </div>
        </div>

        {/* Sections */}
        <AccountSection />

        <AppearanceSection />

        <NotificationSection />

        <SecuritySection />

        {/* Enable later */}
        {/* <PrivacySection /> */}

        <DangerZone />
      </motion.div>
    </MainLayout>
  );
}