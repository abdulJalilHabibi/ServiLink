import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush,
  Sparkles,
  ArrowRight
} from "lucide-react";
import { CATEGORIES } from "../data/mockData";

const ICON_MAP = {
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush
};

export const CategoriesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Zap;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Icon className="w-6 h-6 stroke-[1.8]" />
                    </div>
                    <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
                      {cat.prosCount} Verified Pros
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {cat.name}
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
                      Starting Rate
                    </span>
                    <span className="text-base font-black text-emerald-600">
                      ${cat.startingPrice}/hr
                    </span>
                  </div>

                  <button
                    onClick={() => navigate(`/services?category=${cat.id}`)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition active:scale-95"
                  >
                    <span>Browse Pros</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Need a Custom Trade or Complex Renovation?
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Our central operations team can assemble a specialized multi-trade crew for extensive villa or office repairs.
            </p>
          </div>
          <Link
            to="/contact"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition active:scale-95 whitespace-nowrap"
          >
            Contact Central Dispatch
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;
