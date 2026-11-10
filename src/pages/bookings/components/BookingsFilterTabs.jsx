import React from "react";

export const BookingsFilterTabs = ({ filterTab, setFilterTab, bookings }) => {
  const tabs = [
    { id: "all", label: `All (${bookings.length})` },
    {
      id: "active",
      label: `Active (${bookings.filter((b) => b.status === "Pending" || b.status === "Confirmed").length})`
    },
    {
      id: "completed",
      label: `Completed (${bookings.filter((b) => b.status === "Completed").length})`
    },
    {
      id: "cancelled",
      label: `Cancelled (${bookings.filter((b) => b.status === "Cancelled").length})`
    }
  ];

  return (
    <div className="flex items-center gap-2 mb-6 border-b border-slate-200/80 pb-3 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setFilterTab(tab.id)}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
            filterTab === tab.id
              ? "bg-indigo-600 text-white shadow-xs"
              : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200/80"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};
