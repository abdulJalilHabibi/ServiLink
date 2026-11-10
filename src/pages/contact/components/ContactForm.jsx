import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Send,
  CheckCircle2,
  User,
  Phone,
  Mail,
  Tag,
  MessageSquare,
  ShieldCheck
} from "lucide-react";
import { useBooking } from "../../../context/useBooking";

const contactSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters long" }),
  phone: z.string().regex(/^07\d{8}$/, { message: "Enter valid 10-digit phone (e.g. 0799123456)" }),
  email: z.string().email({ message: "Enter a valid email address" }),
  subject: z.string().min(3, { message: "Please specify a subject" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters long" })
});

export const ContactForm = () => {
  const { showToast } = useBooking();
  const [submitted, setSubmitted] = useState(false);

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

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-5 sm:p-7 lg:p-8 shadow-xs">
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
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl shadow-md shadow-indigo-500/25 transition active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 cursor-pointer"
        >
          <span>Send Support Request</span>
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
