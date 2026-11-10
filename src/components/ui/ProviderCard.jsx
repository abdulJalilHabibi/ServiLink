import React from "react";
import { motion } from "motion/react";
import { Star, ShieldCheck, MapPin, Zap, Heart, Eye } from "lucide-react";
import { useBooking } from "../../context/useBooking";

export const ProviderCard = ({ provider }) => {
  const { openBookingModalWithPro, openProDetails, isFavorite, toggleFavorite } = useBooking();
  const favorited = isFavorite(provider.id);

  const handleCardClick = (e) => {
    // Prevent opening modal if clicking favorite or book button directly
    if (e.target.closest("button") || e.target.closest("a")) return;
    openProDetails(provider);
  };

  return (
    <motion.div
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      onClick={handleCardClick}
      className="group bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 md:p-5 lg:p-6 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:border-indigo-200 transition-all flex flex-col justify-between cursor-pointer relative"
    >
      <div>
        {/* Top Header: Avatar + Info + Absolute Favorite Button */}
        <div className="flex items-start gap-3 relative">
          <div className="relative shrink-0">
            <img
              src={provider.avatar}
              alt={provider.name}
              className="w-13 h-13 sm:w-14 sm:h-14 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-2xl object-cover ring-2 ring-slate-100 shadow-2xs"
              loading="lazy"
            />
            {provider.verified && (
              <span
                title="Verified & Background Checked"
                className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow-xs ring-2 ring-white flex items-center justify-center"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0 pr-8">
            <div className="flex items-center gap-1.5 flex-wrap">
              <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug group-hover:text-indigo-600 transition-colors">
                {provider.name}
              </h3>
              {provider.badge && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100 shrink-0">
                  {provider.badge}
                </span>
              )}
            </div>

            <p className="text-xs font-semibold text-indigo-600 truncate mt-0.5">
              {provider.tradeHeadline}
            </p>

            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center text-amber-500 font-bold shrink-0">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 mr-1" />
                {provider.rating}
              </span>
              <span className="text-slate-400 text-[11px] shrink-0">({provider.reviewCount})</span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-700 font-semibold text-[11px] shrink-0">{provider.jobsCompleted} jobs</span>
            </div>
          </div>

          {/* Favorite button (cleanly positioned top-right) */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(provider.id);
            }}
            className={`absolute top-0 right-0 p-1.5 sm:p-2 rounded-xl border transition shrink-0 ${
              favorited
                ? "bg-rose-50 border-rose-200 text-rose-600 shadow-2xs"
                : "bg-slate-50/80 border-slate-200 text-slate-400 hover:text-rose-500 hover:bg-white"
            }`}
            aria-label={favorited ? "Remove from saved favorites" : "Save pro to favorites"}
          >
            <Heart className={`w-4 h-4 ${favorited ? "fill-rose-500 text-rose-500" : ""}`} />
          </button>
        </div>

        {/* Location & Response Time Meta */}
        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate text-[11px] sm:text-xs">{provider.location}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-600 font-semibold shrink-0 bg-emerald-50 px-2 py-0.5 rounded-md text-[11px]">
            <Zap className="w-3 h-3 fill-emerald-500" />
            <span>~{provider.responseTime}</span>
          </div>
        </div>

        {/* Tag Chips (Consistent 3 items + badge to prevent vertical disorganization) */}
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {provider.skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] bg-slate-50 border border-slate-200/90 text-slate-600 px-2 py-0.5 rounded-md font-medium truncate max-w-[140px]"
            >
              {skill}
            </span>
          ))}
          {provider.skills.length > 3 && (
            <span className="text-[11px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md font-medium">
              +{provider.skills.length - 3}
            </span>
          )}
        </div>

        {/* Featured customer quote if present (Normalized height) */}
        {provider.featuredReview && (
          <div className="mt-2.5 bg-slate-50/80 rounded-xl p-2.5 border border-slate-100 min-h-[48px] flex items-center">
            <p className="text-xs italic text-slate-500 line-clamp-2 leading-relaxed">
              "{provider.featuredReview}"
            </p>
          </div>
        )}
      </div>

      {/* Bottom Action Row */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
        <div className="flex items-baseline gap-1">
          <span className="text-base sm:text-lg font-black text-slate-900">${provider.hourlyRate}</span>
          <span className="text-xs font-normal text-slate-400">/hr</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Details Profile Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openProDetails(provider);
            }}
            className="px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-slate-50 text-slate-600 hover:text-indigo-600 text-xs font-bold transition flex items-center gap-1"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Details</span>
          </button>

          {/* Book Now solid button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openBookingModalWithPro(provider);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold shadow-2xs transition active:scale-95"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProviderCard;
