import React from "react";
import { MapPin, CheckCircle2 } from "lucide-react";
import { CITIES } from "../../../data/mockData";

export const AboutCoverageMap = () => {
  return (
    <div className="bg-[#4F46E5] text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          Service Footprint
        </span>
        <h2 className="text-2xl sm:text-3xl font-black mb-3">
          Rapid Response Across All 22 Kabul Districts
        </h2>
        <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed mb-6">
          Our decentralized technician hubs ensure rapid arrival in Wazir Akbar Khan, Shahr-e Naw, Kart-e Parwan, Deh Bori, Darulaman, and beyond.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
          {CITIES.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 text-indigo-100">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
