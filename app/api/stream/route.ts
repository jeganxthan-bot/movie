import { NextResponse } from "next/server";
import { decryptToken } from "../../lib/crypto";

export const runtime = "nodejs";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const enc = searchParams.get("enc");

    if (!enc) {
        return new NextResponse("Missing enc param", { status: 400 });
    }

    let tokenData;
    try {
        tokenData = await decryptToken(enc);
    } catch (error) {
        console.error("Token decryption failed:", error);
        return new NextResponse("Invalid token", { status: 403 });
    }

    const { url: videoUrl, expire } = tokenData;

    if (!videoUrl) {
        return new NextResponse("Invalid token data", { status: 403 });
    }

    if (Date.now() > expire) {
        return new NextResponse("Token expired", { status: 410 });
    }

    // Prevent hotlinking
    const referer = request.headers.get("referer");
    if (!referer || !referer.includes(request.headers.get("host") || "")) {
        // Optional: Allow if no referer (direct access) or strict check?
        // For now, let's just log it or be strict if we want to force iframe usage on our site.
        // But some browsers/privacy tools hide referer. 
        // Let's be lenient but safer: if referer exists, it must match.
        if (referer && !referer.includes(request.headers.get("host") || "")) {
            return new NextResponse("Forbidden", { status: 403 });
        }
    }

    // Prepare headers for the upstream request
    const headers = new Headers();
    const range = request.headers.get("range");
    if (range) {
        headers.set("range", range);
    }
    const userAgent = request.headers.get("user-agent");
    if (userAgent) {
        headers.set("user-agent", userAgent);
    }

    try {
        console.log("Proxying stream for:", videoUrl);
        const response = await fetch(videoUrl, {
            headers,
        });

        console.log("Upstream status:", response.status);
        const contentType = response.headers.get("Content-Type");
        console.log("Upstream Content-Type:", contentType);

        if (contentType?.includes("text/html")) {
            console.warn("WARNING: Upstream URL returned HTML. This is likely an embed page, not a video file. <video> tag will fail.");
        }

        if (!response.ok && response.status !== 206) {
            console.error("Upstream error:", response.status, response.statusText);
            return new NextResponse("Upstream error", { status: 502 });
        }

        // Prepare headers for the client response
        const responseHeaders = new Headers();
        responseHeaders.set("Content-Type", contentType || "video/mp4");
        responseHeaders.set("Cache-Control", "no-store");

        const contentLength = response.headers.get("Content-Length");
        if (contentLength) {
            responseHeaders.set("Content-Length", contentLength);
        }

        const contentRange = response.headers.get("Content-Range");
        if (contentRange) {
            responseHeaders.set("Content-Range", contentRange);
        }

        const acceptRanges = response.headers.get("Accept-Ranges");
        if (acceptRanges) {
            responseHeaders.set("Accept-Ranges", acceptRanges);
        }

        return new NextResponse(response.body, {
            status: response.status,
            headers: responseHeaders,
        });

    } catch (error) {
        console.error("Stream proxy error:", error);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}
