"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Clapperboard, Search, PlayCircle, CheckCircle } from "lucide-react";

import Loader from "./components/Loader";
import ImageWithLoader from "./components/ImageWithLoader";
import NextPage from "./components/NextPage";
import PrevPage from "./components/PrevPage";
import PopularSeries from "./components/PopularSeries";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";

interface Show {
  _id: string;
  show_title: string;
  poster?: string;
  series_logo?: string;
  description?: string;
  seasons?: number | string;
  year?: string | number;
  fanart?: string;
  rating?: string | null;
}

const SHOWS_PER_PAGE = 18;

// Define PopularSeries Type locally or import it if shared
interface PopularSeriesType {
  _id: string;
  show_title: string;
  year?: string | null;
  rating?: string | null;
  seasons?: string | number | null;
  description?: string;
  poster?: string;
  series_logo?: string;
  fanart?: string;
  creators?: string[];
  cast?: string[];
  starring?: string[];
  show_characteristics?: string[];
}

export const getPopularSeries = async (): Promise<PopularSeriesType[]> => {
  try {
    const res = await fetch("/api/popular");

    if (!res.ok) {
      throw new Error(`Failed to fetch popular series: ${res.status}`);
    }

    const data: PopularSeriesType[] = await res.json();
    return data;
  } catch (error) {
    console.error("getPopularSeries error:", error);
    return [];
  }
};

export default function ShowsPage() {
  const router = useRouter();

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // suggestions state
  const [suggestions, setSuggestions] = useState<Show[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestError, setSuggestError] = useState("");

  const reqIdRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);
  const suggestControllerRef = useRef<AbortController | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [category, setCategory] = useState<string>("all"); // "all", "series", "movie"

  const safeSetShows = (arr: Show[]) => setShows(arr);

  // Separate state for featured content (Hero) and popular list
  const [seriesList, setSeriesList] = useState<PopularSeriesType[]>([]);

  useEffect(() => {
    getPopularSeries().then((data) => {
      if (data && data.length > 0) {
        setSeriesList(data);
      }
    });
  }, []);

  // Fetch Suggestions
  const fetchSuggestions = async (q: string) => {
    if (suggestControllerRef.current) suggestControllerRef.current.abort();
    suggestControllerRef.current = new AbortController();
    const signal = suggestControllerRef.current.signal;

    setSuggestLoading(true);
    setSuggestError("");

    try {
      const res = await fetch(`/api/series?search=${encodeURIComponent(q)}`, { signal });
      const data = await res.json();

      if (!res.ok) {
        setSuggestions([]);
        return;
      }

      const list: Show[] = Array.isArray(data.results) ? data.results : [];
      setSuggestions(list);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      setSuggestions([]);
    } finally {
      setSuggestLoading(false);
    }
  };


  // Fetch shows (Movies Grid)
  const fetchShows = async (query = "", cat = "all") => {
    const thisReqId = ++reqIdRef.current;

    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);
    setError("");

    try {
      let res: Response;
      let data: any;

      // Use ?search for regex search in grid, or /api/shows with ?category
      const searchUrl = query
        ? `/api/series?search=${encodeURIComponent(query)}`
        : `/api/shows${cat !== "all" ? `?category=${cat}` : ""}`;

      res = await fetch(searchUrl, { signal });
      data = await res.json();

      if (!res.ok) {
        const msg = data?.error || `Failed to fetch shows (${res.status})`;
        if (thisReqId === reqIdRef.current) {
          safeSetShows([]);
          setLoading(false);
        }
        return;
      }

      // Handle different response structures
      let results: Show[] = [];
      if (Array.isArray(data)) {
        results = data;
      } else if (Array.isArray(data.results)) {
        results = data.results;
      }

      if (thisReqId === reqIdRef.current) {
        safeSetShows(results);
      }

    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("fetchShows error:", err);
      if (thisReqId === reqIdRef.current) {
        safeSetShows([]);
      }
    } finally {
      if (thisReqId === reqIdRef.current) setLoading(false);
    }
  };

  // Debounced search effect
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchShows(searchQuery, category);
      if (searchQuery.length >= 2) {
        fetchSuggestions(searchQuery);
      } else {
        setSuggestions([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, category]);


  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSuggestionClick = (s: Show) => {
    setSuggestions([]);
    setSearchQuery(""); // Clear search or set to title, up to preference. Clearing to show full page often better or navigating directly.
    // Actually, usually suggestions navigate directly.
    router.push(`/series/${s._id}`);
  };

  const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
  const pageShows = shows.slice(startIndex, startIndex + SHOWS_PER_PAGE);
  const totalPages = Math.max(1, Math.ceil(shows.length / SHOWS_PER_PAGE));

  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      setTimeout(() => {
        document.getElementById("shows-grid")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      setTimeout(() => {
        document.getElementById("shows-grid")?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  // If initial load and empty (maybe handle better skeleton later)
  if (loading && !shows.length && !seriesList.length)
    return (
      <div className="w-full h-screen bg-[#0f0f0f] flex items-center justify-center">
        <Loader />
      </div>
    );

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] text-white">
      {/* Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        suggestions={suggestions}
        handleSuggestionClick={handleSuggestionClick}
        transparent={true}
      />

      {/* Hero Section */}
      {seriesList.length > 0 && <Hero shows={seriesList as unknown as Show[]} />}

      <div className="relative z-20 pb-20 space-y-8 bg-gradient-to-b from-transparent via-[#0f0f0f] to-[#0f0f0f] -mt-32 pt-32">

        {/* Popular Series Slider */}
        <div className="px-0">
          <PopularSeries
            seriesList={seriesList}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        </div>

        {/* Movies Section Header */}
        <div className="px-4 md:px-8 mt-10">
          <div className="flex items-center justify-between border-b border-gray-800 pb-2 mb-6">
            <div className="flex items-center gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
                <Clapperboard className="text-red-600" />
                Movies & Series
              </h2>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="px-4 md:px-8 min-h-[400px]">
          {loading && shows.length === 0 ? (
            <div className="flex justify-center p-10"><Loader /></div>
          ) : shows.length > 0 ? (
            <div
              id="shows-grid"
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 w-full"
            >
              {pageShows.map((show) => (
                <Link
                  key={show._id}
                  href={`/series/${show._id}`}
                  className="relative w-full cursor-pointer group transform transition-transform duration-300 hover:scale-105 hover:z-30"
                >
                  <div className="w-full aspect-[2/3] overflow-hidden rounded-md shadow-lg bg-zinc-900/50">
                    {show.poster ? (
                      <Image
                        src={show.poster}
                        alt={show.show_title}
                        fill
                        className="object-cover transition-opacity duration-300"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                      />
                    ) : show.series_logo ? (
                      <Image
                        src={show.series_logo}
                        alt={show.show_title}
                        fill
                        className="object-contain p-4"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-zinc-600 text-xs">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 rounded-md">
                    <h3 className="text-white font-bold text-sm leading-tight mb-1 drop-shadow-md">{show.show_title}</h3>
                    <div className="flex items-center justify-between text-[10px] text-gray-200 font-medium">
                      <span>{show.year}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-20">
              No results found for "{searchQuery}"
            </div>
          )}

          {/* Pagination controls */}
          {shows.length > 0 && (
            <div className="mt-12 flex items-center justify-center gap-6 pb-10">
              <PrevPage onClick={goPrev} disabled={currentPage === 1} />
              <div className="text-gray-400 text-sm font-medium">
                <span className="text-white">{currentPage}</span> / {totalPages}
              </div>
              <NextPage onClick={goNext} disabled={currentPage >= totalPages} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
