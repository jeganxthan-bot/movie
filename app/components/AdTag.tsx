"use client";

import Script from "next/script";

export default function AdTag() {
  return (
    <>
      {/* Load aclib script FIRST (example URL – adjust if needed) */}
      <Script
        src="https://example-ad-network.com/aclib.js"
        strategy="afterInteractive"
      />

      {/* Run the inline code safely */}
      <Script
        id="aclib-autotag"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            if (window.aclib) {
              window.aclib.runAutoTag({
                zoneId: 'zrcgpvy7mc',
              });
            }
          `,
        }}
      />
    </>
  );
}
