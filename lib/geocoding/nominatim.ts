export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
}

export async function searchNominatim(query: string): Promise<NominatimResult[]> {
  if (!query.trim()) return [];

  const url = new URL("https://nominatim.openstreetmap.org/search");
  url.searchParams.set("q", query);
  url.searchParams.set("format", "json");
  url.searchParams.set("limit", "5");
  url.searchParams.set("addressdetails", "0");

  url.searchParams.set("accept-language", "en");

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "TripCraft/1.0 (travel-planner-app)",
      "Accept-Language": "en",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];
  return res.json();
}
