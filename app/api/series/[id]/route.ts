// app/api/series/[id]/route.ts
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/app/lib/mongodb"; // adjust path if needed
import { encrypt, encryptToken } from "@/app/lib/crypto"; // optional — remove if not used
import { Redis } from "@upstash/redis";

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL ?? "";
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN ?? "";
const CACHE_TTL = Number(process.env.CACHE_TTL_SECONDS ?? "3600"); // seconds

let redis: Redis | null = null;
if (UPSTASH_URL && UPSTASH_TOKEN) {
  try {
    redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN });
  } catch (err) {
    console.warn("Upstash client init failed:", err);
    redis = null;
  }
}

function cacheKeyForId(id: string, season: number) {
  return `series:id:${id}:season:${season}`;
}

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    // must await params in App Router
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // validate ObjectId
    if (!/^[0-9a-fA-F]{24}$/.test(id)) {
      return NextResponse.json({ error: "id must be a 24-char hex string" }, { status: 400 });
    }

    // resolve season (default 1)
    const url = new URL(req.url);
    const seasonParam = url.searchParams.get("season");
    let seasonIndex = 0;
    if (seasonParam) {
      const n = Number(seasonParam);
      if (!Number.isNaN(n) && n >= 1) seasonIndex = n - 1;
    }
    const seasonNumber = seasonIndex + 1;
    const cacheKey = cacheKeyForId(id, seasonNumber);

    // Try Redis cache first (best-effort)
    if (redis) {
      try {
        const cached = await redis.get(cacheKey);
        if (cached) {
          // cached may be a string (we stored JSON string) -> parse
          const payload = typeof cached === "string" ? JSON.parse(cached) : cached;
          return NextResponse.json(payload, {
            status: 200,
            headers: { "x-cache": "HIT" },
          });
        }
      } catch (rerr) {
        console.warn("Redis GET failed (continuing):", rerr);
      }
    }

    // Not cached — query MongoDB
    const db = await getDatabase();
    const col = db.collection("series_data");

    const show = await col.findOne({ _id: new ObjectId(id) });
    if (!show) return NextResponse.json({ error: "Show not found" }, { status: 404 });

    const seasonsArray = Array.isArray(show.seasons_data) ? show.seasons_data : [];
    if (!seasonsArray[seasonIndex]) {
      return NextResponse.json({ error: "Season not found" }, { status: 404 });
    }
    const seasonData = seasonsArray[seasonIndex] ?? {};

    // transform episodes and encrypt URLs where present
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
            // Expire in 120 seconds (2 minutes)
            const expire = Date.now() + 120 * 1000;
            encryptedUrl = encryptToken({ url: ep.url, expire });
          }
        } catch (err) {
          console.error("Encryption failed for episode url:", err);
          encryptedUrl = null;
        }

        return { title, description, image_url, url: encryptedUrl };
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

    // Cache the payload (best-effort)
    if (redis) {
      try {
        await redis.set(cacheKey, JSON.stringify(payload), { ex: CACHE_TTL });
      } catch (rerr) {
        console.warn("Redis SET failed (continuing):", rerr);
      }
    }

    return NextResponse.json(payload, {
      status: 200,
      headers: { "Cache-Control": "no-store", "x-cache": "MISS" },
    });
  } catch (err) {
    console.error("API /api/series/[id] error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
