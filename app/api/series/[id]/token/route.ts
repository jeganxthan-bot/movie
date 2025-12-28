import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase } from "@/app/lib/mongodb";
import { encryptToken } from "@/app/lib/crypto";

export const runtime = "nodejs";

export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await context.params;
        const { searchParams } = new URL(req.url);
        const season = parseInt(searchParams.get("season") || "1", 10);
        const group = searchParams.get("group");
        const index = parseInt(searchParams.get("index") || "0", 10);

        if (!id || !group) {
            return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
        }

        const db = await getDatabase();
        const col = db.collection("series_data");
        const show = await col.findOne({ _id: new ObjectId(id) });

        if (!show) {
            return NextResponse.json({ error: "Show not found" }, { status: 404 });
        }

        const seasonsArray = Array.isArray(show.seasons_data) ? show.seasons_data : [];
        const seasonIndex = season - 1;
        const seasonData = seasonsArray[seasonIndex];

        if (!seasonData) {
            return NextResponse.json({ error: "Season not found" }, { status: 404 });
        }

        const episodes = seasonData[group];
        if (!Array.isArray(episodes) || !episodes[index]) {
            return NextResponse.json({ error: "Episode not found" }, { status: 404 });
        }

        const episode = episodes[index];
        const url = episode.url;

        if (!url) {
            return NextResponse.json({ error: "No URL for this episode" }, { status: 404 });
        }

        // Generate token with 120s expiry
        const expire = Date.now() + 120 * 1000;
        const token = await encryptToken({ url, expire });

        return NextResponse.json({ token });

    } catch (error) {
        console.error("Token generation error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
