// app/api/shows/route.ts
import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mongodb";
import { Redis } from "@upstash/redis";

interface Show {
  _id: any;
  show_title: string;
  series_logo?: string;
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

/* Upstash client */
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL ?? "",
  token: process.env.UPSTASH_REDIS_REST_TOKEN ?? "",
});

const CACHE_TTL = 60 * 60 * 24 * 7; // 7 days

async function fetchTmdbPoster(title: string): Promise<string | null> {
  try {
    const apiKey = process.env.TMDB_API_KEY;
    if (!apiKey) return null;

    const url = `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${encodeURIComponent(
      title
    )}`;

    const res = await fetch(url);
    if (!res.ok) {
      console.warn("TMDB responded non-200:", res.status);
      return null;
    }

    const data = await res.json();
    const posterPath = data?.results?.[0]?.poster_path;
    if (!posterPath) return null;

    return `https://image.tmdb.org/t/p/w500${posterPath}`;
  } catch (e) {
    console.error("TMDB FETCH ERROR:", e);
    return null;
  }
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

export async function GET() {
  try {
    const db = await getDatabase();
    const shows = (await db.collection("series_data").find({}).toArray()) as unknown as Show[];

    const showsDTO: ShowDTO[] = [];

    for (const show of shows) {
      const keyTitle = (show.show_title ?? "").toString().toLowerCase().replace(/\s+/g, "_");
      const cacheKey = `poster:${keyTitle}`;

      // Try Redis cache
      let cachedPoster: string | null = null;
      try {
        const cached = await redis.get(cacheKey);
        cachedPoster = typeof cached === "string" ? cached : null;
      } catch (err) {
        // Log and continue if redis fails
        console.warn("Redis GET failed:", err);
      }

      let finalPoster = cachedPoster ?? "";

      // If not cached, fetch from TMDB and store
      if (!finalPoster) {
        const tmdbPoster = await fetchTmdbPoster(show.show_title ?? "");
        finalPoster = tmdbPoster ?? "";

        // Best-effort cache set
        try {
          await redis.set(cacheKey, finalPoster, { ex: CACHE_TTL });
        } catch (err) {
          console.warn("Redis SET failed:", err);
        }
      }

      // Build DTO fields
      const dto: ShowDTO = {
        _id: show._id?.toString?.() ?? String(show._id ?? ""),
        show_title: show.show_title ?? "",
        series_logo: show.series_logo ?? "",
        poster: finalPoster,
        description: show.description ?? "",
        seasons: resolveSeasonsCount(show),
        year: show.year ?? null,
      };

      showsDTO.push(dto);
    }

    return NextResponse.json(showsDTO, { status: 200 });
  } catch (e) {
    console.error("API ERROR:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
