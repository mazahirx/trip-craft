import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { companions } from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { createCompanionSchema } from "@/lib/validation/trip";

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
  const parsed = createCompanionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const [companion] = await db
    .insert(companions)
    .values({ tripId, ...parsed.data })
    .returning();

  return NextResponse.json(companion, { status: 201 });
}
