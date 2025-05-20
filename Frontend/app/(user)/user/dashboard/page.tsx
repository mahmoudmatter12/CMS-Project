import ActionsSection from "@/components/userDashboard/ActionsSection";
import Blogs from "@/components/userDashboard/Blogs/Blogs";
import ImportantFormsSection from "@/components/userDashboard/ImportantFormsSection";
import NotificationsCenter from "@/components/userDashboard/NotificationsCenter";
import TrackingSection from "@/components/userDashboard/TrackingSection";
import UserDashBoardHeroSection from "@/components/userDashboard/UserDashBoardHeroSection";

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Welcome Header */}

      <UserDashBoardHeroSection />



      <hr className="my-8 border-white " />
      <TrackingSection />

      <ImportantFormsSection />
      <hr className="my-8 border-white " />


      {/* Trending colorFULL Blogs Cards */}
      <Blogs />
      <hr className="my-8 border-white " />

      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        {/* Recent Notifications */}
        <NotificationsCenter />
        {/* Recent Activity */}
        {/* <RecentActivity /> */}
      </div>
      <hr className="my-8 border-white " />

      {/* All Features */}
      <ActionsSection />


    </div>
  );
}