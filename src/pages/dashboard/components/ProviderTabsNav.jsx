import React from "react";
import { Briefcase, Clock, DollarSign } from "lucide-react";

export const ProviderTabsNav = ({
  activeTab,
  setActiveTab,
  requestsCount,
  servicesCount
}) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: Briefcase },
    {
      id: "requests",
      label: `Incoming Requests (${requestsCount})`,
      icon: Clock
    },
    {
      id: "services",
      label: `My Services (${servicesCount})`,
      icon: Briefcase
    },
    { id: "earnings", label: "Earnings & Payouts", icon: DollarSign },
  ];

  return (
    <div className="flex items-center gap-2 mb-6 border-b border-slate-200 pb-3 overflow-x-auto">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
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
  );
};
