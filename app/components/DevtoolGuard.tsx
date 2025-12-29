"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function DevToolsGuard() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If we are already on the 404 page, do not run protections, 
    // effectively stopping the redirect loop.
    if (pathname === "/404") return;

    // --------------------------------------------------------------------------
    //  State / Constants
    // --------------------------------------------------------------------------
    let redirected = false;
    // Threshold for execution time (ms). If a block takes longer, we assume
    // a debugger/breakpoint paused the thread.
    const DEBUG_THRESHOLD = 100;

    /**
     * Triggered when DevTools is detected.
     * 1. Clear the screen immediately to hide content.
     * 2. Redirect to /404.
     */
    const triggerDetection = () => {
      if (redirected) return;
      redirected = true;

      // Aggressive immediate hiding
      try {
        if (typeof document !== "undefined") {
          document.documentElement.innerHTML = "";
          window.location.href = "/404";
        }
      } catch (e) {
        // safety catch
      }

      router.replace("/404");
    };

    /**
     * Aggressively clears console to hide URLs/logs.
     * Note: This can be annoying during legitimate dev, so use carefully.
     */
    const clearConsole = () => {
      if (process.env.NODE_ENV === "production") {
        // Only clear in production or if strictly requested
        console.clear();
      }
    };

    // --------------------------------------------------------------------------
    // 1) Debugger Loop (The "Red Pill")
    //
    // Repeatedly hit `debugger;`. If DevTools is open, this will likely pause execution,
    // freezing the page or jumping to sources.
    // Also measures time delta; if execution pauses, delta > threshold => Detected.
    // --------------------------------------------------------------------------
    const debugLoop = () => {
      const start = performaceNow();
      // eslint-disable-next-line no-debugger
      debugger;
      const end = performaceNow();

      if (end - start > DEBUG_THRESHOLD) {
        triggerDetection();
      }
    };

    // Helper for cross-browser performance.now
    const performaceNow = () => {
      return performance ? performance.now() : Date.now();
    }

    const intervalId = setInterval(() => {
      debugLoop();
      clearConsole();
    }, 1000);


    // --------------------------------------------------------------------------
    // 2) Resize Detection
    // --------------------------------------------------------------------------
    const threshold = 160;
    const detectResize = () => {
      const widthDiff = window.outerWidth - window.innerWidth;
      const heightDiff = window.outerHeight - window.innerHeight;

      if (widthDiff > threshold || heightDiff > threshold) {
        triggerDetection();
      }
    };
    const resizeInterval = setInterval(detectResize, 500);


    // --------------------------------------------------------------------------
    // 3) Keyboard Shortcuts
    // --------------------------------------------------------------------------
    const keyHandler = (e: KeyboardEvent) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key)) || // Chrome/Edge shortcuts
        (e.ctrlKey && e.key === "U") // View Source
      ) {
        e.preventDefault();
        triggerDetection();
      }
    };
    document.addEventListener("keydown", keyHandler);


    // --------------------------------------------------------------------------
    // 4) Right Click Disable
    // --------------------------------------------------------------------------
    const contextHandler = (e: MouseEvent) => {
      e.preventDefault();
      // Optionally trigger detection strictly on right click, 
      // or just block strictly? 
      // triggerDetection(); // strict
    };
    document.addEventListener("contextmenu", contextHandler);


    // --------------------------------------------------------------------------
    // 5) Console Object Trap
    //    Older trick: detect property access on a custom ID object logged to console.
    // --------------------------------------------------------------------------
    const consoleTrap = () => {
      const img = new Image();
      Object.defineProperty(img, "id", {
        get() {
          triggerDetection();
          return "detect";
        },
      });
      // We log it only once. If they have console open, it tries to read 'id'.
      // However, console.clear() in the loop might wipe this too fast.
      // We'll re-log periodically if we want to catch them opening it later.
      console.log(img);
    };
    // Re-trigger trap logic occasionally
    const trapInterval = setInterval(consoleTrap, 2000);

    // Initial call
    consoleTrap();

    // --------------------------------------------------------------------------
    // 6) Prevent Selection (optional, but requested "increase protection")
    // --------------------------------------------------------------------------
    document.body.style.userSelect = "none";
    // @ts-ignore
    document.body.style.WebkitUserSelect = "none";


    // Cleanup
    return () => {
      clearInterval(intervalId);
      clearInterval(resizeInterval);
      clearInterval(trapInterval);
      document.removeEventListener("keydown", keyHandler);
      document.removeEventListener("contextmenu", contextHandler);
      // restore select? check if needed
      document.body.style.userSelect = "";
      // @ts-ignore
      document.body.style.WebkitUserSelect = "";
    };
  }, [router]);

  return null;
}
