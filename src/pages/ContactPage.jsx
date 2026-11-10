import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  PhoneCall,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  User,
  Phone,
  HelpCircle,
  MessageSquare,
  ShieldCheck,
  Tag
} from "lucide-react";
import { useBooking } from "../context/useBooking";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  phone: z.string().regex(/^07\d{8}$/, { message: "Enter valid 10-digit phone (e.g. 0799123456)" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  subject: z.string().min(3, { message: "Please specify a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

export const ContactPage = () => {
  const { showToast } = useBooking();
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(0); // open first FAQ by default for immediate preview

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = () => {
    setSubmitted(true);
    showToast("Message sent successfully! Our dispatch team will call you shortly.", "success");
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

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
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
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

        {/* Contact Info Cards */}
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
              <p className="text-[11px] sm:text-xs text-emerald-600 font-semibold mt-0.5 truncate">Average pickup &lt; 30 sec</p>
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
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">Response within 2 hours</p>
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
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium mt-0.5 truncate">District 10, Kabul, AF</p>
            </div>
          </div>
        </div>

        {/* Main Grid: Form + FAQs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start mb-16">
          {/* ========================================================
              LEFT COLUMN: CONTACT FORM
              ======================================================== */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-xs">
            <div className="flex items-center justify-between gap-3 mb-1">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Send Our Team a Message
              </h2>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100/80">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Direct Support
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-500 mb-6">
              Fill out the form below and a customer service representative will respond promptly.
            </p>

            {submitted && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2.5 text-xs sm:text-sm font-bold animate-in fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Thank you! Your inquiry has been dispatched to our support supervisor.</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Your Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="contact-name"
                      type="text"
                      {...register("name")}
                      placeholder="e.g. Ahmad Shah"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="contact-phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    <input
                      id="contact-phone"
                      type="tel"
                      {...register("phone")}
                      placeholder="0799123456"
                      className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.phone.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="contact-email" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="contact-email"
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Subject <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Tag className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="contact-subject"
                    type="text"
                    {...register("subject")}
                    placeholder="e.g. Inquiring about solar inverter maintenance"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  />
                </div>
                {errors.subject && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.subject.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Message Description <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <textarea
                    id="contact-message"
                    rows="4"
                    {...register("message")}
                    placeholder="Describe your inquiry, address, or service requirements in detail..."
                    className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  />
                </div>
                {errors.message && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-500/25 transition active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                <span>Send Support Request</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>

          {/* ========================================================
              RIGHT COLUMN: FAQ & QUICK SUPPORT PANEL
              ======================================================== */}
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
                        className="w-full p-3.5 sm:p-4 flex items-center justify-between text-left gap-3 text-xs sm:text-sm font-bold text-slate-800 transition"
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

            {/* Quick Dispatch / Direct Assistance Card (balances height with left form) */}
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
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
