import React from "react";
import { Link } from "react-router-dom";

export const CategoriesCtaBanner = () => {
  return (
    <div className="mt-12 bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
      <div className="max-w-xl">
        <h3 className="text-xl sm:text-2xl font-black text-slate-900">
          Need a Custom Trade or Complex Renovation?
        </h3>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Our central operations team can assemble a specialized multi-trade crew for extensive villa or office repairs.
        </p>
      </div>
      <Link
        to="/contact"
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-3 rounded-xl text-sm shadow-md transition active:scale-95 whitespace-nowrap"
      >
        Contact Central Dispatch
      </Link>
    </div>
  );
};
