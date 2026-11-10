import React from "react";
import { Link } from "react-router-dom";
import { CalendarCheck } from "lucide-react";

export const BookingsEmptyState = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto">
      <div className="w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-4">
        <CalendarCheck className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-1">
        No service appointments found
      </h3>
      <p className="text-xs sm:text-sm text-slate-500 mb-6">
        You don't have any bookings in this filter tab. Ready to schedule a vetted specialist?
      </p>
      <Link
        to="/services"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition"
      >
        <span>Explore Verified Pros</span>
      </Link>
    </div>
  );
};
