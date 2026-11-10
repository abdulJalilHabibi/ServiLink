import React, { useState } from "react";
import {
  ShieldAlert,
  Briefcase,
  Layers,
  CheckCircle2,
  Clock,
  TrendingUp,
  Search
} from "lucide-react";
import { TOP_PROVIDERS, CATEGORIES } from "../../data/mockData";
import { useBooking } from "../../context/useBooking";
import { StatusBadge } from "../../components/ui/StatusBadge";

export const AdminDashboard = () => {
  const { bookings, updateBookingStatus, showToast } = useBooking();
  const [activeTab, setActiveTab] = useState("overview");

  // Providers verification state
  const [providersList, setProvidersList] = useState(TOP_PROVIDERS);
  const [searchTerm, setSearchTerm] = useState("");

  const handleToggleVerification = (proId) => {
    setProvidersList((prev) =>
      prev.map((p) => {
        if (p.id === proId) {
          const newStatus = !p.verified;
          showToast(
            `${p.name} verification status set to ${newStatus ? "VERIFIED" : "PENDING"}`,
            "info"
          );
          return { ...p, verified: newStatus };
        }
        return p;
      })
    );
  };

  const filteredPros = providersList.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-1 uppercase tracking-wider">
              <ShieldAlert className="w-3.5 h-3.5 text-indigo-600" />
              Central Control Operations
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Platform Admin Console
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              Supervise Kabul dispatch queues, verify technician licenses, and inspect service quality.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Kabul Dispatch Systems Online
            </span>
          </div>
        </div>

        {/* Global KPIs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Marketplace Volume
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              $48,250
            </div>
            <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3 h-3" /> +19.4% MoM
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Specialists
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">
              1,240
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              Across all 22 districts
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Dispatches
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              45,820
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              4.95 ★ platform rating
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Pending Vetting
            </span>
            <div className="text-2xl sm:text-3xl font-black text-amber-600">
              14
            </div>
            <span className="text-[11px] text-slate-500 font-semibold mt-1 block">
              Requires license audit
            </span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Live Queue", icon: Clock },
            { id: "providers", label: `Providers Directory (${providersList.length})`, icon: Briefcase },
            { id: "categories", label: `Categories (${CATEGORIES.length})`, icon: Layers },
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

        {/* Tab 1: Live Queue */}
        {activeTab === "overview" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Global Service Dispatches Ledger
                </h3>
                <p className="text-xs text-slate-500">
                  Inspect and override dispatch tickets in real time.
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-bold">Ticket ID</th>
                    <th className="pb-3 font-bold">Client & Phone</th>
                    <th className="pb-3 font-bold">Assigned Specialist</th>
                    <th className="pb-3 font-bold">Location</th>
                    <th className="pb-3 font-bold">Status</th>
                    <th className="pb-3 font-bold text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {bookings.map((b) => (
                    <tr key={b.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 font-mono font-bold text-indigo-700">
                        {b.id}
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-slate-800">{b.clientName}</div>
                        <div className="text-[11px] text-slate-400">{b.clientPhone}</div>
                      </td>
                      <td className="py-3.5 font-semibold text-slate-700">
                        {b.providerName}
                      </td>
                      <td className="py-3.5 text-slate-600 max-w-xs truncate">
                        {b.address}
                      </td>
                      <td className="py-3.5">
                        <StatusBadge status={b.status} />
                      </td>
                      <td className="py-3.5 text-right space-x-1">
                        {b.status !== "Completed" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "Completed")}
                            className="px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 hover:bg-indigo-100 font-bold text-[11px]"
                          >
                            Force Complete
                          </button>
                        )}
                        {b.status !== "Cancelled" && (
                          <button
                            onClick={() => updateBookingStatus(b.id, "Cancelled")}
                            className="px-2.5 py-1 rounded bg-rose-50 text-rose-700 hover:bg-rose-100 font-bold text-[11px]"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Providers Directory */}
        {activeTab === "providers" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Technician Directory & Vetting Management
                </h3>
                <p className="text-xs text-slate-500">
                  Audit licenses, ID verifications, and toggle technician visibility.
                </p>
              </div>

              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter by name, district..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase tracking-wider">
                    <th className="pb-3 font-bold">Technician</th>
                    <th className="pb-3 font-bold">Trade & Category</th>
                    <th className="pb-3 font-bold">Rating & Jobs</th>
                    <th className="pb-3 font-bold">Rate</th>
                    <th className="pb-3 font-bold">Verification Status</th>
                    <th className="pb-3 font-bold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredPros.map((pro) => (
                    <tr key={pro.id} className="hover:bg-slate-50/50">
                      <td className="py-3.5 flex items-center gap-3">
                        <img
                          src={pro.avatar}
                          alt={pro.name}
                          className="w-9 h-9 rounded-xl object-cover"
                        />
                        <div>
                          <div className="font-bold text-slate-800">{pro.name}</div>
                          <div className="text-[11px] text-slate-400">{pro.location}</div>
                        </div>
                      </td>
                      <td className="py-3.5">
                        <span className="font-semibold text-slate-700 capitalize">
                          {pro.category}
                        </span>
                        <div className="text-[11px] text-slate-400">{pro.tradeHeadline}</div>
                      </td>
                      <td className="py-3.5">
                        <div className="font-bold text-amber-500">{pro.rating} ★</div>
                        <div className="text-[11px] text-slate-400">{pro.jobsCompleted} completed</div>
                      </td>
                      <td className="py-3.5 font-bold text-slate-900">
                        ${pro.hourlyRate}/hr
                      </td>
                      <td className="py-3.5">
                        {pro.verified ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold text-[11px]">
                            <Clock className="w-3.5 h-3.5" /> Pending Audit
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 text-right">
                        <button
                          onClick={() => handleToggleVerification(pro.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                            pro.verified
                              ? "bg-rose-50 text-rose-700 hover:bg-rose-100"
                              : "bg-emerald-600 text-white hover:bg-emerald-700"
                          }`}
                        >
                          {pro.verified ? "Revoke Vetting" : "Approve License"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Categories & Rates */}
        {activeTab === "categories" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
            <h3 className="text-base font-black text-slate-900 mb-4">
              Marketplace Trade Sectors & Minimum Baseline Rates
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{cat.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{cat.prosCount} active pros</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400 uppercase font-semibold block">Floor Rate</span>
                    <span className="text-sm font-black text-indigo-700">${cat.startingPrice}/hr</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
