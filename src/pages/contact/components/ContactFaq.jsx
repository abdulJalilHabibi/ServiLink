import React, { useState } from "react";
import { ChevronDown, HelpCircle, PhoneCall } from "lucide-react";

export const ContactFaq = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: "How fast do emergency technicians arrive in Kabul?",
      a: "Our on-call emergency specialists arrive within 15 to 30 minutes in central districts (Wazir Akbar Khan, Shahr-e Naw, Kart-e Parwan, Deh Bori). Outer metro areas typically take 25–40 minutes."
    },
    {
      q: "How does the $2,500 property damage protection work?",
      a: "If an accidental break or damage occurs while a verified ServiLink pro is servicing your property, our platform insurance covers repair or replacement costs up to $2,500 after a claims review."
    },
    {
      q: "Can I pay in cash upon completion?",
      a: "Yes! You can pay cash directly to the technician once you inspect the finished work and sign off on the service checklist. The pro marks the job as completed in the app."
    },
    {
      q: "Are the hourly rates fixed or do they change on arrival?",
      a: "All hourly rates are strictly fixed upfront on the platform. Pros cannot add unapproved surcharges or arbitrary fees."
    }
  ];

  return (
    <div className="lg:col-span-5 flex flex-col gap-5">
      {/* FAQ Card Container */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 shadow-xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Quick answers regarding bookings, vetting, and coverage.
            </p>
          </div>
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4" />
          </div>
        </div>

        <div className="space-y-2.5">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "bg-indigo-50/50 border-indigo-200/90 shadow-2xs"
                    : "bg-slate-50/60 hover:bg-slate-50 border-slate-200/70"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-bold text-slate-800 transition cursor-pointer"
                >
                  <span className={`leading-snug ${isOpen ? "text-indigo-900 font-extrabold" : "text-slate-800"}`}>
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-indigo-600" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-3.5 sm:px-4 pb-3.5 pt-1 text-xs text-slate-600 leading-relaxed border-t border-indigo-100/60 animate-in fade-in duration-150">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Dispatch / Direct Assistance Card */}
      <div className="bg-gradient-to-br from-[#4F46E5] to-[#4F46E5] text-white rounded-3xl p-5 sm:p-6 shadow-sm border border-indigo-700/60 relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-200">
              Live Dispatch Available 24/7
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-white leading-snug">
            Need an urgent repair technician right now?
          </h4>
          <p className="text-xs text-indigo-200 mt-1 mb-4 leading-relaxed">
            Skip the contact form — connect directly with our active central dispatch team in under 30 seconds.
          </p>

          <a
            href="tel:+93791234567"
            className="w-full py-2.5 px-4 rounded-xl bg-white text-indigo-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 hover:bg-indigo-50 transition active:scale-95 shadow-sm"
          >
            <PhoneCall className="w-4 h-4 text-indigo-600" />
            <span>Call +93 79 123 4567</span>
          </a>
        </div>
      </div>
    </div>
  );
};
