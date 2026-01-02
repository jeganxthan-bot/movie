// app/api/shows/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";

export const runtime = "nodejs";

interface Show {
  _id: any;
  show_title: string;
  series_logo?: string;
  poster?: string;
  seasons_data?: any[]; // if available as array
  seasons?: number | string;
  description?: string;
  year?: string | number;
  [key: string]: any;
}

interface ShowDTO {
  _id: string;
  show_title: string;
  series_logo?: string;
  poster: string;
  description: string;
  seasons: number;
  year: string | number | null;
}

/* Helper: try to resolve seasons count to a number */
function resolveSeasonsCount(show: Show): number {
  // 1) If seasons_data is an array, prefer its length
  if (Array.isArray(show.seasons_data)) return show.seasons_data.length;

  // 2) If seasons is a number
  if (typeof show.seasons === "number" && Number.isFinite(show.seasons)) {
    return Math.max(0, Math.floor(show.seasons));
  }

  // 3) If seasons is a string like "5 Seasons" or "5"
  if (typeof show.seasons === "string") {
    const m = show.seasons.match(/\d+/);
    if (m) return Number(m[0]);
  }

  // fallback: 0
  return 0;
}

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const category = url.searchParams.get("category"); // 'series' or 'movie'

    const db = await getDatabase();
    
    let seriesDTO: ShowDTO[] = [];
    let movieDTO: ShowDTO[] = [];

    // Filter logic
    const fetchAll = !category || category === "all";
    const fetchSeriesAll = category === "series_all";
    const fetchAnime = category === "anime" || fetchAll || fetchSeriesAll;
    const fetchSeriesOnly = category === "series" || fetchAll || fetchSeriesAll;
    const fetchMovie = category === "movie" || fetchAll;

    // Fetch from series_data (Anime and Series)
    if (fetchAnime || fetchSeriesOnly) {
      const query: any = {};
      if (category === "anime") query.category = "anime";
      else if (category === "series") query.category = "series";

      const series = (await db.collection("series_data").find(query).toArray()) as unknown as Show[];
      seriesDTO = series.map((show) => ({
        _id: show._id?.toString?.() ?? String(show._id ?? ""),
        show_title: show.show_title ?? "",
        series_logo: show.series_logo ?? "",
        poster: show.poster ?? "",
        description: show.description ?? "",
        seasons: resolveSeasonsCount(show),
        year: show.year ?? null,
      }));
    }
    
    // Fetch from movie_data
    if (fetchMovie) {
      const movies = (await db.collection("movie_data").find({}).toArray()) as any[];
      movieDTO = movies.map((movie) => ({
        _id: movie._id?.toString?.() ?? String(movie._id ?? ""),
        show_title: movie.title ?? "",
        series_logo: movie.series_logo ?? "",
        poster: movie.poster ?? "",
        description: movie.description ?? "",
        seasons: 1, // Treat movie as 1 season "show"
        year: movie.year ?? null,
      }));
    }

    // Combine both
    let allShows = [...seriesDTO, ...movieDTO];

    // Sort by show_title
    allShows.sort((a, b) => (a.show_title || "").localeCompare(b.show_title || ""));

    return NextResponse.json(allShows, { status: 200 });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
