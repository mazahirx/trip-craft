import { NextResponse } from "next/server";
import { searchNominatim } from "@/lib/geocoding/nominatim";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");
  if (!q || !q.trim()) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  const results = await searchNominatim(q);
  return NextResponse.json(
    results.map((r) => ({
      displayName: r.display_name,
      latitude: parseFloat(r.lat),
      longitude: parseFloat(r.lon),
    }))
  );
}
