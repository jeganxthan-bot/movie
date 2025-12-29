"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-6">
      <div className="text-center max-w-xl">
        <h1 className="text-[120px] font-black text-white leading-none">
          404
        </h1>

        <p className="mt-4 text-xl text-gray-400">
          The page you’re looking for doesn’t exist.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Or access was restricted.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            href="/"
            className="px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => history.back()}
            className="px-6 py-3 bg-white/10 text-white font-bold rounded-lg hover:bg-white/20 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
