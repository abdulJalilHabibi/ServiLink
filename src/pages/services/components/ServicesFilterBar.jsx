import React from "react";
import { Search, X, MapPin, ArrowUpDown, RefreshCw } from "lucide-react";
import { CustomSelect } from "../../../components/ui/CustomSelect";

export const ServicesFilterBar = ({
  searchQuery,
  setSearchQuery,
  selectedDistrict,
  setSelectedDistrict,
  cities,
  sortBy,
  setSortBy,
  sortOptions,
  activeCategory,
  onCategoryChange,
  categories,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
  hasActiveFilters,
  onResetFilters
}) => {
  return (
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
              className="absolute right-3 top-3 text-slate-400 hover:text-slate-600 cursor-pointer"
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
            options={cities}
            icon={MapPin}
            placeholder="Select District"
          />
        </div>

        {/* Sort Selector */}
        <div className="md:col-span-3 relative">
          <CustomSelect
            value={sortBy}
            onChange={setSortBy}
            options={sortOptions}
            icon={ArrowUpDown}
            placeholder="Sort By"
          />
        </div>
      </div>

      {/* Quick Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <button
          onClick={() => onCategoryChange("all")}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 cursor-pointer ${
            activeCategory === "all"
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-slate-100 text-slate-600 hover:bg-slate-200"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
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
                className={`px-2.5 py-1 rounded-lg font-semibold transition cursor-pointer ${
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
            onClick={onResetFilters}
            className="inline-flex items-center gap-1 text-indigo-600 hover:text-indigo-800 font-bold transition ml-auto cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>
    </div>
  );
};
