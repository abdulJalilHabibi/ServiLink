import React from "react";
import { CheckCircle2 } from "lucide-react";
import { StatusBadge } from "../../../components/ui/StatusBadge";

export const ProviderOverviewTab = ({ bookings, onUpdateStatus }) => {
  return (
    <div className="space-y-6">
      {/* Live Dispatch Alerts */}
      <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
        <h3 className="text-base font-black text-slate-900 mb-4">
          Active Client Requests
        </h3>
        <div className="divide-y divide-slate-100">
          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                    {booking.id}
                  </span>
                  <StatusBadge status={booking.status} />
                </div>
                <div className="font-bold text-slate-900 text-sm">
                  {booking.serviceName}
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Client: {booking.clientName} ({booking.clientPhone}) • {booking.address}
                </div>
              </div>

              {/* Pro actions on booking */}
              <div className="flex items-center gap-2 shrink-0">
                {booking.status === "Pending" && (
                  <>
                    <button
                      onClick={() => onUpdateStatus(booking.id, "Confirmed")}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
                    >
                      Accept Job
                    </button>
                    <button
                      onClick={() => onUpdateStatus(booking.id, "Cancelled")}
                      className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold transition cursor-pointer"
                    >
                      Decline
                    </button>
                  </>
                )}

                {booking.status === "Confirmed" && (
                  <button
                    onClick={() => onUpdateStatus(booking.id, "Completed")}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
                  >
                    Mark as Completed
                  </button>
                )}

                {booking.status === "Completed" && (
                  <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Paid & Completed
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
