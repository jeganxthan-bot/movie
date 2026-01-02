import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, X, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

// Define a common Show interface for suggestions
export interface NavbarShow {
    _id: string;
    show_title: string;
    poster?: string;
    fanart?: string;
    year?: string | number;
    seasons?: string | number;
}

interface NavbarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    suggestions?: NavbarShow[];
    handleSuggestionClick?: (s: NavbarShow) => void;
    transparent?: boolean;
    isLoading?: boolean;
}

export default function Navbar({
    searchQuery,
    setSearchQuery,
    suggestions = [],
    handleSuggestionClick,
    transparent = false,
    isLoading = false
}: NavbarProps) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const pathname = usePathname();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/series", label: "Series" },
        { href: "/movies", label: "Movies" }
    ];

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${transparent ? 'bg-gradient-to-b' : 'bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-2xl'}`}>
                <div className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4">
                    {/* Mobile: Hamburger & Logo/Title Area */}
                    <div className="flex md:hidden items-center gap-4 flex-1">
                        <button
                            onClick={() => setSideMenuOpen(true)}
                            className="p-2 -ml-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Desktop: Traditional Links */}
                    <div className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`transition-colors ${pathname === link.href
                                    ? "text-white font-bold"
                                    : "hover:text-gray-200"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Side Area */}
                    <div className="flex items-center gap-6">
                        {/* Mobile Search Icon */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="p-2 rounded-full text-gray-400 hover:text-white transition-colors"
                            >
                                <Search className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Desktop Search Bar */}
                        <form onSubmit={(e) => e.preventDefault()} className="hidden md:block relative group">
                            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                className="bg-black/60 border border-white/10 group-focus-within:border-white/30 text-sm text-white pl-10 pr-4 py-2 w-[200px] md:w-[240px] md:focus:w-[280px] rounded-full focus:outline-none transition-all duration-300"
                            />
                            {/* Desktop Suggestions */}
                            {suggestions.length > 0 && searchQuery.length >= 2 && handleSuggestionClick && (
                                <div className="absolute top-full left-0 right-0 mt-3 bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50">
                                    {suggestions.map((s) => (
                                        <div
                                            key={s._id}
                                            onClick={() => handleSuggestionClick(s)}
                                            className="flex items-center gap-3 p-3 hover:bg-white/5 cursor-pointer transition-colors border-b border-white/5 last:border-0"
                                        >
                                            <div className="w-10 h-14 relative flex-shrink-0 bg-zinc-900 rounded-md overflow-hidden">
                                                {s.poster || s.fanart ? (
                                                    <Image src={s.poster || s.fanart || "/fallback.jpg"} alt={s.show_title} fill className="object-cover" unoptimized />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-[8px] text-gray-600 uppercase font-black">?</div>
                                                )}
                                            </div>
                                            <div className="min-w-0">
                                                <p className="text-sm text-white font-bold truncate">{s.show_title}</p>
                                                <p className="text-xs text-zinc-500">{s.year}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </form>
                    </div>
                </div>
            </nav>

            {/* Search Overlay (Mobile) */}
            {searchOpen && (
                <div className="fixed inset-0 bg-[#0a0a0a] z-[80] flex flex-col p-4 h-full animate-in fade-in duration-200">
                    <div className="flex items-center gap-3 mb-6 relative mt-14">
                        <button
                            onClick={() => {
                                setSearchOpen(false);
                                setSearchQuery("");
                            }}
                            className="p-2 rounded-full text-white hover:bg-white/10 transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex-1 relative">
                            <input
                                type="text"
                                placeholder="Search movies, shows..."
                                value={searchQuery}
                                onChange={handleSearchChange}
                                autoFocus
                                className="w-full bg-white/5 border border-white/10 text-white pl-5 pr-12 py-4 rounded-2xl focus:outline-none focus:border-red-600/50 transition-all text-xl"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery("")}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-white transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            )}
                        </div>
                    </div>
                    {/* Suggestions */}
                    {searchQuery.length >= 2 && (
                        <div className="flex-1 overflow-y-auto px-1 scrollbar-hide min-h-0">
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                                    <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
                                    <p className="text-zinc-400 font-medium tracking-wide">Searching for results...</p>
                                </div>
                            ) : suggestions && suggestions.length > 0 ? (
                                <div className="space-y-4 pb-10">
                                    {suggestions.map((s) => {
                                        const isMovie = s.seasons === "Movie" || !s.seasons;
                                        return (
                                            <div
                                                key={s._id}
                                                onClick={() => {
                                                    if (handleSuggestionClick) {
                                                        handleSuggestionClick(s);
                                                    }
                                                    setSearchOpen(false);
                                                }}
                                                className="flex items-center gap-4 p-4 bg-white/[0.03] hover:bg-white/10 rounded-2xl cursor-pointer transition-all border border-white/5 hover:border-white/10 group active:scale-[0.98]"
                                            >
                                                <div className="w-16 h-22 relative flex-shrink-0 bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                                                    {s.poster || s.fanart ? (
                                                        <Image
                                                            src={s.poster || s.fanart || "/fallback.jpg"}
                                                            alt={s.show_title}
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            sizes="64px"
                                                            unoptimized
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-500 uppercase font-bold text-center p-2">No Image</div>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1.5">
                                                        <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${isMovie ? 'bg-blue-500/20 text-blue-400 border border-blue-500/20' : 'bg-red-500/20 text-red-400 border border-red-500/20'}`}>
                                                            {isMovie ? 'Movie' : 'Series'}
                                                        </span>
                                                        <span className="text-xs text-zinc-500 font-bold">{s.year}</span>
                                                    </div>
                                                    <p className="text-lg text-white font-black leading-tight mb-1 line-clamp-1 group-hover:text-red-500 transition-colors">
                                                        {s.show_title}
                                                    </p>
                                                    {!isMovie && s.seasons && (
                                                        <p className="text-xs text-zinc-400 font-semibold tracking-wide">
                                                            {s.seasons} Seasons
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center py-20 text-zinc-500 px-8 text-center bg-white/[0.02] rounded-3xl border border-white/5 mx-2">
                                    <Search className="w-16 h-16 mb-4 opacity-10" />
                                    <p className="text-xl font-black text-white mb-2 uppercase tracking-tighter">No results found</p>
                                    <p className="text-base text-zinc-500 max-w-[200px] leading-snug">We couldn't find any matches for &quot;{searchQuery}&quot;</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Side Menu (Side Drawer) */}
            {sideMenuOpen && (
                <div className="fixed inset-0 z-[100] md:hidden">
                    {/* Backdrop Overlay */}
                    <div
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setSideMenuOpen(false)}
                    />

                    {/* Side Drawer */}
                    <div className="absolute top-0 left-0 bottom-0 w-[280px] bg-zinc-950 border-r border-white/10 shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <Image src="/favicon.ico" alt="logo" width={50} height={50} />
                            <button
                                onClick={() => setSideMenuOpen(false)}
                                className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex-1 py-8 px-4 flex flex-col gap-2">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`flex items-center px-6 py-4 rounded-2xl text-lg font-bold transition-all ${pathname === link.href
                                        ? "bg-red-600 text-white shadow-lg shadow-red-600/40"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                        }`}
                                    onClick={() => setSideMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
