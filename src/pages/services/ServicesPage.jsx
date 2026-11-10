import React, { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { TOP_PROVIDERS, CATEGORIES, CITIES } from "../../data/mockData";
import { ProviderCard } from "../../components/ui/ProviderCard";
import { ServicesHeader } from "./components/ServicesHeader";
import { ServicesFilterBar } from "./components/ServicesFilterBar";
import { ServicesEmptyState } from "./components/ServicesEmptyState";

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
      const matchesCategory =
        activeCategory === "all" || pro.category.toLowerCase() === activeCategory.toLowerCase();

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        pro.name.toLowerCase().includes(query) ||
        pro.tradeHeadline.toLowerCase().includes(query) ||
        pro.skills.some((s) => s.toLowerCase().includes(query)) ||
        pro.location.toLowerCase().includes(query);

      const matchesDistrict =
        selectedDistrict === "All Districts (Kabul Metro)" ||
        pro.location.toLowerCase().includes(selectedDistrict.toLowerCase().replace("district", "").trim()) ||
        pro.location.includes(selectedDistrict);

      const matchesRating = minRating === 0 || pro.rating >= minRating;
      const matchesPrice = pro.hourlyRate <= maxPrice;

      return matchesCategory && matchesSearch && matchesDistrict && matchesRating && matchesPrice;
    });

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
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ServicesHeader />

        <ServicesFilterBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          cities={CITIES}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOptions={SORT_OPTIONS}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          categories={CATEGORIES}
          maxPrice={maxPrice}
          setMaxPrice={setMaxPrice}
          minRating={minRating}
          setMinRating={setMinRating}
          hasActiveFilters={hasActiveFilters}
          onResetFilters={handleResetFilters}
        />

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
          <ServicesEmptyState onReset={handleResetFilters} />
        )}
      </div>
    </div>
  );
};

export default ServicesPage;
