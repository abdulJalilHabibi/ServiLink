import React from "react";
import { CalendarCheck, Plus } from "lucide-react";

export const BookingsHeader = ({ onNewBooking }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-[#4F46E5] text-xs font-bold uppercase tracking-wider mb-2">
          <CalendarCheck className="w-3.5 h-3.5" />
          Appointment Tracker
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          My Service Bookings
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Real-time dispatch tracking, assigned technicians, and appointment management across Kabul.
        </p>
      </div>

      <button
        onClick={onNewBooking}
        className="inline-flex items-center justify-center gap-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white font-bold px-4 py-2.5 rounded-xl shadow-sm transition active:scale-95 text-xs sm:text-sm self-start sm:self-auto cursor-pointer"
      >
        <Plus className="w-4 h-4" />
        <span>New Service Request</span>
      </button>
    </div>
  );
};
