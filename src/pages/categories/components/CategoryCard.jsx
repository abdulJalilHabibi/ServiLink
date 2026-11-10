import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush,
  ArrowRight
} from "lucide-react";

const ICON_MAP = {
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush
};

export const CategoryCard = ({ category }) => {
  const navigate = useNavigate();
  const Icon = ICON_MAP[category.icon] || Zap;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs hover:shadow-lg hover:border-indigo-200 transition-all flex flex-col justify-between group">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:scale-105 transition-transform">
            <Icon className="w-6 h-6 stroke-[1.8]" />
          </div>
          <span className="text-xs font-bold text-slate-600 bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200/80">
            {category.prosCount} Verified Pros
          </span>
        </div>

        <h2 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors">
          {category.name}
        </h2>

        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-4">
          {category.description}
        </p>
      </div>

      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
        <div>
          <span className="text-[11px] font-semibold text-slate-400 block uppercase tracking-wider">
            Starting Rate
          </span>
          <span className="text-base font-black text-emerald-600">
            ${category.startingPrice}/hr
          </span>
        </div>

        <button
          onClick={() => navigate(`/services?category=${category.id}`)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white font-bold text-xs transition active:scale-95 cursor-pointer"
        >
          <span>Browse Pros</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
