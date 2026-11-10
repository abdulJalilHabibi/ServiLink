import React from "react";
import { Link } from "react-router-dom";
import { Wrench, PhoneCall, ShieldCheck } from "lucide-react";
import { useLanguage } from "../context/useLanguage";

const CURRENT_YEAR = 2026;

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t border-slate-200/80 pt-12 pb-24 md:pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-slate-100">
          {/* Col 1: Brand & Emergency Hotline */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20">
                <Wrench className="w-4 h-4 transition-transform group-hover:rotate-12" />
              </div>
              <span className="font-black text-xl text-slate-900 tracking-tight">
                Servi<span className="text-indigo-600">Link</span>
              </span>
            </Link>

            <p className="text-xs text-slate-500 leading-relaxed">
              {t("footerDesc")}
            </p>

            <div className="pt-1">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-700 mb-1">
                <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t("emergencyHotline")}</span>
              </div>
              <a
                href="tel:+93791234567"
                className="font-mono text-xs font-black text-indigo-600 hover:underline block"
              >
                +93 79 123 4567
              </a>
            </div>
          </div>

          {/* Col 2: Popular Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              {t("popularServices")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <Link to="/services?category=electrical" className="hover:text-indigo-600 transition">
                  Electrical & Solar
                </Link>
              </li>
              <li>
                <Link to="/services?category=plumbing" className="hover:text-indigo-600 transition">
                  Emergency Plumbing
                </Link>
              </li>
              <li>
                <Link to="/services?category=hvac" className="hover:text-indigo-600 transition">
                  HVAC & AC Cooling
                </Link>
              </li>
              <li>
                <Link to="/services?category=carpentry" className="hover:text-indigo-600 transition">
                  Carpentry & Cabinetry
                </Link>
              </li>
              <li>
                <Link to="/services?category=appliance" className="hover:text-indigo-600 transition">
                  Appliance Repair
                </Link>
              </li>
              <li>
                <Link to="/services?category=painting" className="hover:text-indigo-600 transition">
                  House Painting
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: For Customers */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              {t("forCustomers")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <a href="/#how-it-works" className="hover:text-indigo-600 transition">
                  {t("howItWorks")}
                </a>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 transition">
                  Browse Specialists
                </Link>
              </li>
              <li>
                <Link to="/bookings" className="hover:text-indigo-600 transition">
                  Track Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 transition">
                  $2,500 Trust Guarantee
                </Link>
              </li>
              <li>
                <Link to="/dashboard/customer" className="hover:text-indigo-600 transition">
                  Customer Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: For Service Pros */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              {t("forProviders")}
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <Link to="/register" className="hover:text-indigo-600 transition">
                  {t("joinAsPro")}
                </Link>
              </li>
              <li>
                <Link to="/dashboard/provider" className="hover:text-indigo-600 transition">
                  Technician Portal
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-600 transition">
                  Verification Standards
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 transition">
                  Dispatcher Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-3">
              ServiLink AF
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-500">
              <li>
                <Link to="/about" className="hover:text-indigo-600 transition">
                  About Our Mission
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-600 transition">
                  Contact & Locations
                </Link>
              </li>
              <li>
                <Link to="/dashboard/admin" className="hover:text-indigo-600 transition">
                  Admin Console
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-indigo-600 transition">
                  Sign In
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Guarantee Row */}
        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Kabul Metro On-Demand Services • 100% Background Screened</span>
          </div>

          <div>
            © {CURRENT_YEAR} ServiLink AF. {t("allRightsReserved")}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
