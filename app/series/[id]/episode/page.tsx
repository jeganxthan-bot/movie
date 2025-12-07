// app/series/[id]/episode/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter, useParams } from "next/navigation";
import { MoveLeft } from "lucide-react";
import Loader from "@/app/components/Loader";
import ImageWithLoader from "@/app/components/ImageWithLoader";

type Episode = {
  title: string;
  description?: string;
  image_url?: string;
  url?: string | null; // may be token or full url depending on API
  group?: string; // season/group key from show.data
  idx?: number; // index within the group
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
  const [currentSeason, setCurrentSeason] = useState<number>(Number(seasonParam) || 1);

  // Player state
  const [streamUrl, setStreamUrl] = useState<string | null>(
    encParam ? buildStreamUrl(encParam) : null
  );
  const [error, setError] = useState<string>("");

  // Index of currently-watching episode in the flattened `episodes` array
  const [currentEpisodeIdx, setCurrentEpisodeIdx] = useState<number | null>(null);

  // Utility: normalize token or url into a playable URL
  function buildStreamUrl(maybeTokenOrUrl: string | null | undefined) {
    if (!maybeTokenOrUrl) return null;
    const s = String(maybeTokenOrUrl).trim();
    if (!s) return null;
    if (s.startsWith("http://") || s.startsWith("https://") || s.startsWith("/")) return s;
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

      const res = await fetch(`/api/series/${encodeURIComponent(id)}?season=${encodeURIComponent(season)}`);
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
        // opened with enc param - we don't know which episode; keep null
        setCurrentEpisodeIdx(null);
      } else {
        // default to first episode
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
  const fetchTokenForEpisode = async (season: string, group: string, index: number) => {
    if (!id) throw new Error("Missing show id");
    const res = await fetch(`/api/series/${encodeURIComponent(id)}/token?season=${encodeURIComponent(season)}&group=${encodeURIComponent(group)}&index=${index}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data?.error ?? "Failed to fetch token");
    if (typeof data === "string") return buildStreamUrl(data);
    if (data?.url) return buildStreamUrl(data.url);
    if (data?.token) return buildStreamUrl(data.token);
    throw new Error("Unexpected token response");
  };

  // Navigate to player URL (and optimistically highlight the episode)
  const goToPlayer = (group: string, index: number, episodeTitle?: string) => {
    // find flattened index and set highlight immediately for snappy UI
    const found = episodes.findIndex((e) => e.group === group && Number(e.idx) === Number(index));
    if (found !== -1) setCurrentEpisodeIdx(found);

    const t = episodeTitle ? `&t=${encodeURIComponent(episodeTitle)}` : "";
    const s = currentSeason ?? Number(seasonParam) ?? 1;
    router.push(`/series/${id}/episode?season=${s}&group=${encodeURIComponent(group)}&index=${index}${t}`);
  };

  // Load show on mount / when seasonParam changes
  useEffect(() => {
    if (!id) return;
    fetchShow(Number(seasonParam) || 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, seasonParam]);

  // When component mounts or query params change: try to fetch token using group/index (if no enc)
  useEffect(() => {
    let mounted = true;
    const tryFetchToken = async () => {
      if (encParam) {
        setStreamUrl(buildStreamUrl(encParam));
        // if we have enc but also group/index, try to set currentEpisodeIdx from episodes
        if (groupParam && indexParam != null && episodes.length > 0) {
          const found = episodes.findIndex((e) => e.group === groupParam && Number(e.idx) === Number(indexParam));
          if (found !== -1) setCurrentEpisodeIdx(found);
        }
        return;
      }

      // must have group & index to fetch token
      if (!id || !groupParam || indexParam == null) {
        // nothing to do
        return;
      }

      try {
        setLoading(true);
        setError("");
        const tokenUrl = await fetchTokenForEpisode(seasonParam, groupParam, Number(indexParam));
        if (!mounted) return;
        setStreamUrl(tokenUrl);

        // also set the highlight (if episodes already fetched)
        if (episodes.length > 0) {
          const found = episodes.findIndex((e) => e.group === groupParam && Number(e.idx) === Number(indexParam));
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
  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-black text-white">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-6xl mx-auto text-center mt-20">
        <p className="text-red-500 text-xl mb-4">{error}</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!show) {
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <p className="text-gray-600">No show data</p>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-2xl font-semibold">
            {titleParam ? decodeURIComponent(titleParam) : show.show_title ?? "Episode Player"}
          </h1>
        </div>

        <div
          className="absolute top-4 left-4 z-30 bg-gray-900 hover:bg-gray-600 rounded-full p-2 cursor-pointer"
          onClick={() => router.back()}
        >
          <MoveLeft size={32} className="text-white" />
        </div>
      </div>

      <div className="w-full h-[50vh] bg-black rounded overflow-hidden relative">
        {streamUrl ? (
          <iframe
            src={streamUrl}
            title={titleParam ? decodeURIComponent(titleParam) : "player"}
            className="w-full h-full"
            allowFullScreen
            style={{ border: "none" }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-white">
            <p>No stream available</p>
          </div>
        )}
      </div>

      <div className="space-y-8 mt-6">
        {Object.entries(show.data ?? {}).map(([seasonName, eps]) => (
          <div key={seasonName}>
            <h3 className="text-lg font-medium mb-2">Season: {seasonName}</h3>
            <div className="flex flex-col gap-3">
              {Array.isArray(eps) && eps.length > 0 ? (
                eps.map((ep, idx) => {
                  // find flattened index of this ep (group=seasonName, idx)
                  const flatIndex = episodes.findIndex((e) => e.group === seasonName && Number(e.idx) === idx);
                  const active = flatIndex !== -1 && currentEpisodeIdx === flatIndex;

                  return (
                    <div
                      key={idx}
                      className={`rounded-lg p-3 flex flex-col md:flex-row gap-4 cursor-pointer group border ${
                        active ? "border-indigo-500 bg-indigo-50" : "hover:shadow"
                      }`}
                      onClick={() => goToPlayer(seasonName, idx, ep.title)}
                    >
                      {ep.image_url ? (
                        <div className="relative md:w-48 md:h-32 w-full h-60 rounded-md overflow-hidden mb-3 md:mb-0 flex-shrink-0">
                          <ImageWithLoader
                            src={ep.image_url}
                            alt={ep.title}
                            fill
                            className="object-cover"
                            unoptimized
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-200"></div>
                        </div>
                      ) : (
                        <div className="md:w-48 md:h-32 w-full h-60 bg-gray-100 rounded mb-3 md:mb-0 flex items-center justify-center text-sm text-gray-500">No Image</div>
                      )}

                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="font-medium">{ep.title}</h4>
                          {active && <span className="text-xs text-indigo-600">Playing</span>}
                        </div>
                        <p className="text-sm text-gray-500 mt-1 line-clamp-3">{ep.description}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="text-gray-500">No episodes available for this season.</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
