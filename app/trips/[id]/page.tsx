import { AppShell } from "@/components/layout/app-shell";
import { TripView } from "@/components/trip/trip-view";

interface TripPageProps {
  params: Promise<{ id: string }>;
}

export default async function TripPage({ params }: TripPageProps) {
  const { id } = await params;

  return (
    <AppShell>
      <TripView tripId={id} />
    </AppShell>
  );
}
