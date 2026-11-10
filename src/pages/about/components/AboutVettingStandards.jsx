import React from "react";

export const AboutVettingStandards = () => {
  return (
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
  );
};
