"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import { MoveLeft } from "lucide-react";
import TextLoader from "@/app/components/TextLoader";
import AdsenseAd from "@/app/components/Adsense";

interface Episode {
  title: string;
  description: string;
  image_url: string;
  url: string | null;
}

interface SeasonData {
  [seasonName: string]: Episode[];
}

interface Show {
  _id: string;
  show_title: string;
  year?: string;
  rating?: string;
  seasons_count?: number | string;
  description?: string;
  series_logo?: string;
  trailer_url?: string;
  creators?: string[];
  cast?: string[];
  starring?: string[];
  show_characteristics?: string[];
  audio?: string[];
  subtitles?: string[];
  season?: number;
  data?: SeasonData;
}

export default function SeriesPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();
  const goToPlayer = (group: string, index: number, episodeTitle?: string) => {
    const t = episodeTitle ? encodeURIComponent(episodeTitle) : "";
    const s = show?.season ?? 1;
    router.push(`/series/${id}/episode?season=${s}&group=${encodeURIComponent(group)}&index=${index}${t ? `&t=${t}` : ""}`);
  };

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [playingUrl, setPlayingUrl] = useState<string | null>(null);

  const [currentSeason, setCurrentSeason] = useState<number>(1);
  const [seasonLoading, setSeasonLoading] = useState<number | null>(null);

  const getSeasonsCount = (s: Show | null) => {
    if (!s) return 0;
    const sc = s.seasons_count;
    if (typeof sc === "number") return sc;
    if (typeof sc === "string") {
      const m = sc.match(/\d+/);
      return m ? Number(m[0]) : 0;
    }
    return 0;
  };

  const normalizeShow = (data: any): Show => {
    return {
      ...(data ?? {}),
      data: data?.data ?? {},
      seasons_count: data?.seasons_count ?? data?.seasons ?? 0,
      season: data?.season ?? currentSeason,
    } as Show;
  };

  const fetchShow = async (season = 1) => {
    if (!id) return;
    try {
      setSeasonLoading(season); // 🔥 store the loading season
      setError("");

      const res = await fetch(
        `/api/series/${encodeURIComponent(id)}?season=${season}`
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error ?? "Failed to fetch show");
        return;
      }

      const normalized = normalizeShow(data);
      setShow(normalized);
      setCurrentSeason(normalized.season ?? season);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err?.message ?? "Unknown error");
    } finally {
      setSeasonLoading(null); // 🔥 stop loading
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchShow(1);
  }, [id]);

  /* -------------------------------------------------------
     RANDOM IMAGE FROM EPISODES
  -------------------------------------------------------- */
  const allImages = show?.data
    ? Object.values(show.data)
        .flat()
        .map((ep) => ep.image_url)
        .filter((url) => typeof url === "string" && url.length > 0)
    : [];

  const randomImage =
    allImages.length > 0
      ? allImages[Math.floor(Math.random() * allImages.length)]
      : null;

  if (loading)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );

  if (error)
    return (
      <div className="p-6">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );

  if (!show)
    return (
      <div className="p-6">
        <p className="text-gray-600">No show found</p>
      </div>
    );

  return (
    <div className="w-full">
      <div className="relative w-full h-[600px] overflow-hidden">
        {randomImage && (
          <Image
            src={randomImage}
            alt="Random Episode Image"
            fill
            className="object-cover"
            style={{ objectPosition: "center 20%" }}
            unoptimized
          />
        )}

        {/* dark overlay */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div
          className="absolute top-4 left-4 z-30 bg-gray-900 hover:bg-gray-600 rounded-full p-2"
          onClick={() => router.push("/")}
        >
          <MoveLeft size={32} className="text-white" />
        </div>
        <div className="absolute bottom-30 left-2 z-20">
          {show.series_logo && (
            <Image
              src={show.series_logo}
              alt={`${show.show_title} Logo`}
              width={360} // intrinsic width
              height={110} // intrinsic height
              className="drop-shadow-2xl w-40 h-16 sm:w-40 sm:h-16 md:w-64 md:h-28 object-contain"
              unoptimized
            />
          )}
          <div className="mt-10 text-sm text-white p-4">
            <span className="mr-4">
              <strong>Year:</strong> {show.year}
            </span>
            <span className="mr-4">
              <strong>Rating:</strong> {show.rating}
            </span>
            <span>
              <strong>Seasons:</strong> {getSeasonsCount(show) || "—"}
            </span>
            <p className="text-sm text-gray-500 w-60 mt-1">
              {show.description}
            </p>
          </div>
        </div>
      </div>

      {playingUrl && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <button
            onClick={() => setPlayingUrl(null)}
            className="absolute top-6 right-6 px-4 py-2 bg-white rounded-md text-sm font-medium shadow"
          >
            Close
          </button>

          <div className="w-full max-w-5xl h-[70vh] bg-black rounded-md overflow-hidden">
            <iframe
              src={playingUrl}
              title="player"
              className="w-full h-full"
              allowFullScreen
              style={{ border: "none" }}
            />
          </div>
        </div>
      )}

      <div className="p-6 max-w-6xl mx-auto">
        {/* Title */}
        <h1 className="text-3xl font-semibold">{show.show_title}</h1>

        {/* Season selector */}
        {getSeasonsCount(show) > 0 && (
          <div className="flex gap-2 mb-4 mt-4 flex-wrap items-center">
            {Array.from({ length: getSeasonsCount(show) }).map((_, i) => {
              const seasonNum = i + 1;
              const active = show.season === seasonNum;
              return (
                <button
                  key={seasonNum}
                  onClick={() => fetchShow(seasonNum)}
                  disabled={seasonLoading === seasonNum || active}
                  className={`px-3 py-1 rounded ${
                    active ? "text-white font-bold" : "text-gray-500"
                  }`}
                >
                  {seasonLoading === seasonNum ? (
                    <TextLoader /> // 🔥 shows loader only on this button
                  ) : (
                    <>Season {seasonNum}</>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Episodes */}
         
        <div className="space-y-8">
          {Object.entries(show.data ?? {}).map(([seasonName, episodes]) => (
            <div key={seasonName}>
              <div className="flex flex-col">
                {Array.isArray(episodes) && episodes.length > 0 ? (
                  episodes.map((ep, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg p-3 flex flex-col h-full"
                    >
                      <div
                        className="flex flex-col items-center text-center md:flex-row md:text-left gap-4 cursor-pointer group"
                        onClick={() => goToPlayer(seasonName, idx, ep.title)}
                      >
                        {/* IMAGE */}
                        {ep.image_url && (
                          <div className="relative md:w-48 md:h-32 w-80 h-60 rounded-md overflow-hidden mb-3 md:mb-0">
                            <ImageWithLoader
                              src={ep.image_url}
                              alt={ep.title}
                              fill
                              className="object-cover"
                              unoptimized
                            />

                            {/* Hover Overlay */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition duration-200"></div>
                          </div>
                        )}

                        {/* TEXT */}
                        <div className="flex-1 w-80 md:w-200">
                          <h4 className="font-medium">{ep.title}</h4>
                          <p className="text-sm text-gray-500 line-clamp-none sm:line-clamp-3">
                            {ep.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full text-gray-500">
                    No episodes available for this season.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
