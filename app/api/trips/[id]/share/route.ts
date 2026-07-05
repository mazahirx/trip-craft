import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { db } from "@/lib/db";
import { tripShareTokens } from "@/lib/db/schema";
import { getUser } from "@/lib/auth/server";
import { createShareTokenSchema } from "@/lib/validation/trip";

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
  const parsed = createShareTokenSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const token = randomBytes(32).toString("hex");

  const [shareToken] = await db
    .insert(tripShareTokens)
    .values({
      tripId,
      token,
      accessLevel: parsed.data.accessLevel,
      expiresAt: parsed.data.expiresAt
        ? new Date(parsed.data.expiresAt)
        : null,
    })
    .returning();

  return NextResponse.json(shareToken, { status: 201 });
}
