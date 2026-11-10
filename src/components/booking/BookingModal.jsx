import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Calendar,
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight
} from "lucide-react";
import { useBooking } from "../../context/useBooking";
import { CATEGORIES } from "../../data/mockData";

const TODAY_ISO_STRING = "2026-11-10";

const bookingSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Full name must be at least 3 characters long" }),
  phone: z
    .string()
    .regex(/^07\d{8}$/, { message: "Enter a valid 10-digit phone starting with 07 (e.g. 0799123456)" }),
  serviceAddress: z
    .string()
    .min(5, { message: "Service address must be at least 5 characters long" }),
  category: z.string().min(1, { message: "Please select a service category" }),
  preferredDate: z
    .string()
    .min(1, { message: "Please select a preferred service date" }),
  timeSlot: z
    .string()
    .min(1, { message: "Please select a time window" }),
  notes: z.string().optional()
});

export const BookingModal = () => {
  const { isBookingModalOpen, closeBookingModal, selectedProForBooking, addBooking } = useBooking();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      serviceAddress: "",
      category: "electrical",
      preferredDate: TODAY_ISO_STRING,
      timeSlot: "Morning (09:00 AM - 12:00 PM)",
      notes: ""
    }
  });

  useEffect(() => {
    if (selectedProForBooking) {
      setValue("category", selectedProForBooking.category);
    }
  }, [selectedProForBooking, setValue]);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isBookingModalOpen) {
        closeBookingModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isBookingModalOpen, closeBookingModal]);

  const onSubmit = (data) => {
    addBooking({
      ...data,
      serviceName: `${data.category.toUpperCase()} Service Request`,
      clientName: data.fullName,
      clientPhone: data.phone,
      address: data.serviceAddress,
      providerName: selectedProForBooking?.name || "Next Available Verified Specialist",
      tradeHeadline: selectedProForBooking?.tradeHeadline || "General Home Service Specialist",
      category: data.category,
      rate: selectedProForBooking?.hourlyRate || 35
    });
    reset();
  };

  const handleClose = () => {
    reset();
    closeBookingModal();
  };

  if (!isBookingModalOpen) return null;

  const pro = selectedProForBooking;
  const firstName = pro?.name ? pro.name.split(" ")[0] : "Specialist";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/60 backdrop-blur-sm overflow-y-auto">
        {/* Backdrop click dismiss */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 -z-10"
        />

        {/* Modal Dialog Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 12 }}
          transition={{ type: "spring", damping: 26, stiffness: 340 }}
          className="relative w-full max-w-xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="booking-modal-title"
        >
          {/* ========================================================
              UNIFIED HEADER
              ======================================================== */}
          <div className="relative bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 text-white p-5 sm:p-6 shrink-0">
            {/* Top Row: Badge + Close Button */}
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md border border-white/20">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                Direct Dispatch Booking
              </span>

              <button
                type="button"
                onClick={handleClose}
                className="p-2 rounded-xl bg-white/15 hover:bg-white/25 border border-white/20 text-white transition active:scale-95"
                aria-label="Close booking modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Specialist Profile or Generic Header */}
            {pro ? (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={pro.avatar}
                      alt={pro.name}
                      className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl object-cover ring-2 ring-white/80 shadow-md"
                    />
                    {pro.verified && (
                      <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-0.5 shadow ring-2 ring-white">
                        <ShieldCheck className="w-3 h-3" />
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <h2 id="booking-modal-title" className="text-base sm:text-lg font-black text-white tracking-tight">
                        Book {pro.name}
                      </h2>
                      {pro.badge && (
                        <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-white/20 text-indigo-100 border border-white/25">
                          {pro.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-indigo-100 mt-0.5 truncate">
                      {pro.tradeHeadline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center sm:flex-col sm:items-end justify-between sm:justify-center shrink-0 bg-white/15 px-3 py-1.5 rounded-xl border border-white/20">
                  <div className="text-sm sm:text-base font-black text-white leading-none">
                    ${pro.hourlyRate}
                    <span className="text-xs font-normal text-indigo-200">/hr</span>
                  </div>
                  <span className="text-[10px] text-emerald-300 font-bold block sm:mt-0.5">
                    ~{pro.responseTime} arrival
                  </span>
                </div>
              </div>
            ) : (
              <div className="pt-1">
                <h2 id="booking-modal-title" className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  Request a Verified Specialist
                </h2>
                <p className="text-indigo-100 text-xs sm:text-sm mt-1">
                  Fixed transparent rates • Escrow payment protection • No hidden fees
                </p>
              </div>
            )}
          </div>

          {/* ========================================================
              SCROLLABLE FORM BODY
              ======================================================== */}
          <form
            id="booking-form"
            onSubmit={handleSubmit(onSubmit)}
            className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-4"
          >
            {/* Full Name & Phone Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    placeholder="e.g. Ahmad Shah"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  />
                </div>
                {errors.fullName && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.fullName.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="phone"
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

            {/* Service Category */}
            <div>
              <label htmlFor="category" className="block text-xs font-bold text-slate-700 mb-1.5">
                Service Category <span className="text-rose-500">*</span>
              </label>
              <select
                id="category"
                {...register("category")}
                disabled={!!pro}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition disabled:bg-slate-100 disabled:text-slate-500"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name} (from ${cat.startingPrice}/hr)
                  </option>
                ))}
              </select>
            </div>

            {/* Street Address */}
            <div>
              <label htmlFor="serviceAddress" className="block text-xs font-bold text-slate-700 mb-1.5">
                Service Address & Location <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="serviceAddress"
                  type="text"
                  {...register("serviceAddress")}
                  placeholder="e.g. Street 4, House 12, Wazir Akbar Khan, Kabul"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                />
              </div>
              {errors.serviceAddress && (
                <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.serviceAddress.message}</p>
              )}
            </div>

            {/* Preferred Date & Time Window */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label htmlFor="preferredDate" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Preferred Date <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="preferredDate"
                    type="date"
                    min={TODAY_ISO_STRING}
                    {...register("preferredDate")}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  />
                </div>
                {errors.preferredDate && (
                  <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.preferredDate.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="timeSlot" className="block text-xs font-bold text-slate-700 mb-1.5">
                  Time Window <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Clock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <select
                    id="timeSlot"
                    {...register("timeSlot")}
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
                  >
                    <option value="Morning (09:00 AM - 12:00 PM)">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="Afternoon (01:00 PM - 04:00 PM)">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="Evening (05:00 PM - 08:00 PM)">Evening (05:00 PM - 08:00 PM)</option>
                    <option value="Urgent Dispatch (Next 30 Mins)">Urgent Dispatch (Next 30 Mins)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Problem Description Notes */}
            <div>
              <label htmlFor="notes" className="block text-xs font-bold text-slate-700 mb-1.5">
                Issue Description (Optional)
              </label>
              <textarea
                id="notes"
                rows="2"
                {...register("notes")}
                placeholder="Describe any specific issues (e.g. pipe dripping under kitchen sink, breaker trips when heater is turned on)..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white focus:border-indigo-500 transition"
              />
            </div>

            {/* Trust Assurance Strip */}
            <div className="p-3 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center gap-2.5 text-xs text-indigo-900">
              <ShieldCheck className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                <strong>100% Escrow Guarantee:</strong> Payment is held safely and released only after you approve the completed work.
              </span>
            </div>
          </form>

          {/* ========================================================
              STICKY BOTTOM ACTIONS FOOTER (Always visible outside scroll)
              ======================================================== */}
          <div className="p-4 sm:p-5 bg-white border-t border-slate-200/90 shrink-0 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 text-xs sm:text-sm font-semibold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              form="booking-form"
              disabled={isSubmitting}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 sm:px-6 py-2.5 rounded-xl shadow-md shadow-indigo-500/25 transition active:scale-95 text-xs sm:text-sm flex items-center gap-2 disabled:opacity-50"
            >
              <span>Confirm & Dispatch {firstName}</span>
              <CheckCircle2 className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;
