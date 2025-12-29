"use client";

import Script from "next/script";

export default function AdTag() {
  return (
    <>
      {/* Load aclib script FIRST (example URL – adjust if needed) */}
      <Script
        id="aclib"
        src="//acscdn.com/script/aclib.js"
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
                zoneId: 'ty8tfjuxfj',
              });
            }
          `,
        }}
      />
    </>
  );
}
