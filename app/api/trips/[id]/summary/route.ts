import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { trips, companions, budgetItems } from "@/lib/db/schema";
import {
  computeTotalBudget,
  computeTotalDays,
  computePerPerson,
} from "@/lib/trip-utils";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;

  const [trip] = await db.select().from(trips).where(eq(trips.id, id));
  if (!trip) {
    return NextResponse.json({ error: "Trip not found" }, { status: 404 });
  }

  const [tripCompanions, tripBudgetItems] = await Promise.all([
    db.select().from(companions).where(eq(companions.tripId, id)),
    db.select().from(budgetItems).where(eq(budgetItems.tripId, id)),
  ]);

  const totalDays = computeTotalDays(trip.startDate, trip.endDate);
  const totalBudget = computeTotalBudget(tripBudgetItems);
  const perPerson = computePerPerson(totalBudget, tripCompanions.length);

  return NextResponse.json({ totalDays, totalBudget, perPerson });
}
