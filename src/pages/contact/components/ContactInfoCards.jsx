import React from "react";
import { PhoneCall, Mail, MapPin } from "lucide-react";

export const ContactInfoCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 lg:gap-5 mb-10 sm:mb-12">
      <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs flex items-center sm:items-start gap-3 lg:gap-4">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
          <PhoneCall className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.8]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 truncate">
            24/7 Emergency Dispatch
          </span>
          <a
            href="tel:+93791234567"
            className="text-sm sm:text-[15px] lg:text-base font-black text-slate-900 hover:text-indigo-600 transition whitespace-nowrap block"
          >
            +93 79 123 4567
          </a>
          <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-0.5 truncate">
            Average pickup &lt; 30 sec
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs flex items-center sm:items-start gap-3 lg:gap-4">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
          <Mail className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.8]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 truncate">
            Email Inquiries
          </span>
          <a
            href="mailto:support@servilink.af"
            className="text-sm sm:text-[15px] lg:text-base font-black text-slate-900 hover:text-indigo-600 transition whitespace-nowrap block truncate"
          >
            support@servilink.af
          </a>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
            Response within 2 hours
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl lg:rounded-3xl p-4 sm:p-5 lg:p-6 border border-slate-200/90 shadow-xs flex items-center sm:items-start gap-3 lg:gap-4">
        <div className="w-10 h-10 sm:w-11 sm:h-11 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <MapPin className="w-5 h-5 lg:w-6 lg:h-6 stroke-[1.8]" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5 truncate">
            Central Operations Hub
          </span>
          <div className="text-sm sm:text-[15px] lg:text-base font-bold text-slate-900 truncate">
            Charahi Ansari, Shahr-e Naw
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">
            District 10, Kabul, AF
          </p>
        </div>
      </div>
    </div>
  );
};
