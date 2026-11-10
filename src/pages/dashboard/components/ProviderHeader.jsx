import React from "react";
import { ShieldCheck, Plus } from "lucide-react";

export const ProviderHeader = ({
  currentUser,
  isAvailable,
  onToggleAvailability,
  onOpenAddService
}) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <img
            src={
              currentUser?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"
            }
            alt={currentUser?.name}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-100 shadow-sm"
          />
          <span
            className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
              isAvailable ? "bg-emerald-500" : "bg-slate-400"
            }`}
          />
        </div>
        <div>
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md mb-1 uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Verified Master Technician
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {currentUser?.name || "Ahmad Tariq Rahimi"}
          </h1>
          <p className="text-xs sm:text-sm font-semibold text-indigo-600 mt-0.5">
            {currentUser?.tradeHeadline || "Master Electrician & EV Specialist"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Availability status toggle */}
        <button
          onClick={onToggleAvailability}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition shadow-xs cursor-pointer ${
            isAvailable
              ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100"
              : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"
          }`}
        >
          <span
            className={`w-2.5 h-2.5 rounded-full ${
              isAvailable ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
            }`}
          />
          <span>{isAvailable ? "Available for Dispatch" : "Off Duty"}</span>
        </button>

        <button
          onClick={onOpenAddService}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Service</span>
        </button>
      </div>
    </div>
  );
};
