import React from "react";
import { StatusBadge } from "../../../components/ui/StatusBadge";

export const ProviderRequestsTab = ({ bookings, onUpdateStatus }) => {
  return (
    <div className="space-y-4">
      {bookings.map((b) => (
        <div
          key={b.id}
          className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                {b.id}
              </span>
              <StatusBadge status={b.status} />
            </div>
            <h4 className="font-bold text-slate-900 text-sm sm:text-base">
              {b.serviceName}
            </h4>
            <div className="text-xs text-slate-500 mt-1 space-y-0.5">
              <div>
                Client: <strong className="text-slate-800">{b.clientName}</strong> ({b.clientPhone})
              </div>
              <div>Location: {b.address}</div>
              <div>
                Window: {b.preferredDate} - {b.timeSlot}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {b.status === "Pending" && (
              <button
                onClick={() => onUpdateStatus(b.id, "Confirmed")}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition cursor-pointer"
              >
                Accept Job
              </button>
            )}
            {b.status === "Confirmed" && (
              <button
                onClick={() => onUpdateStatus(b.id, "Completed")}
                className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition cursor-pointer"
              >
                Mark Finished
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
