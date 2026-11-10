import React from "react";
import { Sparkles } from "lucide-react";

export const ServicesHeader = () => {
  return (
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
  );
};
