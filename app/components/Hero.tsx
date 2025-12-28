"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Plus } from "lucide-react";
import Link from "next/link";

interface Show {
    _id: string;
    show_title: string;
    poster?: string;
    series_logo?: string;
    fanart?: string;
    description?: string;
    year?: string | number;
    rating?: string | null;
    seasons?: string | number | null;
}

interface HeroProps {
    shows: Show[];
}

export default function Hero({ shows }: HeroProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (!shows || shows.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % shows.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [shows]);

    if (!shows || shows.length === 0) return null;

    return (
        <div className="relative w-full h-screen overflow-hidden group">
            {/* Slides */}
            {shows.map((show, index) => {
                // Determine position relative to current index
                // We want a simple slide right effect: 
                // incoming slide (next) is at transform: translateX(100%), current is 0, previous is -100%
                // But for a simple "carousel" where everything slides right (or left):
                // Let's say we want to slide to the *next* image, so images move Left.
                // Wait, user said "image should slide right". That usually means content moves L->R.
                // So incoming image comes from Left? Or incoming comes from Right and moves Left?
                // Standard auto-play usually moves content TO the left (showing next item from right).
                // Let's implement standard "Next" slide: Incoming comes from Right, Current goes Left.

                let positionClass = "translate-x-full opacity-0"; // Default: waiting on right
                if (index === currentIndex) {
                    positionClass = "translate-x-0 opacity-100 z-10"; // Active
                } else if (index === (currentIndex - 1 + shows.length) % shows.length) {
                    positionClass = "-translate-x-full opacity-0"; // Previous: exited left
                }

                return (
                    <div
                        key={show._id}
                        className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out ${positionClass}`}
                    >
                        {/* Background Image */}
                        <div className="absolute inset-0 w-full h-full">
                            <Image
                                src={show.fanart || show.poster || "/fallback.jpg"}
                                alt={show.show_title}
                                fill
                                className="object-cover"
                                priority={index === currentIndex}
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/30 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-16 max-w-3xl space-y-6">
                            {/* Meta info */}
                            <div className="flex items-center space-x-4 text-sm md:text-base text-gray-300 font-medium">
                                <span className="text-yellow-400 font-bold flex items-center gap-1">
                                    ★ {show.rating || "N/A"}
                                </span>
                                <span>{show.year}</span>
                                {show.seasons && <span>{show.seasons} Season{Number(show.seasons) > 1 ? "s" : ""}</span>}
                            </div>

                            {/* Title */}
                            {/* Title or Logo */}
                            <div className="animate-slideUp delay-100">
                                {show.series_logo ? (
                                    <div className="relative w-[300px] md:w-[500px] h-32 md:h-48 mb-4">
                                        <Image
                                            src={show.series_logo}
                                            alt={show.show_title}
                                            fill
                                            className="object-contain object-left"
                                        />
                                    </div>
                                ) : (
                                    <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-none drop-shadow-xl uppercase">
                                        {show.show_title}
                                    </h1>
                                )}
                            </div>

                            {/* Description */}
                            <p className="text-gray-200 text-lg md:text-xl line-clamp-3 max-w-2xl drop-shadow-md">
                                {show.description}
                            </p>

                            {/* Buttons */}
                            <div className="flex items-center space-x-4 pt-4">
                                <Link
                                    href={`/series/${show._id}`}
                                    className="flex items-center gap-2 px-8 py-3 bg-[#E50914] hover:bg-[#b00710] text-white rounded font-bold text-lg transition-colors"
                                >
                                    <Play fill="currentColor" size={20} />
                                    WATCH
                                </Link>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Bar Indicator */}
            <div className="absolute bottom-10 right-10 flex gap-2 z-20">
                {shows.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrentIndex(idx)}
                        className="relative h-1 w-10 bg-gray-600/50 rounded-full overflow-hidden"
                    >
                        <div
                            className={`absolute inset-y-0 left-0 bg-white transition-all duration-300 ${idx === currentIndex ? "w-full" : "w-0"
                                }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
