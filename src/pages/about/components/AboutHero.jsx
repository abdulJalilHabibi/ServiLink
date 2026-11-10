import React from "react";
import { HeartHandshake } from "lucide-react";

export const AboutHero = () => {
  return (
    <div className="text-center max-w-3xl mx-auto mb-14">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-3">
        <HeartHandshake className="w-3.5 h-3.5" />
        About ServiLink
      </div>
      <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight">
        Building Kabul's Most Trusted Local Services Network
      </h1>
      <p className="mt-4 text-slate-600 text-sm sm:text-base leading-relaxed">
        ServiLink was founded to solve a critical urban challenge: how to quickly find qualified, honest, and background-checked technicians for home and office repairs with guaranteed pricing.
      </p>
    </div>
  );
};
