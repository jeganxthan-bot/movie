import { NextResponse } from "next/server";
import { getDatabase } from "@/app/lib/mongodb";
import { SeriesDTO } from "@/app/dto/seriesDTO";

export const runtime = "nodejs";

/* -------------------------
   Helpers
-------------------------- */
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

export async function GET() {
  try {
    const db = await getDatabase();

    // 1️⃣ get popular titles
    const popular = await db
      .collection("popular_titles")
      .find({})
      .toArray();

    const titles = popular.map((p) => p.title);

    // 2️⃣ fetch series data
    const seriesDocs = await db
      .collection("series_data")
      .find({ show_title: { $in: titles } })
      .toArray();

    // 3️⃣ fetch movie data
    const movieDocs = await db
      .collection("movie_data")
      .find({ title: { $in: titles } })
      .toArray();

    // 4️⃣ combine and map to DTO
    let response: SeriesDTO[] = [
      ...seriesDocs.map((show) => ({
        _id: show._id.toString(),
        show_title: show.show_title ?? "",
        year: show.year ?? null,
        rating: show.rating ?? null,
        seasons: show.seasons ?? null,
        description: show.description ?? "",
        series_logo: show.series_logo ?? "",
        poster: show.poster ?? "",
        fanart: show.fanart ?? show.background ?? "",
        creators: toArray(show.creators),
        cast: toArray(show.cast),
        starring: toArray(show.starring),
        show_characteristics: toArray(show.show_characteristics),
      })),
      ...movieDocs.map((movie) => ({
        _id: movie._id.toString(),
        show_title: movie.title ?? "",
        year: movie.year ?? null,
        rating: movie.rating ?? null,
        seasons: "Movie", 
        description: movie.description ?? "",
        series_logo: movie.series_logo ?? "",
        poster: movie.poster ?? "",
        fanart: movie.fanart ?? movie.background ?? "",
        creators: toArray(movie.creators),
        cast: toArray(movie.cast),
        starring: toArray(movie.starring),
        show_characteristics: toArray(movie.show_characteristics),
      }))
    ];

    // Preserve order from popular_titles
    response.sort((a, b) => {
      const idxA = titles.indexOf(a.show_title);
      const idxB = titles.indexOf(b.show_title);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });

    return NextResponse.json(response, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59'
      }
    });
  } catch (error) {
    console.error("Popular series API error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
