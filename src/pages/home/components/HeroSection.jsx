import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, MapPin, ArrowRight, CheckCircle2 } from "lucide-react";
import { STATS, TRUST_BADGES, CITIES } from "../../../data/mockData";
import { useNavigate } from "react-router-dom";

export const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState(CITIES[0]);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/services?query=${encodeURIComponent(searchQuery.trim())}&district=${encodeURIComponent(selectedCity)}`);
    } else {
      navigate(`/services?district=${encodeURIComponent(selectedCity)}`);
    }
  };

  return (
    <section className="relative  overflow-hidden pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pt-14 lg:pb-20">
      {/* Ambient Radial Glow with Subtle Pulse */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[600px] lg:w-[800px] h-[320px] sm:h-[450px] lg:h-[550px] bg-gradient-to-tr from-indigo-500/15 via-blue-400/10 to-emerald-400/10 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Tablet/Desktop Hero Card Frame */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 shadow-sm border border-slate-200/80">
          <div className="text-center max-w-3xl mx-auto">
            {/* Top Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ECFDF5] border border-emerald-200/80 shadow-xs mb-5 sm:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#059669] uppercase">
                142 VETTED PROS ACTIVE NEARBY
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0F172A] tracking-tight leading-tight sm:leading-tight"
            >
              Connect with{" "}
              <span className="text-[#4F46E5] inline-block">Verified Local Pros</span> in Under 5 Minutes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 sm:mt-5 text-sm sm:text-base text-[#64748B] leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Upfront pricing, certified background-checked technicians, and instant home repair booking with zero guesswork.
            </motion.p>

            {/* Search Box Container (Horizontal on tablet & desktop) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8"
            >
              <form
                onSubmit={handleSearchSubmit}
                className="bg-[#F8FAFC] rounded-2xl md:rounded-full p-2 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-2 max-w-2xl mx-auto"
              >
                {/* Keyword Search Input */}
                <div className="flex-1 flex items-center px-3.5 py-2">
                  <Search className="w-4 h-4 text-slate-400 shrink-0 mr-2.5" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="What help do you need? (e.g. Electrician, Plumber)"
                    className="w-full bg-transparent text-sm text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
                  />
                </div>

                {/* Divider on tablet/desktop */}
                <div className="hidden md:block w-px h-6 bg-slate-300 shrink-0" />

                {/* City / Region Dropdown */}
                <div className="flex items-center px-3 py-2 border-t md:border-t-0 border-slate-200">
                  <MapPin className="w-4 h-4 text-slate-400 shrink-0 mr-2" />
                  <select
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                    className="bg-transparent text-xs sm:text-sm text-slate-700 font-semibold focus:outline-none cursor-pointer pr-1"
                  >
                    <option value="Metro & Suburbs">Metro & Suburbs</option>
                    {CITIES.map((city, idx) => (
                      <option key={idx} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Action Button */}
                <button
                  type="submit"
                  className="w-full md:w-auto bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold px-6 py-2.5 rounded-xl md:rounded-full shadow-md shadow-indigo-500/20 transition duration-150 flex items-center justify-center gap-1.5 text-sm whitespace-nowrap active:scale-95 cursor-pointer"
                >
                  <span>Search Pros</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>

            {/* Trust Badges Row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-600 font-medium"
            >
              {TRUST_BADGES.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981] fill-emerald-100 shrink-0" />
                  <span>{badge}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* 3 Stats Cards: Light Blue background as in Figma image */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-5 max-w-4xl mx-auto"
          >
            {STATS.map((stat, idx) => (
              <div
                key={idx}
                className="bg-[#EFF6FF]/70 rounded-2xl border border-blue-100/60 p-4 sm:p-5 md:p-6 text-center flex flex-col items-center justify-center transition-all"
              >
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-[#0F172A] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-slate-500 mt-1.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
