"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdsenseAd from "./components/Adsense";
import Loader from "./components/Loader";
import ImageWithLoader from "./components/ImageWithLoader";
import NextPage from "./components/NextPage";
import PrevPage from "./components/PrevPage";

interface Show {
  _id: string;
  show_title: string;
  poster?: string;
  series_logo?: string;
  description?: string;
  seasons?: number | string;
  year?: string | number;
}

const SLOTS_PER_PAGE = 18; // visual capacity (includes 2 ad slots)
const AD_AFTER = 8; // insert ads after 8 shows (1-based)
const SHOWS_PER_PAGE = SLOTS_PER_PAGE - 2; // 14 shows per page max

export default function ShowsPage() {
  const router = useRouter();

  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // suggestions
  const [suggestions, setSuggestions] = useState<Show[]>([]);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [suggestError, setSuggestError] = useState("");

  // keyboard nav for suggestions
  const [highlightIdx, setHighlightIdx] = useState<number>(-1);
  const suggestionsRef = useRef<HTMLDivElement | null>(null);

  const reqIdRef = useRef(0);
  const controllerRef = useRef<AbortController | null>(null);
  const suggestControllerRef = useRef<AbortController | null>(null);

  // current page index (1-based). Each page shows up to SHOWS_PER_PAGE shows.
  const [currentPage, setCurrentPage] = useState<number>(1);

  const safeSetShows = (arr: Show[]) => setShows(arr);

  // Fetch shows (same as before)
  const fetchShows = async (query = "") => {
    const thisReqId = ++reqIdRef.current;

    if (controllerRef.current) controllerRef.current.abort();
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;

    setLoading(true);
    setError("");

    try {
      let res: Response;
      let data: any;

      if (!query) {
        res = await fetch("/api/shows", { signal });
        data = await res.json();
        if (!res.ok) {
          const msg = data?.error || `Failed to fetch shows (${res.status})`;
          if (thisReqId === reqIdRef.current) {
            setError(msg);
            safeSetShows([]);
            setLoading(false);
          }
          return;
        }

        let results: Show[] = [];
        if (Array.isArray(data)) results = data;
        else if (Array.isArray(data.results)) results = data.results;
        else results = [];

        if (thisReqId === reqIdRef.current) safeSetShows(results);
      } else {
        const url = `/api/series?show_title=${encodeURIComponent(query)}`;
        res = await fetch(url, { signal });
        data = await res.json();
        if (!res.ok) {
          const msg = data?.error || `Failed to fetch show (${res.status})`;
          if (thisReqId === reqIdRef.current) {
            setError(msg);
            safeSetShows([]);
            setLoading(false);
          }
          return;
        }

        const id = data?._id ?? (data?._id ? String(data._id) : "");
        if (!id) {
          if (thisReqId === reqIdRef.current) {
            setError("Show found but missing _id in response");
            safeSetShows([]);
            setLoading(false);
          }
          return;
        }

        const showObj: Show = {
          _id: id,
          show_title: data.show_title ?? "",
          poster: data.poster ?? "",
          series_logo: data.series_logo ?? "",
          description: data.description ?? "",
          seasons: data.seasons ?? "",
          year: data.year ?? "",
        };

        if (thisReqId === reqIdRef.current) safeSetShows([showObj]);
      }
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("fetchShows error:", err);
      if (thisReqId === reqIdRef.current) {
        setError(err?.message ?? "Unknown error");
        safeSetShows([]);
      }
    } finally {
      if (thisReqId === reqIdRef.current) setLoading(false);
    }
  };

  // Suggestions
  const fetchSuggestions = async (q: string) => {
    if (suggestControllerRef.current) suggestControllerRef.current.abort();
    suggestControllerRef.current = new AbortController();
    const signal = suggestControllerRef.current.signal;

    setSuggestLoading(true);
    setSuggestError("");

    try {
      const url = `/api/series?search=${encodeURIComponent(q)}`;
      const res = await fetch(url, { signal });
      const data = await res.json();
      if (!res.ok) {
        const msg =
          data?.error || `Failed to fetch suggestions (${res.status})`;
        setSuggestError(msg);
        setSuggestions([]);
        return;
      }

      const list: Show[] = Array.isArray(data.results) ? data.results : [];
      setSuggestions(list);
      setHighlightIdx(list.length > 0 ? 0 : -1);
    } catch (err: any) {
      if (err?.name === "AbortError") return;
      console.error("fetchSuggestions error:", err);
      setSuggestError(err?.message ?? "Unknown error");
      setSuggestions([]);
    } finally {
      setSuggestLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchShows();
    return () => {
      controllerRef.current?.abort();
      suggestControllerRef.current?.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // debounced suggestions
  useEffect(() => {
    const q = searchQuery.trim();

    if (!q) {
      setSuggestions([]);
      setSuggestError("");
      setHighlightIdx(-1);
      return;
    }

    const timer = setTimeout(() => {
      if (q.length >= 2) fetchSuggestions(q);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // keyboard nav for suggestions
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestions.length) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIdx((idx) => Math.min(suggestions.length - 1, idx + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIdx((idx) => Math.max(0, idx - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const pick = suggestions[highlightIdx >= 0 ? highlightIdx : 0];
      if (pick) {
        setSuggestions([]);
        setHighlightIdx(-1);
        router.push(`/series/${pick._id}`);
      }
    } else if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIdx(-1);
    }
  };

  const scrollSuggestionIntoView = (index: number) => {
    const container = suggestionsRef.current;
    if (!container) return;
    const el =
      container.querySelectorAll<HTMLDivElement>("[data-suggestion]")[index];
    if (el) el.scrollIntoView({ block: "nearest" });
  };

  const handleSuggestionChoose = (s: Show) => {
    setSuggestions([]);
    setHighlightIdx(-1);
    router.push(`/series/${s._id}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setError("");
  };

  // build items for the current page (no empty slots)
  const buildPageItems = (page: number) => {
    const start = (page - 1) * SHOWS_PER_PAGE;
    const pageShows = shows.slice(start, start + SHOWS_PER_PAGE);

    const items: (Show | { ad: number })[] = [];

    if (pageShows.length < AD_AFTER) {
      // fewer than 8 shows -> render only shows
      for (const s of pageShows) items.push(s);
    } else {
      // first 8 shows
      for (let i = 0; i < AD_AFTER; i++) items.push(pageShows[i]);
      // two ads
      items.push({ ad: 1 }, { ad: 2 });
      // remaining shows for page
      for (let i = AD_AFTER; i < pageShows.length; i++)
        items.push(pageShows[i]);
    }

    return items;
  };

  const totalPages = Math.max(1, Math.ceil(shows.length / SHOWS_PER_PAGE));

  const pageItems = buildPageItems(currentPage);

  // navigation
  const goNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((p) => p + 1);
      // scroll grid into view after next tick
      setTimeout(() => {
        document
          .getElementById("shows-grid")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  const goPrev = () => {
    if (currentPage > 1) {
      setCurrentPage((p) => p - 1);
      setTimeout(() => {
        document
          .getElementById("shows-grid")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 80);
    }
  };

  if (loading && !shows.length)
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  if (error && !shows.length)
    return <p className="p-6 text-red-500">Error: {error}</p>;

  return (
    <div className="p-5 relative">
      {/* Search Bar */}
      <div className="relative mb-2 max-w-xl ">
        <div className="flex items-center gap-8 w-full">
          <Image
            src="/batman.png"
            alt="logo"
            width={80}
            height={20}
            className="invert md:w-25 md:h-10 w-10 h-5"
            unoptimized
          />

          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            placeholder="Search for a show..."
            aria-autocomplete="list"
            aria-controls="shows-suggestions"
            aria-activedescendant={
              highlightIdx >= 0 ? `sugg-${highlightIdx}` : undefined
            }
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Suggestions dropdown */}
        {(suggestions.length > 0 || suggestLoading || suggestError) && (
          <div
            id="shows-suggestions"
            role="listbox"
            ref={suggestionsRef}
            className="absolute top-11 left-0 right-0 bg-white border border-gray-200 rounded-md shadow-lg z-40 max-h-72 overflow-y-auto"
          >
            {suggestLoading && (
              <div className="p-3 text-gray-500">Searching...</div>
            )}
            {suggestError && !suggestLoading && (
              <div className="p-3 text-red-500">{suggestError}</div>
            )}

            {!suggestLoading &&
              suggestions.map((s, i) => {
                const active = i === highlightIdx;
                return (
                  <div
                    data-suggestion
                    id={`sugg-${i}`}
                    key={s._id}
                    role="option"
                    aria-selected={active}
                    onMouseDown={(ev) => {
                      ev.preventDefault();
                      handleSuggestionChoose(s);
                    }}
                    onMouseEnter={() => setHighlightIdx(i)}
                    className={`flex items-center gap-2 p-2 cursor-pointer ${
                      active
                        ? "bg-black text-white"
                        : "bg-transparent text-black"
                    }`}
                  >
                    {s.poster ? (
                      <ImageWithLoader
                        src={s.poster}
                        alt={s.show_title}
                        width={48}
                        height={72}
                        className="rounded object-cover"
                      />
                    ) : s.series_logo ? (
                      <ImageWithLoader
                        src={s.series_logo}
                        alt={s.show_title}
                        width={48}
                        height={48}
                        className="rounded object-contain mt-2"
                      />
                    ) : (
                      <div className="w-12 h-18 rounded" />
                    )}
                    <div className="text-sm">{s.show_title}</div>
                  </div>
                );
              })}

            {!suggestLoading && suggestions.length === 0 && !suggestError && (
              <div className="p-3 text-gray-500">No suggestions</div>
            )}
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        id="shows-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-5 mt-5 w-full"
      >
        {pageItems.map((item, idx) => {
          // ad slot
          if (typeof item === "object" && "ad" in item) {
            const adNum = (item as any).ad;
            return (
              <div key={`ad-${idx}-${adNum}`} className="relative w-full group">
                <div className="w-full aspect-[2/3] overflow-hidden rounded flex items-center justify-center bg-white border border-gray-200 shadow-sm p-3">
                    <div className="w-full flex items-center justify-center">
                      {/* Replace with your real adSlot IDs */}
                      <AdsenseAd
                        adSlot={adNum === 1 ? "8241933588" : "8241933589"}
                      />
                    </div>
                </div>
                <div className="mt-2 text-xs text-gray-500 text-center">
                  Sponsored
                </div>
              </div>
            );
          }

          // show item
          const show = item as Show;
          return (
            <Link
              key={show._id}
              href={`/series/${show._id}`}
              className="relative w-full cursor-pointer group transform transition-transform duration-300 hover:scale-105"
            >
              <div className="w-full aspect-[2/3] overflow-hidden rounded">
                {show.poster ? (
                  <Image
                    src={show.poster}
                    alt={show.show_title}
                    fill
                    className="object-cover w-full h-full"
                  />
                ) : show.series_logo ? (
                  <Image
                    src={show.series_logo}
                    alt={show.show_title}
                    fill
                    className="object-contain w-full h-full bg-white"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">No image</span>
                  </div>
                )}
              </div>

              <div className="absolute inset-0 bg-black/70 text-white p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end rounded">
                <div className="flex justify-between text-xs mb-1">
                  <p>{show.year}</p>
                  <p>Season: {show.seasons}</p>
                </div>
                <h3 className="text-lg font-semibold">{show.show_title}</h3>
                <p className="text-sm mt-1 line-clamp-3">{show.description}</p>
                <button className="mt-2 bg-white hover:bg-gray-700 text-black text-sm font-semibold py-1 px-3 rounded w-fit">
                  Watch Now
                </button>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination controls */}
      <div className="mt-6 flex items-center justify-center gap-6">
        <PrevPage onClick={goPrev} disabled={currentPage === 1} />

        <div className="text-gray-700">
          Page {currentPage} of {totalPages}
        </div>

        <NextPage onClick={goNext} disabled={currentPage >= totalPages} />
      </div>

      {loading && shows.length > 0 && (
        <div className="mt-5 flex justify-center">
          <Loader />
        </div>
      )}
    </div>
  );
}
