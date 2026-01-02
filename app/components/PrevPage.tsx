"use client";

import React from "react";
import { ChevronLeft } from "lucide-react";

interface Props {
  onClick: () => void;
  disabled?: boolean;
}

const PrevPage = ({ onClick, disabled = false }: Props) => {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`
        flex items-center justify-center p-2 rounded-full 
        bg-white/10 backdrop-blur-md border border-white/5 
        text-white transition-all duration-300
        ${disabled
          ? "opacity-30 cursor-not-allowed"
          : "hover:bg-white/20 hover:scale-110 active:scale-95 shadow-lg shadow-black/20"
        }
      `}
      aria-label="Previous Page"
    >
      <ChevronLeft className="w-5 h-5" />
    </button>
  );
};

export default PrevPage;
