import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import {
  trips,
  companions,
  checkpoints,
  stays,
  budgetItems,
  notes,
} from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { updateTripSchema } from "@/lib/validation/trip";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();

  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  if (user && trip.ownerId !== user.id) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const [tripCompanions, tripCheckpoints, tripBudgetItems, tripNotes] =
    await Promise.all([
      db.select().from(companions).where(eq(companions.tripId, id)),
      db.select().from(checkpoints).where(eq(checkpoints.tripId, id)),
      db.select().from(budgetItems).where(eq(budgetItems.tripId, id)),
      db.select().from(notes).where(eq(notes.tripId, id)),
    ]);

  const checkpointsWithStays = await Promise.all(
    tripCheckpoints.map(async (cp) => {
      const cpStays = await db
        .select()
        .from(stays)
        .where(eq(stays.checkpointId, cp.id));
      return { ...cp, stays: cpStays };
    })
  );

  return NextResponse.json({
    ...trip,
    companions: tripCompanions,
    checkpoints: checkpointsWithStays,
    budgetItems: tripBudgetItems,
    notes: tripNotes,
  });
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateTripSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [trip] = await db
    .update(trips)
    .set({
      ...parsed.data,
      startDate: parsed.data.startDate
        ? new Date(parsed.data.startDate)
        : undefined,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : undefined,
      updatedAt: new Date(),
    })
    .where(eq(trips.id, id))
    .returning();

  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  return NextResponse.json(trip);
}
