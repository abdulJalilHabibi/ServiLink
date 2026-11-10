import React from "react";

export const ProviderEarningsTab = ({ onRequestPayout }) => {
  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-black text-slate-900">
            Payouts & Financial History
          </h3>
          <p className="text-xs text-slate-500">
            Direct bank or cash escrow settlement statements.
          </p>
        </div>
        <button
          onClick={onRequestPayout}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
        >
          Request Payout ($1,280)
        </button>
      </div>

      <div className="divide-y divide-slate-100 text-xs">
        <div className="py-3 flex items-center justify-between font-bold text-slate-400 uppercase tracking-wider">
          <span>Date & Reference</span>
          <span>Job Description</span>
          <span>Amount ($)</span>
          <span>Status</span>
        </div>
        <div className="py-3.5 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-800">Nov 08, 2026</div>
            <div className="text-[11px] text-slate-400">TX-829104</div>
          </div>
          <div className="text-slate-600">Short Circuit Diagnostics & Repair</div>
          <div className="font-bold text-emerald-600">+$120.00</div>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
            Cleared
          </span>
        </div>
        <div className="py-3.5 flex items-center justify-between">
          <div>
            <div className="font-bold text-slate-800">Nov 05, 2026</div>
            <div className="text-[11px] text-slate-400">TX-719284</div>
          </div>
          <div className="text-slate-600">Main Panel RCCB Replacement</div>
          <div className="font-bold text-emerald-600">+$240.00</div>
          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
            Cleared
          </span>
        </div>
      </div>
    </div>
  );
};
