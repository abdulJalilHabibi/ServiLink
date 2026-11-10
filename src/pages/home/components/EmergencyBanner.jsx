import React, { useState } from "react";
import { PhoneCall, MapPin, ShieldAlert, Clock } from "lucide-react";
import { CITIES } from "../../../data/mockData";

export const EmergencyBanner = () => {
  const [showCoverageModal, setShowCoverageModal] = useState(false);

  return (
    <section className="py-12 sm:py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative rounded-3xl bg-[#4F46E5] text-white p-6 sm:p-10 md:p-12 overflow-hidden shadow-2xl shadow-indigo-500/25 border border-indigo-500/40">
        {/* Ambient Subtle Glow */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-900/30 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          {/* Left Text */}
          <div className="max-w-2xl">
            {/* Rapid Dispatch Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 border border-white/30 text-white text-xs font-black uppercase tracking-wider mb-4 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
              <span>24/7 Rapid Emergency Dispatch</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Facing an Urgent Plumbing, Power, or Security Emergency?
            </h2>

            <p className="mt-3 text-indigo-100 text-xs sm:text-sm md:text-base leading-relaxed font-normal">
              Don't wait until morning. Our on-call certified emergency technicians dispatch within 15–30 minutes across Kabul metro and surrounding districts.
            </p>

            {/* Quick guarantees */}
            <div className="mt-5 flex flex-wrap gap-4 text-xs text-indigo-100 font-medium">
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <Clock className="w-4 h-4 text-emerald-300" />
                <span>Average Arrival: <strong className="text-white">18 Mins</strong></span>
              </div>
              <div className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                <ShieldAlert className="w-4 h-4 text-rose-300" />
                <span>Zero Late-Night Surcharge Surprises</span>
              </div>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
            {/* Call Dispatch Button */}
            <a
              href="tel:+93791234567"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-[#4F46E5] font-black text-sm sm:text-base shadow-lg shadow-indigo-950/20 transition duration-150 active:scale-95 cursor-pointer"
            >
              <PhoneCall className="w-5 h-5 text-[#4F46E5] fill-[#4F46E5]/15 animate-bounce" />
              <span>Call Dispatch: +93 79 123 4567</span>
            </a>

            {/* Coverage Map Button */}
            <button
              onClick={() => setShowCoverageModal(!showCoverageModal)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-indigo-700/60 hover:bg-indigo-700 text-white border border-white/25 font-bold text-sm sm:text-base transition active:scale-95 cursor-pointer"
            >
              <MapPin className="w-4 h-4 text-indigo-200" />
              <span>{showCoverageModal ? "Hide Coverage Map" : "View Emergency Coverage Map"}</span>
            </button>
          </div>
        </div>

        {/* Coverage Modal / Accordion */}
        {showCoverageModal && (
          <div className="mt-8 pt-6 border-t border-white/20 animate-fadeIn">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-sm uppercase tracking-wider text-white">
                Active Kabul Emergency Response Districts
              </h4>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {CITIES.map((city, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 rounded-xl p-2.5 border border-white/15 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="font-medium text-white">{city}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default EmergencyBanner;
