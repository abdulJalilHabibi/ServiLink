import React from "react";
import { Plus, Trash2 } from "lucide-react";

export const ProviderServicesTab = ({
  providerServices,
  onOpenAddService,
  onDeleteService
}) => {
  return (
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
          onClick={onOpenAddService}
          className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition cursor-pointer"
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
                onClick={() => onDeleteService(srv.id)}
                className="text-xs font-semibold text-rose-500 hover:text-rose-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove Offering</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
