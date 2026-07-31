import MainLayout from "../components/layout/MainLayout";

import AccountSection from "../components/settings/AccountSection";
import AppearanceSection from "../components/settings/AppearanceSection";
import NotificationSection from "../components/settings/NotificationSection";
import SecuritySection from "../components/settings/SecuritySection";
import DangerZone from "../components/settings/DangerZone";

export default function Settings() {
  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Settings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage your account preferences and security.
          </p>
        </div>

        <AccountSection />

        <AppearanceSection />

        <NotificationSection />

        <SecuritySection />

        <DangerZone />

      </div>
    </MainLayout>
  );
}