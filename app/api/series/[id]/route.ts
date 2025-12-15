// app/api/series/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/app/lib/mongodb";
import { encryptToken } from "@/app/lib/crypto"; // keep only what is used

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // App Router params must be awaited
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Validate Mongo ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json(
        { error: "id must be a 24-char hex string" },
        { status: 400 }
      );
    }

    // Resolve season (default = 1)
    const url = new URL(req.url);
    const seasonParam = url.searchParams.get("season");

    let seasonIndex = 0;
    if (seasonParam) {
      const n = Number(seasonParam);
      if (!Number.isNaN(n) && n >= 1) seasonIndex = n - 1;
    }
    const seasonNumber = seasonIndex + 1;

    // Query MongoDB
    const db = await getDatabase();
    const col = db.collection("series_data");

    const show = await col.findOne({ _id: new ObjectId(id) });
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const seasonsArray = Array.isArray(show.seasons_data)
      ? show.seasons_data
      : [];

    if (!seasonsArray[seasonIndex]) {
      return NextResponse.json({ error: "Season not found" }, { status: 404 });
    }

    const seasonData = seasonsArray[seasonIndex] ?? {};

    // Transform episodes + encrypt URLs
    const transformed: Record<string, any[]> = {};

    for (const [groupKey, eps] of Object.entries(seasonData)) {
      if (!Array.isArray(eps)) {
        transformed[groupKey] = [];
        continue;
      }

      transformed[groupKey] = eps.map((ep: any) => {
        const title = ep?.title ?? ep?.episode_title ?? "";
        const description = ep?.description ?? ep?.summary ?? "";
        const image_url = ep?.image_url ?? ep?.image ?? "";

        let encryptedUrl: string | null = null;

        try {
          if (ep?.url) {
            // Token expires in 2 minutes
            const expire = Date.now() + 120 * 1000;
            encryptedUrl = encryptToken({ url: ep.url, expire });
          }
        } catch (err) {
          console.error("Encryption failed:", err);
        }

        return {
          title,
          description,
          image_url,
          url: encryptedUrl,
        };
      });
    }

    const payload = {
      _id: show._id.toString(),
      show_title: show.show_title ?? "",
      year: show.year ?? "",
      rating: show.rating ?? "",
      seasons_count: show.seasons_count ?? seasonsArray.length,
      description: show.description ?? "",
      series_logo: show.series_logo ?? "",
      trailer_url: show.trailer_url ?? "",
      poster: show.poster ?? "",
      creators: show.creators ?? [],
      cast: show.cast ?? [],
      starring: show.starring ?? [],
      show_characteristics: show.show_characteristics ?? [],
      audio: show.audio ?? [],
      subtitles: show.subtitles ?? [],
      season: seasonNumber,
      data: transformed,
    };

    return NextResponse.json(payload, {
      status: 200,
      headers: { "Cache-Control": "no-store" },
    });
  } catch (err) {
    console.error("API /api/series/[id] error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
