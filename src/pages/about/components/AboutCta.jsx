import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export const AboutCta = () => {
  return (
    <div className="text-center">
      <Link
        to="/services"
        className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3.5 rounded-2xl shadow-lg shadow-indigo-500/25 transition active:scale-95 text-sm"
      >
        <span>Book a Verified Technician Now</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
};
