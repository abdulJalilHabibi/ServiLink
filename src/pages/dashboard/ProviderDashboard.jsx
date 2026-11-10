import React, { useState } from "react";
import {
  Briefcase,
  Star,
  CheckCircle2,
  Clock,
  Plus,
  Trash2,
  ShieldCheck,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../context/useBooking";
import { StatusBadge } from "../../components/ui/StatusBadge";
import { CATEGORIES } from "../../data/mockData";

export const ProviderDashboard = () => {
  const { currentUser } = useAuth();
  const {
    bookings,
    updateBookingStatus,
    providerServices,
    addProviderService,
    deleteProviderService,
    showToast
  } = useBooking();

  const [activeTab, setActiveTab] = useState("overview");
  const [isAvailable, setIsAvailable] = useState(true);

  // Add service modal state
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("electrical");
  const [newRate, setNewRate] = useState("45");
  const [newHours, setNewHours] = useState("1-2 hours");
  const [newDesc, setNewDesc] = useState("");

  const handleToggleAvailability = () => {
    setIsAvailable(!isAvailable);
    showToast(
      !isAvailable
        ? "You are now online and visible for emergency dispatches!"
        : "You are now set to Off Duty.",
      "info"
    );
  };

  const handleCreateService = (e) => {
    e.preventDefault();
    if (!newTitle) return;
    addProviderService({
      title: newTitle,
      category: newCategory,
      rate: Number(newRate),
      estimatedHours: newHours,
      description: newDesc
    });
    setNewTitle("");
    setNewDesc("");
    setShowAddServiceModal(false);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Profile & Availability Toggle */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
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
              onClick={handleToggleAvailability}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-xs sm:text-sm font-bold transition shadow-xs ${
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
              onClick={() => setShowAddServiceModal(true)}
              className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs sm:text-sm shadow-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Add Service</span>
            </button>
          </div>
        </div>

        {/* Top KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Monthly Earnings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              $3,420
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +14% vs last month
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Jobs Completed
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">
              {currentUser?.jobsCompleted || 430}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              99.2% success score
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Average Rating
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-500 flex items-center gap-1">
              <span>{currentUser?.rating || 4.98}</span>
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              Based on 284 reviews
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Offerings
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {providerServices.length}
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              Live in Kabul directory
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: Briefcase },
            { id: "requests", label: `Incoming Requests (${bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length})`, icon: Clock },
            { id: "services", label: `My Services (${providerServices.length})`, icon: Briefcase },
            { id: "earnings", label: "Earnings & Payouts", icon: DollarSign },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Overview */}
        {activeTab === "overview" && (
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
                            onClick={() => updateBookingStatus(booking.id, "Confirmed")}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                          >
                            Accept Job
                          </button>
                          <button
                            onClick={() => updateBookingStatus(booking.id, "Cancelled")}
                            className="px-3 py-1.5 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-bold transition"
                          >
                            Decline
                          </button>
                        </>
                      )}

                      {booking.status === "Confirmed" && (
                        <button
                          onClick={() => updateBookingStatus(booking.id, "Completed")}
                          className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
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
        )}

        {/* Tab 2: Requests */}
        {activeTab === "requests" && (
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
                    <div>Client: <strong className="text-slate-800">{b.clientName}</strong> ({b.clientPhone})</div>
                    <div>Location: {b.address}</div>
                    <div>Window: {b.preferredDate} - {b.timeSlot}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {b.status === "Pending" && (
                    <button
                      onClick={() => updateBookingStatus(b.id, "Confirmed")}
                      className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition"
                    >
                      Accept Job
                    </button>
                  )}
                  {b.status === "Confirmed" && (
                    <button
                      onClick={() => updateBookingStatus(b.id, "Completed")}
                      className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition"
                    >
                      Mark Finished
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Services Management */}
        {activeTab === "services" && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Published Services
                </h3>
                <p className="text-xs text-slate-500">
                  These offerings appear on your public technician profile and search results.
                </p>
              </div>
              <button
                onClick={() => setShowAddServiceModal(true)}
                className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
              >
                <Plus className="w-4 h-4" />
                <span>Add Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {providerServices.map((srv) => (
                <div
                  key={srv.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded">
                        {srv.category}
                      </span>
                      <span className="text-base font-black text-slate-900">
                        ${srv.rate}/hr
                      </span>
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm mb-1">
                      {srv.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {srv.description}
                    </p>
                    <span className="text-[11px] text-slate-400 font-semibold block mt-2">
                      Est: {srv.estimatedHours}
                    </span>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => deleteProviderService(srv.id)}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Offering</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Earnings & Payouts */}
        {activeTab === "earnings" && (
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
                onClick={() => showToast("Payout requested! Processing within 24 hours.", "success")}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition"
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
        )}

        {/* Add Service Modal */}
        {showAddServiceModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200">
              <h3 className="text-lg font-black text-slate-900 mb-1">
                Add New Service Offering
              </h3>
              <p className="text-xs text-slate-500 mb-4">
                Define the service title, category, and standard hourly billing rate.
              </p>

              <form onSubmit={handleCreateService} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Service Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. EV Home Charger Wallbox Installation"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      required
                      value={newRate}
                      onChange={(e) => setNewRate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Estimated Duration
                  </label>
                  <input
                    type="text"
                    value={newHours}
                    onChange={(e) => setNewHours(e.target.value)}
                    placeholder="e.g. 2-3 hours"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Scope Description
                  </label>
                  <textarea
                    rows="3"
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe equipment used, testing protocols, and warranty..."
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                  />
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowAddServiceModal(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                  >
                    Publish Offering
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProviderDashboard;
