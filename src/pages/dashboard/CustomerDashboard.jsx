import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarCheck,
  Heart,
  Settings,
  Plus,
  Clock,
  MapPin,
  ShieldCheck,
  ArrowRight,
  Trash2,
  Edit3
} from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../context/useBooking";
import { TOP_PROVIDERS, CITIES } from "../../data/mockData";
import { ProviderCard } from "../../components/ui/ProviderCard";
import { StatusBadge } from "../../components/ui/StatusBadge";

export const CustomerDashboard = () => {
  const { currentUser, updateProfile } = useAuth();
  const { bookings, cancelBooking, favorites, openBookingModalWithPro, showToast } = useBooking();

  const [activeTab, setActiveTab] = useState("overview");

  // Profile edit state
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileName, setProfileName] = useState(currentUser?.name || "Ahmad Shah");
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || "0799123456");
  const [profileDistrict, setProfileDistrict] = useState(currentUser?.district || CITIES[1]);
  const [profileAddress, setProfileAddress] = useState(currentUser?.address || "Street 4, Wazir Akbar Khan, Kabul");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({
      name: profileName,
      phone: profilePhone,
      district: profileDistrict,
      address: profileAddress
    });
    setIsEditingProfile(false);
    showToast("Profile details updated successfully!", "success");
  };

  const favoritedPros = TOP_PROVIDERS.filter((pro) => favorites.includes(pro.id));
  const activeBookings = bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed");
  const completedBookings = bookings.filter((b) => b.status === "Completed");

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src={currentUser?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200"}
              alt={currentUser?.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover ring-2 ring-indigo-100 shadow-sm"
            />
            <div>
              <div className="inline-flex items-center gap-1 text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-md mb-1 uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                Customer Account
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {currentUser?.name || "Ahmad Shah"}
              </h1>
              <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{currentUser?.district || "District 10 - Wazir Akbar Khan, Kabul"}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openBookingModalWithPro(null)}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-5 py-2.5 rounded-xl shadow-sm text-xs sm:text-sm transition active:scale-95"
            >
              <Plus className="w-4 h-4" />
              <span>Book a Pro</span>
            </button>
            <Link
              to="/services"
              className="px-4 py-2.5 rounded-xl border border-slate-200 hover:border-slate-300 text-slate-700 text-xs sm:text-sm font-semibold transition bg-white"
            >
              Browse Services
            </Link>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Total Requests
            </span>
            <div className="text-2xl sm:text-3xl font-black text-slate-900">
              {bookings.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Active Dispatches
            </span>
            <div className="text-2xl sm:text-3xl font-black text-indigo-600">
              {activeBookings.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Saved Favorites
            </span>
            <div className="text-2xl sm:text-3xl font-black text-rose-600">
              {favorites.length}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-2xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Completed Jobs
            </span>
            <div className="text-2xl sm:text-3xl font-black text-emerald-600">
              {completedBookings.length}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 overflow-x-auto">
          {[
            { id: "overview", label: "Overview", icon: CalendarCheck },
            { id: "requests", label: `My Requests (${bookings.length})`, icon: Clock },
            { id: "favorites", label: `Favorites (${favorites.length})`, icon: Heart },
            { id: "settings", label: "Profile & Settings", icon: Settings },
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
            {/* Active booking highlight if any */}
            {activeBookings.length > 0 && (
              <div className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white rounded-3xl p-6 sm:p-8 shadow-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/20">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-black px-2.5 py-1 rounded-lg bg-white/20">
                      {activeBookings[0].id}
                    </span>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                      ● Dispatch En Route
                    </span>
                  </div>
                  <span className="text-xs text-indigo-200">
                    Scheduled for {activeBookings[0].preferredDate}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                  <div>
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
                      Specialist
                    </span>
                    <div className="font-bold text-base mt-0.5">
                      {activeBookings[0].providerName}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
                      Service Scope
                    </span>
                    <div className="font-bold text-base mt-0.5">
                      {activeBookings[0].serviceName}
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-indigo-300 font-bold uppercase tracking-wider block">
                      Arrival Window
                    </span>
                    <div className="font-bold text-base mt-0.5">
                      {activeBookings[0].timeSlot}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs">
                  <span className="text-indigo-200">
                    Address: {activeBookings[0].address}
                  </span>
                  <Link
                    to="/bookings"
                    className="font-bold text-white hover:underline flex items-center gap-1"
                  >
                    <span>View Tracking Status</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}

            {/* Recent Bookings List */}
            <div className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-xs">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-900 text-base">
                  Recent Activity
                </h3>
                <button
                  onClick={() => setActiveTab("requests")}
                  className="text-xs font-bold text-indigo-600 hover:underline"
                >
                  View All
                </button>
              </div>

              <div className="divide-y divide-slate-100">
                {bookings.slice(0, 3).map((b) => (
                  <div key={b.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div>
                      <div className="font-bold text-slate-900 text-xs sm:text-sm">
                        {b.serviceName}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {b.providerName} • {b.preferredDate}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={b.status} />
                      <span className="font-bold text-slate-800 text-xs sm:text-sm">
                        ${b.rate}/hr
                      </span>
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
                className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-xs"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700">
                      {b.id}
                    </span>
                    <StatusBadge status={b.status} />
                  </div>
                  <span className="text-xs text-slate-400">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3 text-xs">
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">Pro</span>
                    <strong className="text-slate-800">{b.providerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">Schedule</span>
                    <span className="text-slate-700">{b.preferredDate} ({b.timeSlot})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 uppercase font-bold text-[10px] block">Address</span>
                    <span className="text-slate-700 truncate block">{b.address}</span>
                  </div>
                </div>

                {b.status !== "Cancelled" && b.status !== "Completed" && (
                  <div className="pt-3 border-t border-slate-100 flex justify-end">
                    <button
                      onClick={() => cancelBooking(b.id)}
                      className="text-xs font-bold text-rose-600 hover:text-rose-800 transition flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Cancel Request</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Favorites */}
        {activeTab === "favorites" && (
          <div>
            {favoritedPros.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {favoritedPros.map((pro) => (
                  <ProviderCard key={pro.id} provider={pro} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200/80 p-12 text-center max-w-md mx-auto">
                <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-base font-bold text-slate-900 mb-1">
                  No saved specialists yet
                </h3>
                <p className="text-xs text-slate-500 mb-6">
                  Save favorite electricians, plumbers, and technicians for rapid 1-click rebooking.
                </p>
                <Link
                  to="/services"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2.5 rounded-xl text-xs transition"
                >
                  Browse Verified Pros
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Profile & Settings */}
        {activeTab === "settings" && (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 max-w-2xl shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-black text-slate-900">
                  Account Profile & Preferences
                </h3>
                <p className="text-xs text-slate-500">
                  Manage your contact information and default service address.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="px-3.5 py-1.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-xs flex items-center gap-1.5"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditingProfile ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:bg-slate-100 disabled:text-slate-600"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    disabled={!isEditingProfile}
                    value={profilePhone}
                    onChange={(e) => setProfilePhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:bg-slate-100 disabled:text-slate-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Primary District
                  </label>
                  <select
                    disabled={!isEditingProfile}
                    value={profileDistrict}
                    onChange={(e) => setProfileDistrict(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:bg-slate-100 disabled:text-slate-600"
                  >
                    {CITIES.map((c, i) => (
                      <option key={i} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Default Service Address
                </label>
                <input
                  type="text"
                  disabled={!isEditingProfile}
                  value={profileAddress}
                  onChange={(e) => setProfileAddress(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm disabled:bg-slate-100 disabled:text-slate-600"
                />
              </div>

              {isEditingProfile && (
                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
