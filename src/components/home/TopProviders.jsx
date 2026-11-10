import React, { useState } from "react";
import { TOP_PROVIDERS } from "../../data/mockData";
import { ProviderCard } from "../ui/ProviderCard";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const TopProviders = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();

  const filterTabs = [
    { id: "all", label: "All Specialists" },
    { id: "electrical", label: "Electrical" },
    { id: "plumbing", label: "Plumbing" },
    { id: "hvac", label: "HVAC" },
    { id: "cleaning", label: "Cleaning" },
  ];

  const filteredPros =
    selectedFilter === "all"
      ? TOP_PROVIDERS
      : TOP_PROVIDERS.filter((pro) => pro.category === selectedFilter);

  return (
    <section
      id="technicians"
      className="scroll-mt-20 py-12 sm:py-16 md:py-20 bg-[#FAFAFC] px-4 sm:px-6 md:px-10 border-y border-slate-200/70"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header (cleanly structured for mobile, tablet & desktop) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 sm:mb-10 gap-5">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#059669] text-xs font-bold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-3.5 h-3.5 text-[#10B981]" />
              Top Rated Technicians
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
              Verified Service Specialists
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm md:text-base text-[#64748B]">
              Every technician passes strict criminal background screening,
              skill testing, and license verification.
            </p>
          </div>

          {/* Quick Filter Pill Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full scrollbar-none flex-wrap">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap active:scale-95 cursor-pointer ${
                  selectedFilter === tab.id
                    ? "bg-[#4F46E5] text-white shadow-xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on tablet & desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6 items-stretch">
          {filteredPros.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>

        {/* Bottom Banner CTA */}
        <div className="mt-10 sm:mt-12 text-center">
          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-300 hover:border-indigo-600 text-slate-700 hover:text-indigo-600 font-bold text-sm transition active:scale-95 bg-white shadow-xs cursor-pointer"
          >
            <span>Explore All 1,200+ Verified Pros</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopProviders;
