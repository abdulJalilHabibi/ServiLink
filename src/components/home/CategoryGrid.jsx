import React from "react";
import { motion } from "motion/react";
import {
  Wrench,
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush,
  ArrowRight
} from "lucide-react";
import { CATEGORIES } from "../../data/mockData";
import { useNavigate } from "react-router-dom";

// Icon mapping helper
const ICON_MAP = {
  Zap,
  Droplet,
  Hammer,
  Cpu,
  Fan,
  Paintbrush,
  Wrench
};

export const CategoryGrid = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    navigate(`/services?category=${categoryId}`);
  };

  return (
    <section className="py-10  sm:py-14 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Browse by Service Category
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-500">
              Find certified local trade masters equipped for every repair.
            </p>
          </div>

          <button
            onClick={() => navigate("/services")}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#4F46E5] hover:text-[#4338CA] transition self-start sm:self-auto cursor-pointer"
          >
            <span>View all 24 categories</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Responsive Grid: 1 col on mobile, 2 col on tablet, 3 col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, index) => {
            const IconComponent = ICON_MAP[cat.icon] || Wrench;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                onClick={() => handleCategoryClick(cat.id)}
                className="group cursor-pointer bg-white rounded-2xl border border-slate-200/80 p-5 shadow-xs hover:shadow-md hover:border-indigo-200 transition-all flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  {/* Top row: Icon box + Pros badge */}
                  <div className="flex items-center justify-between mb-5">
                    {/* Icon container */}
                    <div className="w-10 h-10 rounded-xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shrink-0">
                      <IconComponent className="w-5 h-5 stroke-[1.8]" />
                    </div>

                    {/* Badge styling */}
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200/60 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                      {cat.prosCount}+ Pros
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-bold text-slate-900 text-base group-hover:text-indigo-600 transition-colors leading-snug">
                    {cat.name}
                  </h3>
                </div>

                {/* Pricing / CTA row */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-emerald-600 font-bold">
                    From ${cat.startingPrice}/hr
                  </span>
                  <span className="text-slate-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
