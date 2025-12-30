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
        onLoad={() => {
          if ((window as any).aclib && typeof (window as any).aclib.runAutoTag === 'function') {
            (window as any).aclib.runAutoTag({
              zoneId: 'ty8tfjuxfj',
            });
          }
        }}
      />
    </>
  );
}
