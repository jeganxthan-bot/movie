// app/api/series/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";

/* -------------------------
   Helpers
-------------------------- */
export const runtime = "nodejs";

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

      const seriesDocs = await db.collection("series_data")
        .find({ show_title: { $regex: regex } })
        .limit(50)
        .toArray();

      const movieDocs = await db.collection("movie_data")
        .find({ title: { $regex: regex } })
        .limit(50)
        .toArray();

      const combinedResults = [
        ...seriesDocs.map(d => ({
          _id: d._id.toString(),
          show_title: d.show_title ?? "",
          poster: d.poster ?? "",
          series_logo: d.series_logo ?? "",
          year: d.year ?? "",
          description: d.description ?? "",
          seasons: d.seasons ?? "",
        })),
        ...movieDocs.map(d => ({
          _id: d._id.toString(),
          show_title: d.title ?? "",
          poster: d.poster ?? "",
          series_logo: d.series_logo ?? "",
          year: d.year ?? "",
          description: d.description ?? "",
          seasons: "Movie",
        }))
      ];

      // Sort by show_title
      combinedResults.sort((a, b) => (a.show_title || "").localeCompare(b.show_title || ""));

      return NextResponse.json(
        {
          results: combinedResults,
          total: combinedResults.length,
        },
        { status: 200 }
      );
    }

    /* -------------------------
       2) FULL SHOW / MOVIE
    -------------------------- */
    if (!showTitleParam) {
      return NextResponse.json(
        { error: "show_title query param required" },
        { status: 400 }
      );
    }

    let show = await db.collection("series_data").findOne({ show_title: showTitleParam });
    let isMovie = false;

    if (!show) {
      show = await db.collection("movie_data").findOne({ title: showTitleParam });
      if (show) isMovie = true;
    }

    if (!show) {
      return NextResponse.json({ error: "Show or Movie not found" }, { status: 404 });
    }

    if (isMovie) {
      const payload = {
        _id: show._id.toString(),
        show_title: show.title ?? "",
        year: show.year ?? null,
        rating: show.rating ?? null,
        description: show.description ?? "",
        series_logo: show.series_logo ?? "",
        poster: show.poster ?? "",
        fanart: show.fanart ?? show.background ?? "",
        seasons_count: 1,
        creators: toArray(show.creators),
        cast: toArray(show.cast),
        starring: toArray(show.starring),
        show_characteristics: toArray(show.show_characteristics),
        audio: toArray(show.audio),
        subtitles: toArray(show.subtitles),
        season: 1,
        data: {
          "Movie": [
            {
              title: show.title ?? "",
              description: show.description ?? "",
              image_url: show.poster ?? "",
              url: show.url ?? null,
            }
          ]
        },
      };
      return NextResponse.json(payload, { status: 200 });
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
