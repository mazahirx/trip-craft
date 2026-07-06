import type { TripWithRelations } from "@/lib/trip-utils";

export async function fetchTrip(id: string): Promise<TripWithRelations> {
  const res = await fetch(`/api/trips/${id}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to load trip");
  }
  return res.json();
}

export async function createTrip(data: {
  title: string;
  currency?: string;
  startDate?: string;
  endDate?: string;
}) {
  const res = await fetch("/api/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to create trip");
  }
  return res.json();
}

export async function addCheckpoint(
  tripId: string,
  data: {
    locationName: string;
    latitude?: number;
    longitude?: number;
    arrivalDate?: string;
    departureDate?: string;
    notes?: string;
  }
) {
  const res = await fetch(`/api/trips/${tripId}/checkpoints`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to add checkpoint");
  }
  return res.json();
}

export async function deleteCheckpoint(tripId: string, cpId: string) {
  const res = await fetch(`/api/trips/${tripId}/checkpoints/${cpId}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to delete checkpoint");
  }
  return res.json();
}

export async function addBudgetItem(
  tripId: string,
  data: {
    category: string;
    amount: number;
    currency?: string;
    checkpointId?: string;
  }
) {
  const res = await fetch(`/api/trips/${tripId}/budget-items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to add budget item");
  }
  return res.json();
}

export async function updateTrip(
  tripId: string,
  data: { title?: string; currency?: string }
) {
  const res = await fetch(`/api/trips/${tripId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to update trip");
  }
  return res.json();
}

export interface GeocodeResult {
  displayName: string;
  latitude: number;
  longitude: number;
}

export async function searchLocations(query: string): Promise<GeocodeResult[]> {
  const res = await fetch(`/api/geocode?q=${encodeURIComponent(query)}`);
  if (!res.ok) return [];
  return res.json();
}
