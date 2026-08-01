import MainLayout from "../components/layout/MainLayout";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileStats from "../components/profile/ProfileStats";
import ProfileSkills from "../components/profile/ProfileSkills";
import QuickActions from "../components/profile/QuickActions";
import RecentActivity from "../components/profile/RecentActivity";

export default function Profile() {
  return (
    <MainLayout>
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <ProfileHeader />

        {/* Stats */}
        <ProfileStats />

        {/* Skills */}
        <ProfileSkills />

        {/* Quick Actions + Recent Activity */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          <QuickActions />

          <RecentActivity />

        </div>

      </div>
    </MainLayout>
  );
}