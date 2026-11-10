import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Copy, CheckCircle, ArrowRight } from "lucide-react";
import { useBooking } from "../../context/useBooking";
import { useNavigate } from "react-router-dom";

export const ConfirmationModal = () => {
  const { isConfirmationModalOpen, closeConfirmationModal, lastCreatedBooking } = useBooking();
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Handle ESC key to dismiss
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isConfirmationModalOpen) {
        closeConfirmationModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isConfirmationModalOpen, closeConfirmationModal]);

  if (!isConfirmationModalOpen || !lastCreatedBooking) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(lastCreatedBooking.id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGoToBookings = () => {
    closeConfirmationModal();
    navigate("/bookings");
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeConfirmationModal}
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 350 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden z-10 p-6 sm:p-8 text-center my-auto"
          role="dialog"
          aria-modal="true"
        >
          {/* Animated Success Checkmark */}
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 ring-8 ring-emerald-50">
            <Check className="w-8 h-8 stroke-[3]" />
          </div>

          <h3 className="text-2xl font-black text-slate-900 tracking-tight">
            Booking Confirmed!
          </h3>
          <p className="text-slate-500 text-xs sm:text-sm mt-1 mb-5">
            Your service request has been queued and dispatched to verified technicians.
          </p>

          {/* Reference ID Badge */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-5 text-left">
            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Tracking Reference Code
            </div>
            <div className="flex items-center justify-between">
              <span className="font-mono text-xl font-black text-indigo-600">
                {lastCreatedBooking.id}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 transition active:scale-95"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Booking Summary Card */}
          <div className="space-y-2.5 text-left text-xs bg-indigo-50/60 rounded-2xl p-4 mb-6 border border-indigo-100/70">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-bold text-slate-800">{lastCreatedBooking.serviceName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Assigned Pro:</span>
              <span className="font-bold text-indigo-700">{lastCreatedBooking.providerName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Date & Window:</span>
              <span className="font-semibold text-slate-800">{lastCreatedBooking.preferredDate} ({lastCreatedBooking.timeSlot})</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Est. Rate:</span>
              <span className="font-black text-slate-900">${lastCreatedBooking.rate}/hr</span>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col gap-2.5">
            <button
              type="button"
              onClick={handleGoToBookings}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <span>View in My Bookings</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={closeConfirmationModal}
              className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 text-xs font-semibold transition"
            >
              Dismiss
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ConfirmationModal;
