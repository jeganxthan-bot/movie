// components/AdsenseAd.tsx
"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdsenseAd({
  adSlot,
  className,
  style,
  testMode = process.env.NODE_ENV !== "production",
}: {
  adSlot: string;
  className?: string;
  style?: React.CSSProperties;
  testMode?: boolean;
}) {
  useEffect(() => {
    let mounted = true;
    // Poll for window.adsbygoogle for up to 5s (check every 200ms)
    const maxMs = 5000;
    const intervalMs = 200;
    let elapsed = 0;

    const tryPush = () => {
      try {
        if (!mounted) return;
        if (typeof window === "undefined") return;

        if (Array.isArray(window.adsbygoogle)) {
          // Runtime is ready — push once
          try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
          } catch (err) {
            // swallow harmless errors (e.g., blocked by browser extensions)
            // but keep them in dev console if you want:
            // console.debug("adsbygoogle push failed:", err);
          }
          return true;
        }

        return false;
      } catch (err) {
        // defensive
        return false;
      }
    };

    if (!tryPush()) {
      const iv = window.setInterval(() => {
        elapsed += intervalMs;
        if (tryPush() || elapsed >= maxMs) {
          window.clearInterval(iv);
        }
      }, intervalMs);
    }

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <ins
      className={`adsbygoogle ${className ?? ""}`}
      style={style ?? { display: "block" }}
      data-ad-client="ca-pub-5519525788719863"
      data-ad-slot={adSlot}
      data-ad-format="auto"
      data-full-width-responsive="true"
      // show test ad in non-prod (dev)
      {...(testMode ? { "data-adtest": "on" } : {})}
    />
  );
}
