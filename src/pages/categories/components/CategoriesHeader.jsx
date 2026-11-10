import React from "react";
import { Sparkles } from "lucide-react";

export const CategoriesHeader = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-3">
        <Sparkles className="w-3.5 h-3.5" />
        Trade Directory
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        Explore All Service Categories
      </h1>
      <p className="mt-2 text-slate-500 text-sm sm:text-base">
        From electrical blackouts and pipe leak repairs to seasonal HVAC maintenance and custom carpentry across Kabul metro.
      </p>
    </div>
  );
};
