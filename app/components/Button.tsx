"use client";

import React from "react";
import Link from "next/link";

const Button = ({ showId }: { showId: string }) => {
  return (
    <>
      <style jsx>{`
        @keyframes arrow {
          0% {
            opacity: 0;
            transform: translateX(0);
          }
          100% {
            opacity: 1;
            transform: translateX(10px);
          }
        }
        .animate-arrow {
          animation: arrow 1s linear infinite;
        }
      `}</style>
      <Link
        href={`/series/${showId}`}
        className="group flex w-[170px] bg-[#1d2129] rounded-[40px] shadow-[0px_5px_10px_#bebebe] justify-between items-center no-underline px-3 py-2 cursor-pointer border-none transition-colors duration-300"
      >
        <span className="flex-1 flex items-center justify-center text-white text-[1.1em] tracking-[1.2px] font-bold">
          Watch
        </span>
        <span className="w-[45px] h-[45px] bg-[#f59aff] rounded-full flex items-center justify-center border-[3px] border-[#1d2129] relative overflow-hidden">
          <svg
            width={16}
            height={19}
            viewBox="0 0 16 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-all duration-1000 group-hover:animate-arrow"
          >
            <circle cx="1.61321" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="1.61321" r="1.5" fill="black" />
            <circle cx="5.73583" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="5.5566" r="1.5" fill="black" />
            <circle cx="9.85851" cy="9.5" r="1.5" fill="black" />
            <circle cx="13.9811" cy="9.5" r="1.5" fill="black" />
            <circle cx="5.73583" cy="13.4434" r="1.5" fill="black" />
            <circle cx="9.85851" cy="13.4434" r="1.5" fill="black" />
            <circle cx="1.61321" cy="17.3868" r="1.5" fill="black" />
            <circle cx="5.73583" cy="17.3868" r="1.5" fill="black" />
          </svg>
        </span>
      </Link>
    </>
  );
};

export default Button;
