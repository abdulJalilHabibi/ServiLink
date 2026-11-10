import React from "react";
import { Search, RefreshCw } from "lucide-react";

export const ServicesEmptyState = ({ onReset }) => {
  return (
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
        onClick={onReset}
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-indigo-700 transition cursor-pointer"
      >
        <RefreshCw className="w-4 h-4" />
        <span>Clear All Filters</span>
      </button>
    </div>
  );
};
