import MainLayout from "../components/layout/MainLayout";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileSkills from "../components/profile/ProfileSkills";
import QuickActions from "../components/profile/QuickActions";
import RecentActivity from "../components/profile/RecentActivity";

export default function Profile() {
  return (
    <MainLayout>
      <div className="space-y-8">

        {/* Header */}
        <ProfileHeader />

        {/* Stats */}
        <ProfileStats />

        {/* Skills + Quick Actions */}
        <div className="grid gap-8 xl:grid-cols-3">

          <div className="xl:col-span-2">
            <ProfileSkills />
          </div>

          <QuickActions />

        </div>

        {/* Activity */}
        <RecentActivity />

      </div>
    </MainLayout>
  );
}