"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/app/components/Loader";
import ImageWithLoader from "@/app/components/ImageWithLoader";
import { MoveLeft } from "lucide-react";
import TextLoader from "@/app/components/TextLoader";

/* ================= TYPES ================= */

interface Episode {
  title: string;
  description: string;
  image_url: string;
  duration?: string;
  url: string | null;
}

interface SeasonData {
  [seasonName: string]: Episode[];
}

interface Show {
  _id: string;
  show_title: string;
  category?: string;
  year?: string;
  rating?: string;
  seasons_count?: number | string;
  description?: string;
  series_logo?: string;
  fanart?: string;
  creators?: string[];
  cast?: string[];
  starring?: string[]; // The API uses 'starring'
  show_characteristics?: string[];
  genres?: string[]; // Just in case
  audio?: string[];
  subtitles?: string[];
  season?: number;
  data?: SeasonData;
}

/* ================= PAGE ================= */

export default function SeriesPage() {
  const params = useParams();
  const id = params?.id as string;
  const router = useRouter();

  const [show, setShow] = useState<Show | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [seasonLoading, setSeasonLoading] = useState<number | null>(null);

  /* ================= HELPERS ================= */

  const getSeasonsCount = (s: Show | null) => {
    if (!s) return 0;
    if (typeof s.seasons_count === "number") return s.seasons_count;
    if (typeof s.seasons_count === "string") {
      const m = s.seasons_count.match(/\d+/);
      return m ? Number(m[0]) : 0;
    }
    return 0;
  };

  /* ================= NORMALIZE ================= */

  const normalizeShow = (data: any): Show => {
    const toArray = (val: any) => {
      if (Array.isArray(val)) return val;
      if (typeof val === "string" && val.trim()) {
        return val.split(",").map((s) => s.trim()).filter(Boolean);
      }
      return [];
    };

    return {
      _id: data._id,
      show_title: data.show_title,
      category: data.category,
      year: data.year,
      rating: data.rating,
      description: data.description,
      series_logo: data.series_logo,
      fanart:
        data.fanart ||
        data.background ||
        data.fanart_url ||
        data.backdrop ||
        "",
      seasons_count: data.seasons_count ?? data.seasons,
      creators: toArray(data.creators),
      cast: toArray(data.cast),
      starring: toArray(data.starring),
      show_characteristics: toArray(data.show_characteristics),
      genres: toArray(data.genres),
      audio: toArray(data.audio),
      subtitles: toArray(data.subtitles),
      season: data.season ?? 1,
      data: data.data ?? {},
    };
  };

  /* ================= FETCH ================= */
  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;

    if (!isDesktop) return;

    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  const fetchShow = async (season = 1) => {
    setSeasonLoading(season);
    try {
      const res = await fetch(
        `/api/series/${encodeURIComponent(id)}?season=${season}`
      );
      const raw = await res.json();

      if (!res.ok) {
        setError(raw?.error ?? "Failed to fetch show");
        return;
      }

      setShow(normalizeShow(raw));
    } catch (err: any) {
      setError(err?.message ?? "Unknown error");
    } finally {
      setLoading(false);
      setSeasonLoading(null);
    }
  };

  useEffect(() => {
    if (!id) return;
    fetchShow(1);
  }, [id]);

  /* ================= STATES ================= */

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return <p className="p-6 text-red-500">{error}</p>;
  }

  if (!show) {
    return <p className="p-6 text-gray-500">No show found</p>;
  }

  /* ================= RENDER ================= */

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white overflow-x-hidden">
      {/* Background Fanart with Gradient Overlay */}
      <div
        className="fixed inset-0 bg-cover bg-center z-0 transition-opacity duration-1000"
        style={{
          backgroundImage: show.fanart ? `url("${show.fanart}")` : "none",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0f0f] via-[#0f0f0f]/40 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent z-10" />
      </div>

      {/* Navigation */}
      <div className="relative z-30 p-6 flex justify-between items-center">
        <button
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full p-3 transition-all"
          onClick={() => router.push("/")}
        >
          <MoveLeft size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="relative z-20 flex flex-col lg:flex-row px-6 md:px-16 pb-12 gap-12">

        {/* Left Side: Show Details */}
        <div className="flex-1 lg:max-w-[60%] pt-10">
          {show.series_logo ? (
            <div className="mb-8">
              <Image
                src={show.series_logo}
                alt={show.show_title}
                width={400}
                height={150}
                className="w-full max-w-[220px] md:max-w-[350px] object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                unoptimized
              />
            </div>
          ) : (
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter uppercase whitespace-normal break-words">
              {show.show_title}
            </h1>
          )}

          {/* Metadata Row */}
          <div className="flex items-center gap-6 text-xl font-medium text-gray-300 mb-8 flex-wrap">
            {show.year && <span>{show.year}</span>}
            {show.rating && (
              <div className="flex items-center gap-2">
                <span>{show.rating}</span>
                <span className="bg-[#f5c518] text-black text-[10px] font-bold px-1 rounded-sm">IMDb</span>
              </div>
            )}
            {show.category === "movie" ? (
              <span>Movie</span>
            ) : (
              getSeasonsCount(show) > 0 && (
                <span>{getSeasonsCount(show)} Seasons</span>
              )
            )}
          </div>

          {/* Genres / Tags */}
          {show.show_characteristics && show.show_characteristics.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Characteristics</p>
              <div className="flex flex-wrap gap-2">
                {show.show_characteristics.map((char, i) => (
                  <span key={i} className="bg-white/10 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                    {char}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Cast / Starring */}
          {show.starring && show.starring.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Starring</p>
              <div className="flex flex-wrap gap-2">
                {show.starring.map((actor, i) => (
                  <span key={i} className="bg-white/10 backdrop-blur-md border border-white/5 px-4 py-1.5 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
                    {actor}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Creators */}
          {show.creators && show.creators.length > 0 && (
            <div className="mb-8">
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Creators</p>
              <div className="flex flex-wrap gap-2">
                {show.creators.map((creator, i) => (
                  <span key={i} className="text-lg text-gray-300 font-medium">
                    {creator}{i < (show.creators?.length ?? 0) - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-3">Summary</p>
            <p className="text-lg text-gray-300 leading-relaxed max-w-2xl line-clamp-6 md:line-clamp-none">
              {show.description}
            </p>
          </div>

          {/* Action Buttons */}
          {/* <div className="flex flex-wrap gap-4">
            <button className="flex items-center gap-3 bg-white text-black px-8 py-3.5 rounded-xl font-bold hover:bg-gray-200 transition-all text-lg shadow-lg shadow-white/5">
              <span>Watch Now</span>
            </button>
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/10 px-8 py-3.5 rounded-xl font-bold hover:bg-white/20 transition-all text-lg">
              <span>Add to Library</span>
            </button>
          </div> */}
        </div>

        {/* Right Side: Episodes Sidebar */}
        <div className="w-full lg:w-[450px] z-30">
          <div className="bg-black/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col max-h-[calc(100vh-120px)] shadow-2xl">

            {/* Season Selector */}
            {getSeasonsCount(show) > 0 && (
              <div className="mb-6 relative">
                <select
                  value={show.season}
                  onChange={(e) => fetchShow(Number(e.target.value))}
                  className="w-full bg-white/10 border border-white/10 rounded-2xl px-5 py-3.5 appearance-none focus:outline-none focus:ring-2 focus:ring-white/20 transition-all cursor-pointer font-bold text-lg"
                >
                  {Array.from({ length: getSeasonsCount(show) }).map((_, i) => (
                    <option key={i + 1} value={i + 1} className="bg-[#1a1a1a]">
                      {show.category === "movie" ? "Movie" : `Season ${i + 1}`}
                    </option>
                  ))}
                </select>
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            )}

            {/* Episode List */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              {seasonLoading ? (
                <div className="flex items-center justify-center py-20">
                  <TextLoader />
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(show.data ?? {}).map(([groupKey, episodes]) =>
                    episodes.map((ep, idx) => (
                      <div
                        key={`${groupKey}-${idx}`}
                        className="group flex gap-4 p-3 rounded-2xl hover:bg-white/10 transition-all cursor-pointer border border-transparent hover:border-white/5"
                        onClick={() => {
                          const s = show.season ?? 1;
                          const t = ep.title ? `&t=${encodeURIComponent(ep.title)}` : "";
                          router.push(
                            `/series/${id}/episode?season=${s}&group=${encodeURIComponent(
                              groupKey
                            )}&index=${idx}${t}`
                          );
                        }}
                      >
                        {/* Episode Thumbnail */}
                        <div className="relative w-28 h-20 md:w-32 md:h-24 flex-shrink-0 bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                          {ep.image_url ? (
                            <ImageWithLoader
                              src={ep.image_url}
                              alt={ep.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-500"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500">No Image</div>
                          )}
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                          {(ep.duration || show.category !== "movie") && (
                            <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-md text-[10px] font-bold">
                              {ep.duration || `EP ${idx + 1}`}
                            </div>
                          )}
                        </div>

                        {/* Episode Info */}
                        <div className="flex-1 py-1">
                          <h4 className="font-bold text-sm md:text-base mb-1 line-clamp-2 leading-snug group-hover:text-white transition-colors">
                            {show.category === "movie" && getSeasonsCount(show) === 1 ? "" : `${idx + 1}. `}{ep.title}
                          </h4>
                          <p className="text-gray-500 text-xs line-clamp-2 md:line-clamp-3 leading-relaxed">
                            {ep.description || "No description available for this episode."}
                          </p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </div>
  );
}
