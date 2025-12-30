"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Loader from "../components/Loader";
import PrevPage from "../components/PrevPage";
import NextPage from "../components/NextPage";
import Navbar, { NavbarShow } from "../components/Navbar";

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

const SHOWS_PER_PAGE = 24;

export default function MoviesPage() {
    const router = useRouter();
    const [shows, setShows] = useState<Show[]>([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    // suggestions state
    const [suggestions, setSuggestions] = useState<NavbarShow[]>([]);

    const reqIdRef = useRef(0);
    const controllerRef = useRef<AbortController | null>(null);
    const suggestControllerRef = useRef<AbortController | null>(null);

    const [currentPage, setCurrentPage] = useState<number>(1);
    const safeSetShows = (arr: Show[]) => setShows(arr);

    // Fetch Suggestions
    const fetchSuggestions = async (q: string) => {
        if (suggestControllerRef.current) suggestControllerRef.current.abort();
        suggestControllerRef.current = new AbortController();
        const signal = suggestControllerRef.current.signal;

        try {
            const res = await fetch(`/api/series?search=${encodeURIComponent(q)}`, { signal });
            const data = await res.json();
            if (!res.ok) {
                setSuggestions([]);
                return;
            }
            const list: NavbarShow[] = Array.isArray(data.results) ? data.results : [];
            setSuggestions(list);
        } catch (err: any) {
            if (err?.name === "AbortError") return;
            setSuggestions([]);
        }
    };

    const fetchShows = async (query = "") => {
        const thisReqId = ++reqIdRef.current;
        if (controllerRef.current) controllerRef.current.abort();
        controllerRef.current = new AbortController();
        const signal = controllerRef.current.signal;

        setLoading(true);

        try {
            let res: Response;
            let data: any;
            const searchUrl = query
                ? `/api/series?search=${encodeURIComponent(query)}`
                : "/api/shows?category=movie";

            res = await fetch(searchUrl, { signal });
            data = await res.json();

            if (!res.ok) {
                if (thisReqId === reqIdRef.current) {
                    safeSetShows([]);
                    setLoading(false);
                }
                return;
            }

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
            if (thisReqId === reqIdRef.current) {
                safeSetShows([]);
            }
        } finally {
            if (thisReqId === reqIdRef.current) setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchShows(searchQuery);
            if (searchQuery.length >= 2) {
                fetchSuggestions(searchQuery);
            } else {
                setSuggestions([]);
            }
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const handleSuggestionClick = (s: NavbarShow) => {
        setSuggestions([]);
        setSearchQuery("");
        router.push(`/series/${s._id}`);
    };

    const startIndex = (currentPage - 1) * SHOWS_PER_PAGE;
    const pageShows = shows.slice(startIndex, startIndex + SHOWS_PER_PAGE);
    const totalPages = Math.max(1, Math.ceil(shows.length / SHOWS_PER_PAGE));

    const goNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage((p) => p + 1);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 80);
        }
    };

    const goPrev = () => {
        if (currentPage > 1) {
            setCurrentPage((p) => p - 1);
            setTimeout(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }, 80);
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white">
            <Navbar
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                suggestions={suggestions}
                handleSuggestionClick={handleSuggestionClick}
                transparent={false}
            />

            <div className="pt-24 px-4 md:px-8 pb-20 max-w-[1800px] mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-white border-l-4 border-red-600 pl-4">All Movies</h1>

                {loading && shows.length === 0 ? (
                    <div className="flex justify-center py-20"><Loader /></div>
                ) : shows.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                        {pageShows.map((show) => (
                            <Link
                                key={show._id}
                                href={`/series/${show._id}`}
                                className="relative w-full cursor-pointer group hover:scale-105 transition-transform duration-300"
                            >
                                <div className="w-full aspect-[2/3] overflow-hidden rounded-md shadow-lg bg-zinc-900 border border-transparent group-hover:border-zinc-700">
                                    {show.poster ? (
                                        <Image
                                            src={show.poster}
                                            alt={show.show_title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs">No image</div>
                                    )}
                                </div>
                                <div className="mt-2">
                                    <h3 className="text-sm font-bold text-gray-200 truncate group-hover:text-white">{show.show_title}</h3>
                                    <p className="text-xs text-gray-500">{show.year}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-500 py-20">No movies found.</div>
                )}

                {/* Pagination */}
                {shows.length > 0 && (
                    <div className="mt-12 flex items-center justify-center gap-6">
                        <PrevPage onClick={goPrev} disabled={currentPage === 1} />
                        <div className="text-gray-400 text-sm font-medium">
                            <span className="text-white">{currentPage}</span> / {totalPages}
                        </div>
                        <NextPage onClick={goNext} disabled={currentPage >= totalPages} />
                    </div>
                )}
            </div>
        </div>
    );
}
