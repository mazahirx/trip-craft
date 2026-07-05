import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { checkpoints } from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { updateCheckpointSchema } from "@/lib/validation/trip";

interface RouteParams {
  params: Promise<{ id: string; cpId: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const { cpId } = await params;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = updateCheckpointSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [checkpoint] = await db
    .update(checkpoints)
    .set({
      locationName: parsed.data.locationName,
      latitude: parsed.data.latitude?.toString(),
      longitude: parsed.data.longitude?.toString(),
      arrivalDate: parsed.data.arrivalDate
        ? new Date(parsed.data.arrivalDate)
        : undefined,
      departureDate: parsed.data.departureDate
        ? new Date(parsed.data.departureDate)
        : undefined,
      notes: parsed.data.notes,
      orderIndex: parsed.data.orderIndex,
    })
    .where(eq(checkpoints.id, cpId))
    .returning();

  if (!checkpoint) {
    return NextResponse.json({ error: "Checkpoint not found" }, { status: 404 });
  }

  return NextResponse.json(checkpoint);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { cpId } = await params;
  const user = await getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [deleted] = await db
    .delete(checkpoints)
    .where(eq(checkpoints.id, cpId))
    .returning();

  if (!deleted) {
    return NextResponse.json({ error: "Checkpoint not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
