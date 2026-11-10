import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Search,
  X,
  Sparkles,
  MapPin,
  ArrowUpDown,
  RefreshCw
} from "lucide-react";
import { TOP_PROVIDERS, CATEGORIES, CITIES } from "../data/mockData";
import { ProviderCard } from "../components/ui/ProviderCard";
import { CustomSelect } from "../components/ui/CustomSelect";

const SORT_OPTIONS = [
  { value: "rating-desc", label: "Sort: Highest Rated" },
  { value: "price-asc", label: "Sort: Price (Low to High)" },
  { value: "price-desc", label: "Sort: Price (High to Low)" },
  { value: "reviews-desc", label: "Sort: Most Reviews" },
  { value: "jobs-desc", label: "Sort: Most Jobs Completed" },
];

export const ServicesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const initialQuery = searchParams.get("query") || "";
  const initialDistrict = searchParams.get("district") || "All Districts (Kabul Metro)";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [sortBy, setSortBy] = useState("rating-desc");
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(100);

  // Synchronize category param changes
  const handleCategoryChange = (catId) => {
    setActiveCategory(catId);
    if (catId === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", catId);
    }
    setSearchParams(searchParams);
  };

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    let result = TOP_PROVIDERS.filter((pro) => {
      // Category match
      const matchesCategory =
        activeCategory === "all" || pro.category.toLowerCase() === activeCategory.toLowerCase();

      // Search match
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        pro.name.toLowerCase().includes(query) ||
        pro.tradeHeadline.toLowerCase().includes(query) ||
        pro.skills.some((s) => s.toLowerCase().includes(query)) ||
        pro.location.toLowerCase().includes(query);

      // District match
      const matchesDistrict =
        selectedDistrict === "All Districts (Kabul Metro)" ||
        pro.location.toLowerCase().includes(selectedDistrict.toLowerCase().replace("district", "").trim()) ||
        pro.location.includes(selectedDistrict);

      // Rating match
      const matchesRating = minRating === 0 || pro.rating >= minRating;

      // Price match
      const matchesPrice = pro.hourlyRate <= maxPrice;

      return matchesCategory && matchesSearch && matchesDistrict && matchesRating && matchesPrice;
    });

    // Sort result
    if (sortBy === "rating-desc") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "price-asc") {
      result.sort((a, b) => a.hourlyRate - b.hourlyRate);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.hourlyRate - a.hourlyRate);
    } else if (sortBy === "reviews-desc") {
      result.sort((a, b) => b.reviewCount - a.reviewCount);
    } else if (sortBy === "jobs-desc") {
      result.sort((a, b) => b.jobsCompleted - a.jobsCompleted);
    }

    return result;
  }, [activeCategory, searchQuery, selectedDistrict, minRating, maxPrice, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSelectedDistrict("All Districts (Kabul Metro)");
    setSortBy("rating-desc");
    setMinRating(0);
    setMaxPrice(100);
    setSearchParams({});
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    searchQuery.trim() !== "" ||
    selectedDistrict !== "All Districts (Kabul Metro)" ||
    minRating > 0 ||
    maxPrice < 100;

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Title */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Verified Technician Directory
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Find Trusted Local Service Pros
          </h1>
          <p className="text-slate-500 text-sm sm:text-base mt-1 max-w-2xl">
            Browse verified specialists with upfront hourly rates, real reviews, and 100% background checks across Kabul.
          </p>
        </div>

        {/* Filter & Search Bar Container */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, skill (e.g. Solar, Wiring, PVC), or service..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* District Selector */}
            <div className="md:col-span-4 relative">
              <CustomSelect
                value={selectedDistrict}
                onChange={setSelectedDistrict}
                options={CITIES}
                icon={MapPin}
                placeholder="Select District"
              />
            </div>

            {/* Sort Selector */}
            <div className="md:col-span-3 relative">
              <CustomSelect
                value={sortBy}
                onChange={setSortBy}
                options={SORT_OPTIONS}
                icon={ArrowUpDown}
                placeholder="Sort By"
              />
            </div>
          </div>

          {/* Quick Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => handleCategoryChange("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              All Categories
            </button>
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 cursor-pointer ${
                  activeCategory === cat.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Secondary Filter Bar: Price Slider + Rating Pills + Reset */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-4">
              {/* Max Rate Slider */}
              <div className="flex items-center gap-2">
                <span className="text-slate-500 font-semibold">Max Rate:</span>
                <input
                  type="range"
                  min="20"
                  max="100"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-24 sm:w-32 accent-indigo-600 cursor-pointer"
                />
                <span className="font-bold text-slate-900">${maxPrice}/hr</span>
              </div>

              {/* Min Rating Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-slate-500 font-semibold">Rating:</span>
                {[0, 4.8, 4.9].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`px-2.5 py-1 rounded-lg font-semibold transition ${
                      minRating === rating
                        ? "bg-amber-100 text-amber-800 border border-amber-300"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {rating === 0 ? "Any" : `${rating} ★+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All Filters Button */}
            {hasActiveFilters && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition ml-auto"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* Results Count and Status Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-sm font-semibold text-slate-600">
            Showing <strong className="text-slate-900">{filteredProviders.length}</strong> verified specialists
            {activeCategory !== "all" && (
              <span> in <span className="text-indigo-600 font-bold capitalize">{activeCategory}</span></span>
            )}
          </div>
        </div>

        {/* Providers Grid or Empty State */}
        {filteredProviders.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">
              No matching service pros found
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              We couldn't find any verified specialists matching your current search parameters. Try expanding your location or price range.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-indigo-700 transition"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Clear All Filters</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
