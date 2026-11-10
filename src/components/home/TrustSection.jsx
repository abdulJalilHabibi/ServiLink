import React from "react";
import { ShieldCheck, Lock, Clock, Award, CheckCircle2 } from "lucide-react";

export const TrustSection = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: "$2,500 Property Protection Guarantee",
      desc: "Every job booked through ServiLink is backed by our comprehensive damage liability policy so you have total peace of mind.",
    },
    {
      icon: Lock,
      title: "Secure Escrow Payment Flow",
      desc: "Funds are only transferred to the specialist once the repair is completed to your full satisfaction and checklist inspection.",
    },
    {
      icon: Award,
      title: "100% Criminal & Skill Vetting",
      desc: "We verify Afghan national IDs, trade licenses, work references, and perform background checks before approving any technician.",
    },
    {
      icon: Clock,
      title: "Punctual Arrival Or Service Credit",
      desc: "Technicians maintain GPS dispatch tracking. If an emergency pro arrives late without notice, receive immediate account credit.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F8FAFC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            The ServiLink Trust Guarantee
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Setting the Standard for Safe Local Services
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-slate-600">
            We eliminate the anxiety of letting strangers into your home with strict standards.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 stroke-[1.8]" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base mb-2 leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-1 text-[11px] font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Guaranteed Policy</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
