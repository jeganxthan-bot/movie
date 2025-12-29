"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, TrendingUp, Star } from "lucide-react";
import { useRouter } from "next/navigation";

interface PopularSeries {
  _id: string;
  show_title: string;
  fanart?: string;
  poster?: string;
  series_logo?: string;
  year?: string | number | null;
  rating?: string | null;
}

interface Props {
  seriesList: PopularSeries[];
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export default function PopularSeries({ seriesList, searchQuery, setSearchQuery }: Props) {
  const router = useRouter();
  const sliderRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!seriesList || seriesList.length === 0) return null;

  return (
    <div className="w-full relative py-8 px-0">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between px-4 md:px-8 mb-4 gap-6">
        <div className="flex items-center gap-8 text-gray-400 text-sm font-medium">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <TrendingUp className="text-white" />
            <span>Trends Now</span>
          </div>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative group">
        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-12"
        >
          <ArrowLeft size={32} />
        </button>

        {/* Scrollable Area */}
        <div
          ref={sliderRef}
          className="flex overflow-x-auto gap-4 px-4 md:px-8 py-8 scrollbar-hide scroll-smooth"
        >
          {seriesList.map((series) => (
            <div
              key={series._id}
              onClick={() => router.push(`/series/${series._id}`)}
              className="flex-shrink-0 w-[200px] md:w-[240px] cursor-pointer group/card transition-transform duration-300 hover:scale-105"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[2/3] rounded-lg overflow-hidden shadow-lg border border-transparent group-hover/card:border-gray-600">
                <Image
                  src={series.poster || series.fanart || "/fallback.jpg"}
                  alt={series.show_title}
                  fill
                  className="object-cover"
                />
                {/* Rating badge */}
                {series.rating && (
                  <div className="absolute top-2 right-2 bg-black/60 text-yellow-400 text-xs font-bold px-1.5 py-0.5 rounded flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> {series.rating}
                  </div>
                )}
              </div>

              {/* Card Meta */}
              <div className="mt-3">
                <h3 className="text-white font-bold text-lg truncate group-hover/card:text-red-500 transition-colors">
                  {series.show_title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                  <span>{series.year || "2021"}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-0 bottom-0 z-20 bg-black/50 hover:bg-black/80 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center w-12"
        >
          <ArrowRight size={32} />
        </button>
      </div>
    </div>
  );
}
