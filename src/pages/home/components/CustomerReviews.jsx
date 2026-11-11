import React from "react";
import { motion } from "motion/react";
import { Star, CheckCircle2 } from "lucide-react";

export const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Dr. Nilofar Karimi",
      role: "Homeowner",
      location: "District 10, Kabul (Wazir Akbar Khan)",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "2 days ago",
      service: "Main Circuit Breaker Upgrade",
      proName: "Ahmad Tariq Rahimi",
      comment:
        "Arrived in 20 minutes during an electrical blackout. Identified the shorted circuit immediately, replaced the damaged RCCB, and ensured our backup generator was properly grounded. Outstanding professionalism!"
    },
    {
      id: 2,
      name: "Haji Mohammad Qasim",
      role: "Business Owner",
      location: "District 4, Kabul (Kart-e Parwan)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "1 week ago",
      service: "Underground Pipe Leak Relining",
      proName: "Farhad Mohammad",
      comment:
        "Repaired a leaking underground PVC water line without digging up our garden wall. Transparent hourly billing and zero hidden surprises. The best plumbing experience in Kabul."
    },
    {
      id: 3,
      name: "Maryam Sadat",
      role: "Apartment Resident",
      location: "District 3, Kabul (Deh Bori)",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
      rating: 5,
      date: "2 weeks ago",
      service: "Split AC Gas Recharge & Tune-up",
      proName: "Zuhra Alimi",
      comment:
        "Full seasonal tune-up on 3 split units. They run whisper quiet now and cooling output doubled. Zuhra was courteous, arrived precisely on schedule, and gave us tips on energy efficiency."
    }
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-5 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-[#059669] text-xs font-bold uppercase tracking-wider mb-2">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Verified Homeowner Feedback
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
            Loved by 45,000+ Kabul Households
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748B]">
            Real feedback from verified appointments booked directly through ServiLink.
          </p>
        </div>

        {/* Cards Grid: 1 col on mobile & tablet (vertical stack), 3 cols on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 lg:gap-6 max-w-2xl lg:max-w-none mx-auto">
          {reviews.map((rev, idx) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.35, delay: idx * 0.1 }}
              whileHover={{ y: -3 }}
              className="bg-[#FAFAFC] rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* 1. Reviewer Info: Photo, Name, Location & Date */}
                <div className="flex items-start justify-between gap-3 mb-3.5">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={rev.avatar}
                      alt={rev.name}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover ring-2 ring-slate-200 shrink-0 shadow-2xs"
                      loading="lazy"
                    />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                        {rev.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 leading-snug mt-0.5">
                        {rev.location}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400 shrink-0 mt-0.5">
                    {rev.date}
                  </span>
                </div>

                {/* 2. Rating Stars */}
                <div className="flex items-center text-amber-400 gap-0.5 mb-3">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* 3. Review Description / Comment */}
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  "{rev.comment}"
                </p>
              </div>

              {/* 4. Booked Service Badge */}
              <div className="pt-3.5 border-t border-slate-200/70">
                <div className="text-[11px] text-indigo-700 bg-indigo-50/80 border border-indigo-100/60 px-3 py-2 rounded-xl leading-snug">
                  <div className="font-semibold text-slate-900">{rev.service}</div>
                  <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
                    Pro: <span className="font-semibold">{rev.proName}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
