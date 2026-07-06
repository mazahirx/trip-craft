import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { TripsDashboard } from "@/components/trip/trips-dashboard";

export default function TripsPage() {
  return (
    <SidebarLayout title="My Trips">
      <TripsDashboard />
    </SidebarLayout>
  );
}
