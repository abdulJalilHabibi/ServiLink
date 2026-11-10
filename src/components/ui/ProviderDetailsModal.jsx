import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Star,
  ShieldCheck,
  MapPin,
  Zap,
  Award,
  CheckCircle2,
  PhoneCall,
  Calendar
} from "lucide-react";
import { useBooking } from "../../context/useBooking";

export const ProviderDetailsModal = () => {
  const {
    selectedProForDetails,
    closeProDetails,
    openBookingModalWithPro
  } = useBooking();

  if (!selectedProForDetails) return null;

  const pro = selectedProForDetails;
  const firstName = pro.name ? pro.name.split(" ")[0] : "Pro";

  const handleBook = () => {
    const targetPro = pro;
    closeProDetails();
    openBookingModalWithPro(targetPro);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeProDetails}
          className="fixed inset-0 -z-10"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 26, stiffness: 340 }}
          className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        >
          {/* ========================================================
              MODAL TOP HEADER
              ======================================================== */}
          <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-5 sm:p-6 shrink-0">
            {/* Action Bar (Badge + Close) */}
            <div className="flex items-center justify-between gap-3 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                Vetted & Certified Specialist
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={closeProDetails}
                  className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white transition active:scale-95"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Profile Info Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
              <div className="flex items-center gap-3.5 sm:gap-4">
                <div className="relative shrink-0">
                  <img
                    src={pro.avatar}
                    alt={pro.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-3 ring-white/80 shadow-lg"
                  />
                  {pro.verified && (
                    <span
                      className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 shadow-md ring-2 ring-white"
                      title="Verified Identity & License"
                    >
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
                      {pro.name}
                    </h2>
                    {pro.badge && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-indigo-100 border border-white/25 backdrop-blur-xs">
                        {pro.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-semibold text-indigo-100 mt-0.5 truncate">
                    {pro.tradeHeadline}
                  </p>

                  <div className="flex items-center gap-2 mt-1.5 text-xs text-indigo-100/90 flex-wrap">
                    <span className="inline-flex items-center text-amber-300 font-bold bg-white/15 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      <Star className="w-3.5 h-3.5 fill-amber-300 mr-1" />
                      {pro.rating}
                    </span>
                    <span>•</span>
                    <span>{pro.reviewCount} reviews</span>
                    <span>•</span>
                    <span className="text-white font-semibold">{pro.jobsCompleted} completed</span>
                  </div>
                </div>
              </div>

              {/* Hourly Rate & Dispatch speed badge */}
              <div className="sm:text-right shrink-0 bg-white/10 sm:bg-transparent p-3 sm:p-0 rounded-2xl sm:rounded-none border border-white/15 sm:border-0 flex sm:flex-col items-center sm:items-end justify-between">
                <div>
                  <div className="text-2xl sm:text-3xl font-black text-white leading-none">
                    ${pro.hourlyRate}
                    <span className="text-xs sm:text-sm font-normal text-indigo-200">/hr</span>
                  </div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 mt-1">
                    <Zap className="w-3 h-3 fill-emerald-300" />
                    <span>~{pro.responseTime} dispatch</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              SCROLLABLE BODY CONTENT
              ======================================================== */}
          <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
            {/* Meta Highlights Row (Location, Experience, Guarantee) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Location
                  </span>
                  <div className="text-xs font-bold text-slate-800 truncate" title={pro.location}>
                    {pro.location}
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Experience
                  </span>
                  <div className="text-xs font-bold text-slate-800 truncate">
                    {pro.experienceYears || 8}+ Years Licensed
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Protection
                  </span>
                  <div className="text-xs font-bold text-emerald-700 truncate">
                    $2,500 Guarantee
                  </div>
                </div>
              </div>
            </div>

            {/* Core Competencies / Skills */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Specialized Core Competencies
                </h4>
                <span className="text-[11px] text-slate-400 font-medium">
                  {pro.skills ? pro.skills.length : 0} Verified Skills
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {pro.skills &&
                  pro.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-50 hover:bg-indigo-50 border border-slate-200/80 hover:border-indigo-200 text-slate-700 hover:text-indigo-700 px-3 py-1.5 rounded-xl font-semibold transition"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-indigo-500" />
                      {skill}
                    </span>
                  ))}
              </div>
            </div>

            {/* Customer Reviews Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Recent Customer Reviews
                </h4>
                <div className="flex items-center gap-1 text-xs text-amber-500 font-bold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{pro.rating}</span>
                  <span className="text-slate-400 font-normal">({pro.reviewCount})</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 text-indigo-700 font-bold text-[11px] flex items-center justify-center">
                        HQ
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          Haji Mohammad Qasim
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Booking
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 5.0
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic pl-9">
                    "{pro.featuredReview || "Outstanding craftsmanship! Arrived within 20 minutes and resolved the issue safely."}"
                  </p>
                  <span className="text-[10px] text-slate-400 mt-2 block pl-9">Completed 3 days ago</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-purple-100 text-purple-700 font-bold text-[11px] flex items-center justify-center">
                        NK
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          Dr. Nilofar Karimi
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" />
                          Verified Booking
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500 text-xs font-bold">
                      <Star className="w-3 h-3 fill-amber-400 mr-0.5" /> 5.0
                    </div>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed italic pl-9">
                    "Very polite, wore shoe covers, explained the diagnostic clearly, and provided an itemized breakdown. Will hire again!"
                  </p>
                  <span className="text-[10px] text-slate-400 mt-2 block pl-9">Completed 1 week ago</span>
                </div>
              </div>
            </div>
          </div>

          {/* ========================================================
              MODAL FOOTER (Clean & organized CTA actions)
              ======================================================== */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-3">
            <a
              href="tel:+93791234567"
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-emerald-600" />
              <span>Call Dispatch</span>
            </a>

            <div className="flex items-center gap-2.5 w-full sm:w-auto">
              <button
                type="button"
                onClick={closeProDetails}
                className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition"
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleBook}
                className="flex-1 sm:flex-initial bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md shadow-indigo-500/25 transition active:scale-95 flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book {firstName} Now</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProviderDetailsModal;
