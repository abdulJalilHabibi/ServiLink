import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Calendar,
  Clock,
  MapPin,
  Trash2,
  AlertTriangle,
  Copy,
  CheckCircle
} from "lucide-react";
import { StatusBadge } from "../../../components/ui/StatusBadge";

export const BookingCard = ({
  booking,
  onUpdateStatus,
  onCancel,
  onDelete
}) => {
  const [cancelling, setCancelling] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleCopyId(booking.id)}
            className="font-mono text-xs sm:text-sm font-black px-2.5 py-1 rounded-lg bg-indigo-50 text-[#4F46E5] border border-indigo-100 hover:bg-indigo-100 transition flex items-center gap-1.5 cursor-pointer"
            title="Click to copy tracking ID"
          >
            <span>{booking.id}</span>
            {copied ? (
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            ) : (
              <Copy className="w-3.5 h-3.5 text-indigo-400" />
            )}
          </button>
          <StatusBadge status={booking.status} />
        </div>

        <div className="text-xs text-slate-400">
          Booked on {new Date(booking.createdAt).toLocaleDateString()}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Assigned Specialist
          </span>
          <div className="text-slate-900 font-bold text-sm">
            {booking.providerName}
          </div>
          {booking.tradeHeadline && (
            <p className="text-xs text-slate-500 mt-0.5">{booking.tradeHeadline}</p>
          )}
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Schedule & Window
          </span>
          <div className="flex items-center gap-2 text-slate-800 text-xs sm:text-sm font-semibold">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>{booking.preferredDate}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500 text-xs mt-0.5">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{booking.timeSlot}</span>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Location & Rate
          </span>
          <div className="flex items-center gap-2 text-slate-800 text-xs font-semibold">
            <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
            <span className="truncate">{booking.address}</span>
          </div>
          <div className="mt-1 text-xs font-bold text-indigo-700">
            Rate: ${booking.rate}/hr
          </div>
        </div>
      </div>

      {booking.notes && (
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-xs text-slate-600 mb-4">
          <span className="font-bold text-slate-700">Scope Notes: </span>
          {booking.notes}
        </div>
      )}

      {/* Card Action Buttons */}
      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="text-slate-500">
          Client: <strong className="text-slate-800">{booking.clientName}</strong> ({booking.clientPhone})
        </div>

        <div className="flex items-center gap-2">
          {booking.status === "Pending" && (
            <button
              onClick={() => onUpdateStatus(booking.id, "Confirmed")}
              className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold transition cursor-pointer"
            >
              Simulate Confirmation
            </button>
          )}

          {booking.status === "Confirmed" && (
            <button
              onClick={() => onUpdateStatus(booking.id, "Completed")}
              className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold transition cursor-pointer"
            >
              Mark Completed
            </button>
          )}

          {booking.status !== "Cancelled" && booking.status !== "Completed" && (
            <button
              onClick={() => setCancelling(true)}
              className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 font-bold transition flex items-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Cancel Booking</span>
            </button>
          )}

          {booking.status === "Completed" && (
            <div className="flex items-center gap-2.5">
              <span className="text-emerald-600 font-bold flex items-center gap-1">
                <CheckCircle className="w-4 h-4" />
                <span>Work Completed & Escrow Released</span>
              </span>
              <button
                onClick={() => setDeleting(true)}
                className="px-2 py-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-slate-200 hover:border-rose-200 font-semibold transition flex items-center gap-1 text-xs active:scale-95 cursor-pointer"
                title="Delete record"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            </div>
          )}

          {booking.status === "Cancelled" && (
            <div className="flex items-center gap-2.5">
              <span className="text-slate-400 font-semibold italic">
                Booking was cancelled
              </span>
              <button
                onClick={() => setDeleting(true)}
                className="px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 border border-rose-200 hover:border-rose-300 font-bold transition flex items-center gap-1 active:scale-95 text-xs shadow-2xs cursor-pointer"
                title="Delete booking permanently"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Cancel Confirmation Dialog */}
      {cancelling && (
        <div className="mt-4 p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-amber-800 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Are you sure you want to cancel this service request?</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCancelling(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
            >
              Keep Booking
            </button>
            <button
              onClick={() => {
                onCancel(booking.id);
                setCancelling(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition cursor-pointer"
            >
              Confirm Cancellation
            </button>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleting && (
        <div className="mt-4 p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in fade-in duration-150">
          <div className="flex items-center gap-2 text-rose-800 text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Permanently delete booking <strong>{booking.id}</strong> from your records?</span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setDeleting(false)}
              className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-600 hover:bg-white transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete(booking.id);
                setDeleting(false);
              }}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition active:scale-95 flex items-center gap-1 shadow-xs cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Permanently</span>
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};
