import React from "react";
import { TrendingUp, Star } from "lucide-react";

export const ProviderKpiCards = ({ currentUser, servicesCount }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Monthly Earnings
        </span>
        <div className="text-2xl sm:text-3xl font-black text-slate-900">
          $3,420
        </div>
        <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
          <TrendingUp className="w-3 h-3" /> +14% vs last month
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Jobs Completed
        </span>
        <div className="text-2xl sm:text-3xl font-black text-indigo-600">
          {currentUser?.jobsCompleted || 430}
        </div>
        <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
          99.2% success score
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Average Rating
        </span>
        <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
          <span>{currentUser?.rating || 4.98}</span>
          <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
        </div>
        <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
          Based on 284 reviews
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
          Active Offerings
        </span>
        <div className="text-2xl sm:text-3xl font-black text-slate-900">
          {servicesCount}
        </div>
        <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
          Live in Kabul directory
        </span>
      </div>
    </div>
  );
};
