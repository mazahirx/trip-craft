import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { trips } from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { createTripSchema } from "@/lib/validation/trip";

export async function POST(request: Request) {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createTripSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [trip] = await db
    .insert(trips)
    .values({
      ownerId: user.id,
      title: parsed.data.title,
      currency: parsed.data.currency,
      startDate: parsed.data.startDate ? new Date(parsed.data.startDate) : null,
      endDate: parsed.data.endDate ? new Date(parsed.data.endDate) : null,
    })
    .returning();

  return NextResponse.json(trip, { status: 201 });
}

export async function GET() {
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userTrips = await db
    .select()
    .from(trips)
    .where(eq(trips.ownerId, user.id));

  return NextResponse.json(userTrips);
}
