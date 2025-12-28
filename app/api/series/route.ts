// app/api/series/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";

/* -------------------------
   Helpers
-------------------------- */
function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function toArray(value: any): string[] {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    return value
      .split(/[,|/]/)
      .map((v) => v.trim())
      .filter(Boolean);
  }
  return [];
}

/* -------------------------
   Route handler
-------------------------- */
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const showTitleParam = url.searchParams.get("show_title")?.trim() ?? null;
    const searchParam = url.searchParams.get("search")?.trim() ?? null;
    const seasonParam = url.searchParams.get("season")?.trim() ?? null;

    const db = await getDatabase();
    const col = db.collection("series_data");

    /* -------------------------
       1) SEARCH
    -------------------------- */
    if (searchParam) {
      const regex = new RegExp(escapeRegex(searchParam), "i");

      const docs = await col
        .find({ show_title: { $regex: regex } })
        .project({ show_title: 1, poster: 1, series_logo: 1 })
        .limit(100)
        .toArray();

      return NextResponse.json(
        {
          results: docs.map((d) => ({
            _id: d._id.toString(),
            show_title: d.show_title ?? "",
            poster: d.poster ?? "",
            series_logo: d.series_logo ?? "",
          })),
          total: docs.length,
        },
        { status: 200 }
      );
    }

    /* -------------------------
       2) FULL SHOW
    -------------------------- */
    if (!showTitleParam) {
      return NextResponse.json(
        { error: "show_title query param required" },
        { status: 400 }
      );
    }

    let seasonIndex = 0;
    if (seasonParam) {
      const n = Number(seasonParam);
      if (Number.isNaN(n) || n < 1) {
        return NextResponse.json(
          { error: "Invalid season parameter" },
          { status: 400 }
        );
      }
      seasonIndex = n - 1;
    }
    const seasonNumber = seasonIndex + 1;

    const show = await col.findOne({ show_title: showTitleParam });
    if (!show) {
      return NextResponse.json({ error: "Show not found" }, { status: 404 });
    }

    const seasonsArray = Array.isArray(show.seasons_data)
      ? show.seasons_data
      : [];

    if (!seasonsArray[seasonIndex]) {
      return NextResponse.json(
        { error: "Season not found" },
        { status: 404 }
      );
    }

    const seasonData = seasonsArray[seasonIndex];

    /* -------------------------
       Episodes
    -------------------------- */
    const transformedEpisodes: Record<string, any[]> = {};
    for (const [groupKey, episodes] of Object.entries(seasonData)) {
      transformedEpisodes[groupKey] = Array.isArray(episodes)
        ? episodes.map((ep: any) => ({
            title: ep?.title ?? ep?.episode_title ?? "",
            description: ep?.description ?? ep?.summary ?? "",
            image_url: ep?.image_url ?? ep?.image ?? "",
            url: ep?.url ?? null,
          }))
        : [];
    }

    /* -------------------------
       FINAL PAYLOAD (🔥 FIXED)
    -------------------------- */
    const payload = {
      _id: show._id.toString(),
      show_title: show.show_title ?? "",
      year: show.year ?? null,
      rating: show.rating ?? null,
      description: show.description ?? "",
      series_logo: show.series_logo ?? "",
      poster: show.poster ?? "",
      fanart: show.fanart ?? show.background ?? "",

      seasons_count: Array.isArray(show.seasons)
        ? show.seasons.length
        : show.seasons ?? null,

      creators: toArray(show.creators),
      cast: toArray(show.cast),
      starring: toArray(show.starring),
      show_characteristics: toArray(show.show_characteristics),
      audio: toArray(show.audio),
      subtitles: toArray(show.subtitles),

      season: seasonNumber,
      data: transformedEpisodes,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (err) {
    console.error("API Error /api/series:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
