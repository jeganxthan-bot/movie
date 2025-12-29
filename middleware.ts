import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory store for rate limiting
// In a serverless environment like Cloudflare Pages functions, this state 
// is usually per-instance. It's not a perfect distributed rate limiter 
// (which would require Redis/KV), but it's good for preventing single-source bursts.
const rateLimitMap = new Map();

interface RateLimitData {
  count: number;
  lastReset: number;
}

export function middleware(request: NextRequest) {
  // Exclude static files and Next.js internals
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/static') ||
    request.nextUrl.pathname.match(/\.(ico|png|jpg|jpeg|svg|css|js)$/)
  ) {
    return NextResponse.next();
  }

  const ip = request.headers.get('x-forwarded-for') || 'ip';
  const limit = 20; // 20 requests
  const windowMs = 60 * 1000; // per 1 minute

  if (!rateLimitMap.has(ip)) {
      rateLimitMap.set(ip, {
        count: 0,
        lastReset: Date.now(),
      });
  }

  const ipData = rateLimitMap.get(ip) as RateLimitData;

  if (Date.now() - ipData.lastReset > windowMs) {
      ipData.count = 0;
      ipData.lastReset = Date.now();
  }

  if (ipData.count >= limit) {
    // Return JSON for API routes, HTML for others
    if (request.nextUrl.pathname.startsWith('/api')) {
      return new NextResponse(
        JSON.stringify({ success: false, message: 'Too Many Requests' }),
        { status: 429, headers: { 'content-type': 'application/json' } }
      );
    } else {
       return new NextResponse(
        `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Too Many Requests</title>
          <style>
            body { font-family: system-ui, sans-serif; background: #0f0f0f; color: #fff; display: flex; height: 100vh; align-items: center; justify-content: center; margin: 0; }
            .container { text-align: center; }
            h1 { font-size: 2rem; margin-bottom: 1rem; }
            p { color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>429 - Too Many Requests</h1>
            <p>You have exceeded the rate limit. Please try again later.</p>
          </div>
        </body>
        </html>
        `,
        { status: 429, headers: { 'content-type': 'text/html' } }
      );
    }
  }

  ipData.count += 1;
    
  // Add headers
  const response = NextResponse.next();
  response.headers.set('X-RateLimit-Limit', limit.toString());
  response.headers.set('X-RateLimit-Remaining', (limit - ipData.count).toString());
    
  return response;
}

export const config = {
  matcher: '/:path*',
};
