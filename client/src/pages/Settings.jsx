import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";

import AppearanceSection from "../components/settings/AppearanceSection";
import NotificationSection from "../components/settings/NotificationSection";
import SecuritySection from "../components/settings/SecuritySection";
import DangerZone from "../components/settings/DangerZone";

export default function Settings() {
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto w-full max-w-6xl space-y-6 px-3 sm:px-5 lg:px-6 pb-8"
      >
        {/* ================================
            SETTINGS HEADER
        ================================= */}

        <div className="rounded-2xl border border-cyan-400/20 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600 p-5 sm:p-6 shadow-lg">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15 text-2xl backdrop-blur-sm">
                  ⚙️
                </div>

                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white">
                    Settings
                  </h1>

                  <p className="mt-1 text-sm text-blue-100">
                    Manage your application preferences and security.
                  </p>
                </div>
              </div>
            </div>

            {/* Account Status */}

            <div className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-md">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-400/20">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </div>

              <div>
                <p className="text-xs text-blue-100">
                  Account Status
                </p>

                <p className="text-base font-bold text-white">
                  Active
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* ================================
            APPEARANCE
        ================================= */}

        <AppearanceSection />

        {/* ================================
            NOTIFICATIONS
        ================================= */}

        <NotificationSection />

        {/* ================================
            SECURITY
        ================================= */}

        <SecuritySection />

        {/* ================================
            PRIVACY
        ================================= */}

        {/*
        <PrivacySection />
        */}

        {/* ================================
            DANGER ZONE
        ================================= */}

        <DangerZone />

      </motion.div>
    </MainLayout>
  );
}