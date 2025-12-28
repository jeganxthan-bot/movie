"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { MoveLeft, Play, Info } from "lucide-react";
import Loader from "@/app/components/Loader";
import ImageWithLoader from "@/app/components/ImageWithLoader";

type Episode = {
  title: string;
  description?: string;
  image_url?: string;
  url?: string | null;
  group?: string;
  idx?: number;
};

type SeasonData = {
  [seasonName: string]: Episode[];
};

type Show = {
  _id?: string;
  show_title?: string;
  year?: string;
  rating?: string;
  seasons_count?: number | string;
  description?: string;
  series_logo?: string;
  poster?: string;
  data?: SeasonData;
  season?: number;
};

export default function EpisodePlayerPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string | undefined;

  // Query params
  const encParam = searchParams?.get("enc") ?? null;
  const titleParam = searchParams?.get("t") ?? "";
  const seasonParam = searchParams?.get("season") ?? "1";
  const groupParam = searchParams?.get("group") ?? null;
  const indexParam = searchParams?.get("index") ?? null;

  // Show / episodes state
  const [show, setShow] = useState<Show | null>(null);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [seasonLoading, setSeasonLoading] = useState<number | null>(null);
  const [currentSeason, setCurrentSeason] = useState<number>(
    Number(seasonParam) || 1
  );

  // Player state
  const [streamUrl, setStreamUrl] = useState<string | null>(
    encParam ? buildStreamUrl(encParam) : null
  );
  const [error, setError] = useState<string>("");

  // Index of currently-watching episode in the flattened `episodes` array
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState<number | null>(
    null
  );

  // Utility: normalize token or url into a playable URL
  function buildStreamUrl(maybeTokenOrUrl: string | null | undefined) {
    if (!maybeTokenOrUrl) return null;
    const s = String(maybeTokenOrUrl).trim();
    if (!s) return null;
    if (
      s.startsWith("http://") ||
      s.startsWith("https://") ||
      s.startsWith("/")
    )
      return s;
    return `/api/stream?enc=${encodeURIComponent(s)}`;
  }

  // Normalize show payload to our Show type
  const normalizeShow = (data: any): Show => {
    return {
      ...(data ?? {}),
      data: data?.data ?? {},
      seasons_count: data?.seasons_count ?? data?.seasons ?? 0,
      season: data?.season ?? currentSeason,
    } as Show;
  };

  // Fetch show/season data and flatten episodes (preserve group + index)
  const fetchShow = async (season = 1) => {
    if (!id) return;
    try {
      setSeasonLoading(season);
      setError("");
      setLoading(true);

      const res = await fetch(
        `/api/series/${encodeURIComponent(id)}?season=${encodeURIComponent(
          season
        )}`
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Failed to fetch show");
        return;
      }

      const normalized = normalizeShow(data);
      setShow(normalized);
      setCurrentSeason(normalized.season ?? season);

      // flatten data -> episodes (keep group and index so we can match)
      const flattened: Episode[] = [];
      const sd: SeasonData = normalized.data ?? {};
      Object.entries(sd).forEach(([seasonName, eps]) => {
        if (Array.isArray(eps)) {
          eps.forEach((ep: any, idx: number) => {
            flattened.push({
              ...(ep ?? {}),
              group: seasonName,
              idx,
            });
          });
        }
      });
      setEpisodes(flattened);

      // set currentEpisodeIdx if URL has group+index
      if (groupParam && indexParam != null) {
        const found = flattened.findIndex(
          (e) => e.group === groupParam && Number(e.idx) === Number(indexParam)
        );
        if (found !== -1) setCurrentEpisodeIdx(found);
      } else if (encParam) {
        setCurrentEpisodeIdx(null);
      } else {
        if (flattened.length > 0) setCurrentEpisodeIdx(0);
      }
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err?.message ?? "Unknown error");
    } finally {
      setSeasonLoading(null);
      setLoading(false);
    }
  };

  // Token fetch helper
  const fetchTokenForEpisode = async (
    season: string,
    group: string,
    index: number
  ) => {
    if (!id) throw new Error("Missing show id");
    const res = await fetch(
      `/api/series/${encodeURIComponent(id)}/token?season=${encodeURIComponent(
        season
      )}&group=${encodeURIComponent(group)}&index=${index}`
    );
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? "Failed to fetch token");
    if (typeof data === "string") return buildStreamUrl(data);
    if (data?.url) return buildStreamUrl(data.url);
    if (data?.token) return buildStreamUrl(data.token);
    throw new Error("Unexpected token response");
  };

  const goToPlayer = (group: string, index: number, episodeTitle?: string) => {
    const found = episodes.findIndex(
      (e) => e.group === group && Number(e.idx) === Number(index)
    );
    if (found !== -1) setCurrentEpisodeIdx(found);

    const t = episodeTitle ? `&t=${encodeURIComponent(episodeTitle)}` : "";
    const s = currentSeason ?? Number(seasonParam) ?? 1;
    router.push(
      `/series/${id}/episode?season=${s}&group=${encodeURIComponent(
        group
      )}&index=${index}${t}`
    );
  };

  useEffect(() => {
    if (!id) return;
    fetchShow(Number(seasonParam) || 1);
  }, [id, seasonParam]);

  useEffect(() => {
    let mounted = true;
    const tryFetchToken = async () => {
      if (encParam) {
        setStreamUrl(buildStreamUrl(encParam));
        if (groupParam && indexParam != null && episodes.length > 0) {
          const found = episodes.findIndex(
            (e) =>
              e.group === groupParam && Number(e.idx) === Number(indexParam)
          );
          if (found !== -1) setCurrentEpisodeIdx(found);
        }
        return;
      }

      if (!id || !groupParam || indexParam == null) {
        return;
      }

      try {
        setLoading(true);
        setError("");
        const tokenUrl = await fetchTokenForEpisode(
          seasonParam,
          groupParam,
          Number(indexParam)
        );
        if (!mounted) return;
        setStreamUrl(tokenUrl);

        if (episodes.length > 0) {
          const found = episodes.findIndex(
            (e) =>
              e.group === groupParam && Number(e.idx) === Number(indexParam)
          );
          if (found !== -1) setCurrentEpisodeIdx(found);
        }
      } catch (err: any) {
        console.error("Token fetch error:", err);
        setError(err?.message ?? "Failed to load video");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    tryFetchToken();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, encParam, groupParam, indexParam, seasonParam, episodes]);

  // Loading / error UI
  if (loading && !show) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-[#0f0f0f] text-white">
        <Loader />
      </div>
    );
  }

  if (error && !show) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center">
        <p className="text-red-500 text-xl mb-6 font-bold">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-8 py-3 bg-[#E50914] text-white rounded font-bold hover:bg-[#b00710] transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Active episode details
  const activeEpisode =
    currentEpisodeIdx !== null && episodes[currentEpisodeIdx]
      ? episodes[currentEpisodeIdx]
      : null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white">
      {/* Back Nav */}
      <div className="absolute top-0 left-0 w-full z-50 p-6 bg-gradient-to-b from-black/80 to-transparent flex items-center">
        <button
          onClick={() => router.push(`/series/${id}`)}
          className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors group"
        >
          <div className="bg-black/50 p-2 rounded-full border border-gray-600 group-hover:border-white transition-colors">
            <MoveLeft size={24} />
          </div>
          <span className="font-bold text-lg drop-shadow-md">Back to Series</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="pt-24 pb-20 px-4 md:px-12 max-w-[1600px] mx-auto space-y-12">

        {/* Player Section */}
        <section className="w-full flex flex-col gap-6">
          <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-gray-800 ring-1 ring-white/10">
            {streamUrl ? (
              <iframe
                src={streamUrl}
                title={activeEpisode?.title || "Episode Player"}
                className="w-full h-full"
                allowFullScreen
                allow="autoplay; encrypted-media"
                style={{ border: "none" }}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 gap-4">
                <Loader />
                <p className="text-sm tracking-widest uppercase">Loading Stream...</p>
              </div>
            )}
          </div>

          {/* Episode Info */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 animate-slideUp">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                {activeEpisode?.title || show?.show_title || "Loading..."}
              </h1>
              <div className="flex items-center gap-4 text-gray-400 text-sm font-medium">
                {activeEpisode?.group && <span className="text-yellow-400">{activeEpisode.group}</span>}
                {show?.rating && <span className="border border-gray-600 px-2 py-0.5 rounded text-xs">{show.rating}</span>}
                {show?.year && <span>{show.year}</span>}
              </div>
              <p className="text-gray-300 text-lg leading-relaxed pt-2 max-w-2xl">
                {activeEpisode?.description || show?.description || "No description available."}
              </p>
            </div>

            {/* Actions (Future: Next/Prev buttons here if desired) */}
            <div className="flex gap-4">
              {/* Placeholder for Next/Prev buttons if requested */}
            </div>
          </div>
        </section>

        {/* Episode Browser (Netflix Style) */}
        <section className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Play className="text-red-600 fill-red-600" />
            Episodes
          </h2>
          {Object.entries(show?.data ?? {}).map(([seasonName, eps]) => (
            <div key={seasonName} className="space-y-4">
              {Object.keys(show?.data ?? {}).length > 1 && (
                <h3 className="text-xl text-gray-400 font-medium pl-2 border-l-4 border-red-600">{seasonName}</h3>
              )}

              <div className="flex overflow-x-auto gap-4 p-4 pb-6 scrollbar-hide snap-x">
                {Array.isArray(eps) && eps.length > 0 ? (
                  eps.map((ep, idx) => {
                    const flatIndex = episodes.findIndex(
                      (e) => e.group === seasonName && Number(e.idx) === idx
                    );
                    const isActive = flatIndex !== -1 && currentEpisodeIdx === flatIndex;

                    return (
                      <div
                        key={idx}
                        onClick={() => goToPlayer(seasonName, idx, ep.title)}
                        className={`
                                            snap-start shrink-0 w-[300px] cursor-pointer group relative rounded-lg overflow-hidden transition-all duration-300
                                            ${isActive ? "ring-2 ring-red-600 scale-[1.02]" : "hover:scale-105 opacity-80 hover:opacity-100"}
                                        `}
                      >
                        <div className="relative aspect-video bg-zinc-900">
                          {ep.image_url ? (
                            <Image
                              src={ep.image_url}
                              alt={ep.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-zinc-600">
                              <Info />
                            </div>
                          )}
                          {/* Overlay Play Icon */}
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="bg-red-600 p-3 rounded-full shadow-lg">
                              <Play fill="white" className="text-white ml-1" size={20} />
                            </div>
                          </div>
                          {/* Progress Bar (Mock) */}
                          {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-red-600" />}
                        </div>

                        <div className="p-4 bg-[#181818] h-full">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className={`font-bold text-base line-clamp-1 ${isActive ? "text-red-500" : "text-white"}`}>
                              {idx + 1}. {ep.title}
                            </h4>
                            <span className="text-xs text-gray-500 font-mono">
                              {ep.idx !== undefined ? `${ep.idx + 1}m` : "45m"}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                            {ep.description || "No description available for this episode."}
                          </p>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <p className="text-gray-500">No episodes found.</p>
                )}
              </div>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}
