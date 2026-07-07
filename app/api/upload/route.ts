import { NextResponse } from "next/server";
import { createClient } from "@/lib/auth/server";
import { createAdminClient } from "@/lib/db/admin-client";

export async function POST(request: Request) {
  const user = await createClient().then((s) => s.auth.getUser()).then((r) => r.data.user);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const tripId = formData.get("tripId") as string | null;

  if (!file || !tripId) {
    return NextResponse.json({ error: "Missing file or tripId" }, { status: 400 });
  }

  const ext = file.name.split(".").pop() || "jpg";
  const filePath = `${tripId}/cover.${ext}`;

  const admin = createAdminClient();
  const { data, error } = await admin.storage
    .from("trip-covers")
    .upload(filePath, file, { upsert: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { data: { publicUrl } } = admin.storage
    .from("trip-covers")
    .getPublicUrl(data.path);

  return NextResponse.json({ url: publicUrl });
}
