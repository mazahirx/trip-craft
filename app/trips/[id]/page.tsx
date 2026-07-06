import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { TripView } from "@/components/trip/trip-view";

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const { id } = await params;

  return (
    <SidebarLayout title="Trip">
      <TripView tripId={id} />
    </SidebarLayout>
  );
}
