import React from "react";
import { Link } from "react-router-dom";
import {
  CheckCircle2,
  MapPin,
  ArrowRight,
  HeartHandshake
} from "lucide-react";
import { STATS, CITIES } from "../data/mockData";

export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
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

        {/* Stats Row */}
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

        {/* Our 4-Step Vetting Standard */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-8 sm:p-12 mb-16">
          <div className="max-w-2xl mb-10">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Our 4-Stage Specialist Verification Process
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-500 leading-relaxed">
              Fewer than 18% of technicians who apply are admitted to the ServiLink network. Here is how we verify every single specialist.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                STAGE 01
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Government ID & Criminal Background Vetting
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Verification of Afghan National Electronic Tazkira, police clear records, and community references before any interview.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                STAGE 02
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Technical Skill & Tool Assessment
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Practical testing on diagnostic equipment (e.g. multimeters, pipe pressure testers, manifold gauges) by senior master tradesmen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                STAGE 03
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                Customer Ethics & Etiquette Training
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Training in punctuality, cleanliness (wearing boot covers, tidying up work zones), and transparent diagnostic itemization.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70">
              <span className="font-mono text-xs font-black text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md mb-2 inline-block">
                STAGE 04
              </span>
              <h3 className="font-bold text-slate-900 text-base mb-1">
                $2,500 Property Damage Insurance Coverage
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every approved specialist operates under ServiLink's group liability protection, safeguarding client premises against accidental damage.
              </p>
            </div>
          </div>
        </div>

        {/* Coverage Map */}
        <div className="bg-[#4F46E5] text-white rounded-3xl p-8 sm:p-12 mb-16 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-bold uppercase tracking-wider mb-3">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              Service Footprint
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mb-3">
              Rapid Response Across All 22 Kabul Districts
            </h2>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed mb-6">
              Our decentralized technician hubs ensure rapid arrival in Wazir Akbar Khan, Shahr-e Naw, Kart-e Parwan, Deh Bori, Darulaman, and beyond.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              {CITIES.map((c, i) => (
                <div key={i} className="flex items-center gap-1.5 text-indigo-100">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition active:scale-95 text-sm"
          >
            <span>Book a Verified Technician Now</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
