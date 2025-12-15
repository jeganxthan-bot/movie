// app/components/ArtPlayer.tsx
"use client";

import { useEffect, useRef } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";

interface PlayerProps {
  option: {
    url: string;
    autoplay?: boolean;
    [key: string]: any;
  };
  getInstance?: (art: Artplayer) => void;
  className?: string;
}

const AUDIO_KEY = "player:last-audio";

export default function Player({ option, getInstance, className }: PlayerProps) {
  const artRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!artRef.current) return;
    if (!option || !option.url) return;

    // DEBUG (you can remove later):
    console.log("[ArtPlayer] init with url:", option.url);

    const art = new (Artplayer as any)({
      ...option,
      // 👇 Force HLS handling regardless of file extension
      type: "m3u8",
      container: artRef.current,
      customType: {
        m3u8: function (video: HTMLVideoElement, url: string, artInstance: any) {
          console.log("[ArtPlayer] customType.m3u8 with url:", url);

          if (Hls.isSupported()) {
            if ((artInstance as any).hls) (artInstance as any).hls.destroy();

            const hls = new Hls({
              capLevelToPlayerSize: true,
            });
            hls.loadSource(url);
            hls.attachMedia(video);
            (artInstance as any).hls = hls;

            const savedAudio = (() => {
              const v = localStorage.getItem(AUDIO_KEY);
              if (v === null) return null;
              const n = Number(v);
              return Number.isNaN(n) ? null : n;
            })();

            const save = (k: string, v: any) => {
              try {
                localStorage.setItem(k, String(v));
              } catch (e) {}
            };

            const applySavedSelections = () => {
              try {
                if (typeof savedAudio === "number") {
                  hls.audioTrack = savedAudio;
                }
              } catch (e) {}
            };

            hls.on(Hls.Events.MANIFEST_PARSED, () => {
              console.log("[HLS] manifest parsed");

              // AUDIO TRACKS
              if (hls.audioTracks && hls.audioTracks.length > 0) {
                artInstance.setting.add({
                  html: "Audio",
                  tooltip: hls.audioTracks[hls.audioTrack]?.name ?? "Default",
                  selector: hls.audioTracks.map((track: any, index: number) => ({
                    html: track.name || `Track ${index + 1}`,
                    default: index === (savedAudio ?? hls.audioTrack),
                    url: index,
                  })),
                  onSelect: (item: any) => {
                    hls.audioTrack = item.url;
                    save(AUDIO_KEY, item.url);
                    return item.html;
                  },
                });
              }

              applySavedSelections();
            });

            // Sync to localStorage if HLS changes internally
            hls.on(Hls.Events.AUDIO_TRACK_SWITCHED, (_ev: any, _data: any) => {
              try {
                save(AUDIO_KEY, hls.audioTrack);
              } catch (e) {}
            });

            artInstance.on("destroy", () => {
              try {
                hls.destroy();
              } catch (e) {}
            });
          } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            // Safari / iOS native HLS
            video.src = url;
          } else {
            (artInstance as any).notice.show = "Unsupported playback format: m3u8";
          }
        },
      },
    });

    if (getInstance) getInstance(art);

    return () => {
      try {
        art?.destroy(false);
      } catch (e) {}
    };
    // Recreate player whenever URL changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [option?.url]);

  return (
    <div
      ref={artRef}
      className={className}
      style={{ width: "100%", height: "100%", backgroundColor: "black" }}
    />
  );
}
