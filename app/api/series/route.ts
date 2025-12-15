// app/api/series/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";

/* -------------------------
   Helpers
-------------------------- */
function escapeRegex(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function keyForTitleSeason(title: string, season: number) {
  return `series:title:${(title ?? "unknown").trim().toLowerCase().replace(/\s+/g, "_")}:season:${season}`;
}
function keyForSearch(q: string) {
  return `series:search:${q.trim().toLowerCase().replace(/\s+/g, "_")}`;
}

/* -------------------------
   Types
-------------------------- */
interface Show {
  _id: any;
  show_title: string;
  series_logo?: string;
  poster?: string;
  seasons_data?: any[];
  [key: string]: any;
}
interface ShowDTO {
  _id: string;
  show_title: string;
  series_logo?: string;
  poster?: string;
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

    // -------------------------
    // 1) Partial search => query DB
    // -------------------------
    if (searchParam) {
      const normalized = searchParam.trim();
      const q = escapeRegex(normalized);
      const regex = new RegExp(q, "i");
      const proj = { show_title: 1, poster: 1, series_logo: 1 };

      const docs = await col.find({ show_title: { $regex: regex } }, { projection: proj }).limit(100).toArray();

      const results: ShowDTO[] = docs.map((d: any) => ({
        _id: d._id?.toString?.() ?? String(d._id),
        show_title: d.show_title ?? "",
        poster: d.poster ?? "",
        series_logo: d.series_logo ?? "",
      }));

      const payload = { results, total: results.length };

      return NextResponse.json(payload, { status: 200 });
    }

    // -------------------------
    // 2) Exact show_title -> full payload
    // -------------------------
    if (showTitleParam) {
      // season handling
      const seasonsArrayFromDoc = async (showDoc: any) =>
        Array.isArray(showDoc?.seasons_data) ? showDoc.seasons_data : [];

      let seasonIndex = 0;
      if (seasonParam) {
        const n = Number(seasonParam);
        if (Number.isNaN(n) || n < 1) {
          return NextResponse.json({ error: "Invalid season parameter" }, { status: 400 });
        }
        seasonIndex = Math.max(0, n - 1);
      }
      const seasonNumber = seasonIndex + 1;

      // Not cached -> find show
      const show = (await col.findOne({ show_title: showTitleParam })) as Show | null;
      if (!show) return NextResponse.json({ error: "Show not found" }, { status: 404 });

      const seasonsArray = Array.isArray(show.seasons_data) ? show.seasons_data : [];
      if (!seasonsArray[seasonIndex]) {
        return NextResponse.json({ error: "Season not found" }, { status: 404 });
      }
      const seasonData = seasonsArray[seasonIndex] ?? {};

      // transform episodes
      const transformedEpisodes: Record<string, any[]> = {};
      for (const [groupKey, episodes] of Object.entries(seasonData)) {
        if (!Array.isArray(episodes)) {
          transformedEpisodes[groupKey] = [];
          continue;
        }
        transformedEpisodes[groupKey] = episodes.map((ep: any) => {
          const title = ep?.title ?? ep?.episode_title ?? "";
          const description = ep?.description ?? ep?.summary ?? "";
          const image_url = ep?.image_url ?? ep?.image ?? "";
          return {
            title,
            description,
            image_url,
            url: ep?.url ?? null,
          };
        });
      }

      const payload = {
        _id: show._id?.toString?.() ?? String(show._id),
        show_title: show.show_title ?? "",
        year: show.year ?? null,
        rating: show.rating ?? null,
        seasons_count: Array.isArray(show.seasons) ? show.seasons.length : show.seasons ?? null,
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
        data: transformedEpisodes,
      };

      return NextResponse.json(payload, { status: 200 });
    }

    // 3) neither provided
    return NextResponse.json({ error: "Either 'search' or 'show_title' query param is required" }, { status: 400 });
  } catch (err) {
    console.error("API Error /api/series:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
