import React from "react";
import { motion } from "motion/react";
import { HOW_IT_WORKS_STEPS } from "../../data/mockData";
import { ClipboardList, UserCheck, ShieldCheck } from "lucide-react";

const STEP_ICONS = {
  FileSearch: ClipboardList,
  IdCard: UserCheck,
  ShieldCheck: ShieldCheck
};

export const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-14 sm:py-20 bg-[#FAFAFC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-2">
            Simple 3-Step Process
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F172A] tracking-tight">
            How ServiLink Works
          </h2>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-[#64748B] leading-relaxed">
            Booking professional, licensed local home services has never been this seamless and transparent.
          </p>
        </div>

        {/* 3 Step Cards with balanced height & clean alignment */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-7 items-stretch">
          {HOW_IT_WORKS_STEPS.map((item, index) => {
            const Icon = STEP_ICONS[item.icon] || ClipboardList;

            return (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all flex flex-col justify-between"
              >
                <div>
                  {/* Clean Top Header: Left Icon Container + Right Step Badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#EEF2FF] text-[#4F46E5] flex items-center justify-center shadow-xs shrink-0">
                      <Icon className="w-6 h-6 stroke-[2]" />
                    </div>

                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-indigo-600 text-white shadow-xs tracking-wider">
                      {item.step}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-black text-slate-900 text-base sm:text-lg tracking-tight leading-snug">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2.5 text-xs sm:text-sm text-[#64748B] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
