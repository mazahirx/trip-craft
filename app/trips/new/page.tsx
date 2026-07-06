import { SidebarLayout } from "@/components/layout/sidebar-layout";
import { TripCreator } from "@/components/trip/trip-creator";

export default function NewTripPage() {
  return (
    <SidebarLayout title="New Trip" breadcrumb={[{ label: "My Trips", href: "/trips" }]}>
      <div className="max-w-lg mx-auto">
        <h1 className="text-headline-lg text-primary">Create a new trip</h1>
        <p className="text-body-md text-text-secondary mt-2">
          You&apos;ll start in anonymous mode — sign up anytime to save forever.
        </p>
        <div className="mt-spacing-gap-lg border border-border-subtle rounded-lg p-spacing-gap-md bg-surface">
          <TripCreator />
        </div>
      </div>
    </SidebarLayout>
  );
}
