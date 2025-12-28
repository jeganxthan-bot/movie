import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";

// Define a common Show interface for suggestions
export interface NavbarShow {
    _id: string;
    show_title: string;
    poster?: string;
    fanart?: string;
    year?: string | number;
}

interface NavbarProps {
    searchQuery: string;
    setSearchQuery: (q: string) => void;
    suggestions?: NavbarShow[];
    handleSuggestionClick?: (s: NavbarShow) => void;
    transparent?: boolean;
}

export default function Navbar({
    searchQuery,
    setSearchQuery,
    suggestions = [],
    handleSuggestionClick,
    transparent = false
}: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 md:px-8 py-4 transition-all duration-300 ${transparent ? 'bg-gradient-to-b from-black/90 to-transparent' : 'bg-black/90 border-b border-gray-800'}`}>
            <div className="flex items-center gap-4 md:gap-8">
                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-6 text-sm text-gray-300 font-medium">
                    <Link href="/" className="text-white font-bold hover:text-gray-200 transition">Home</Link>
                    <Link href="/series" className="hover:text-gray-200 transition">Series</Link>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {mobileMenuOpen && (
                <div className="absolute top-full left-0 right-0 bg-black/95 border-b border-gray-800 p-4 flex flex-col gap-4 md:hidden animate-fadeIn">
                    <Link
                        href="/"
                        className="text-white font-bold text-lg hover:text-gray-200"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link
                        href="/series"
                        className="text-gray-300 font-medium text-lg hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Series
                    </Link>
                </div>
            )}

            <div className="flex items-center gap-4 text-white">
                {/* Search Input */}
                <div className="relative group">
                    <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Titles, people, genres"
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-black/60 border border-transparent group-focus-within:border-white/50 text-sm text-white pl-10 pr-4 py-1.5 w-[160px] md:w-[240px] focus:w-[280px] rounded-sm focus:outline-none transition-all duration-300"
                    />
                    {/* Suggestions Dropdown */}
                    {suggestions.length > 0 && searchQuery.length >= 2 && handleSuggestionClick && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-700 rounded-sm shadow-xl overflow-hidden z-50">
                            {suggestions.map((s) => (
                                <div
                                    key={s._id}
                                    onClick={() => handleSuggestionClick(s)}
                                    className="flex items-center gap-3 p-2 hover:bg-zinc-800 cursor-pointer transition-colors"
                                >
                                    <div className="w-8 h-12 relative flex-shrink-0 bg-zinc-800">
                                        {s.poster || s.fanart ? (
                                            <Image src={s.poster || s.fanart || "/fallback.jpg"} alt={s.show_title} fill className="object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xs text-gray-500">No Img</div>
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-sm text-white font-medium truncate">{s.show_title}</p>
                                        <p className="text-xs text-zinc-400">{s.year}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
