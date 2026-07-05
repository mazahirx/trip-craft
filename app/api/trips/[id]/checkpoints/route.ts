import { NextResponse } from "next/server";
import { eq, max } from "drizzle-orm";
import { db } from "@/lib/db";
import { checkpoints } from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { createCheckpointSchema } from "@/lib/validation/trip";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function POST(request: Request, { params }: RouteParams) {
  const { id: tripId } = await params;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createCheckpointSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  let orderIndex = parsed.data.orderIndex;
  if (orderIndex === undefined) {
    const [result] = await db
      .select({ maxIndex: max(checkpoints.orderIndex) })
      .from(checkpoints)
      .where(eq(checkpoints.tripId, tripId));
    orderIndex = (result?.maxIndex ?? -1) + 1;
  }

  const [checkpoint] = await db
    .insert(checkpoints)
    .values({
      tripId,
      orderIndex,
      locationName: parsed.data.locationName,
      latitude: parsed.data.latitude?.toString(),
      longitude: parsed.data.longitude?.toString(),
      arrivalDate: parsed.data.arrivalDate
        ? new Date(parsed.data.arrivalDate)
        : null,
      departureDate: parsed.data.departureDate
        ? new Date(parsed.data.departureDate)
        : null,
      notes: parsed.data.notes,
    })
    .returning();

  return NextResponse.json(checkpoint, { status: 201 });
}
