import React from "react";
import { STATS } from "../../../data/mockData";

export const AboutStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-16">
      {STATS.map((stat, idx) => (
        <div
          key={idx}
          className="bg-white rounded-3xl p-6 sm:p-8 text-center border border-slate-200/90 shadow-sm"
        >
          <div className="text-3xl sm:text-4xl font-black text-indigo-600 mb-1">
            {stat.value}
          </div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
