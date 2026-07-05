import { NextResponse } from "next/server";
import { createClient } from "@/lib/auth/server";
import { linkIdentitySchema } from "@/lib/validation/trip";

export async function POST(request: Request) {
  const body = await request.json();
  const parsed = linkIdentitySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.updateUser({
    email: parsed.data.email,
    password: parsed.data.password,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ user: data.user });
}
