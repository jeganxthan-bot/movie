import { NextResponse } from "next/server";
import { decrypt } from "../../lib/crypto";

export const runtime = "nodejs";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { encryptedUrl } = body;

        if (!encryptedUrl) {
            return new NextResponse(
                JSON.stringify({ error: "encryptedUrl is required" }),
                { status: 400 }
            );
        }

        const decryptedUrl = await decrypt(encryptedUrl);

        return new NextResponse(
            JSON.stringify({ decryptedUrl }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error: any) {
        console.error("Decryption Error:", error);
        return new NextResponse(
            JSON.stringify({ error: "Failed to decrypt URL" }),
            { status: 500 }
        );
    }
}
