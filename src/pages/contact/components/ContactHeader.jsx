import React from "react";
import { Mail } from "lucide-react";

export const ContactHeader = () => {
  return (
    <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
        <Mail className="w-3.5 h-3.5" />
        Support & Dispatch
      </div>
      <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
        We’re Here When You Need Us
      </h1>
      <p className="mt-2 text-slate-500 text-xs sm:text-sm">
        Have questions, feedback, or need immediate assistance? Reach our Kabul dispatch control center 24/7.
      </p>
    </div>
  );
};
