import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Wrench,
  Calendar,
  LogOut,
  Home,
  Search,
  Info,
  Mail,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useBooking } from "../context/useBooking";
import { useLanguage } from "../context/useLanguage";

export const Navbar = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [tabletMenuOpen, setTabletMenuOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, role, logout } = useAuth();
  const { activeBookingsCount, openBookingModalWithPro } = useBooking();
  const { t } = useLanguage();

  const userDropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // Close tablet menu on route change
  useEffect(() => {
    setTabletMenuOpen(false);
  }, [location.pathname]);

  // Handle smooth scroll for anchor links
  useEffect(() => {
    if (!location.hash) return;
    const id = location.hash.slice(1);
    const timer = setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [location.pathname, location.hash]);

  const handleBookClick = () => {
    openBookingModalWithPro(null);
  };

  const isActive = (path) => {
    if (path === "/" && location.pathname === "/" && !location.hash) return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* ========================================================
          STICKY TOP HEADER
          ======================================================== */}
      <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[60px] md:h-[68px]">
            {/* Left: Brand Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 group focus:outline-none shrink-0"
              aria-label="ServiLink Home"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 group-hover:bg-indigo-700 transition-colors">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:rotate-12" />
              </div>
              <span className="font-black text-lg sm:text-xl text-slate-900 tracking-tight leading-none whitespace-nowrap">
                Servi<span className="text-indigo-600">Link</span>
              </span>
            </Link>

            {/* Center: Desktop Nav Links (Visible on Laptop / Desktop >= 1024px) */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Main Navigation">
              <Link
                to="/services"
                className={`text-sm transition font-medium ${
                  isActive("/services")
                    ? "text-indigo-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("services")}
              </Link>

              <Link
                to="/categories"
                className={`text-sm transition font-medium ${
                  isActive("/categories")
                    ? "text-indigo-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("categories")}
              </Link>

              <Link
                to="/about"
                className={`text-sm transition font-medium ${
                  isActive("/about")
                    ? "text-indigo-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("about")}
              </Link>

              <Link
                to="/contact"
                className={`text-sm transition font-medium ${
                  isActive("/contact")
                    ? "text-indigo-600 font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {t("contact")}
              </Link>
            </nav>

            {/* Right: Desktop & Tablet Controls */}
            <div className="hidden md:flex items-center gap-2.5 shrink-0">
              {/* Bookings shortcut */}
              <Link
                to="/bookings"
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 bg-white text-xs font-semibold transition whitespace-nowrap shadow-2xs flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-indigo-500" />
                <span>Bookings</span>
                {activeBookingsCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-indigo-600 text-white text-[10px] font-bold flex items-center justify-center">
                    {activeBookingsCount}
                  </span>
                )}
              </Link>

              {/* Book a Pro CTA */}
              <button
                type="button"
                onClick={handleBookClick}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold transition active:scale-95 whitespace-nowrap shadow-xs"
              >
                {t("getStarted")}
              </button>

              {/* User Avatar & Dropdown */}
              {currentUser ? (
                <div className="relative" ref={userDropdownRef}>
                  <button
                    type="button"
                    onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                    className="w-8 h-8 rounded-full ring-2 ring-indigo-200 overflow-hidden shrink-0 hover:ring-indigo-400 transition"
                    title="Account Profile"
                  >
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-full h-full object-cover"
                    />
                  </button>

                  {userDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 text-xs">
                      <div className="px-3.5 py-2 border-b border-slate-100">
                        <div className="font-bold text-slate-900 truncate">
                          {currentUser.name}
                        </div>
                        <div className="text-[11px] text-slate-400 capitalize">
                          {role} Account
                        </div>
                      </div>

                      {role === "customer" && (
                        <>
                          <Link
                            to="/dashboard/customer"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          >
                            Customer Portal
                          </Link>
                          <Link
                            to="/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          >
                            My Appointments
                          </Link>
                        </>
                      )}

                      {role === "provider" && (
                        <>
                          <Link
                            to="/dashboard/provider"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          >
                            Provider Portal
                          </Link>
                          <Link
                            to="/bookings"
                            onClick={() => setUserDropdownOpen(false)}
                            className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                          >
                            Assigned Dispatches
                          </Link>
                        </>
                      )}

                      {role === "admin" && (
                        <Link
                          to="/dashboard/admin"
                          onClick={() => setUserDropdownOpen(false)}
                          className="block px-3.5 py-2 hover:bg-slate-50 text-slate-700 font-medium"
                        >
                          Admin Console
                        </Link>
                      )}

                      <div className="pt-1 border-t border-slate-100 mt-1">
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setUserDropdownOpen(false);
                            navigate("/");
                          }}
                          className="w-full text-left px-3.5 py-2 hover:bg-rose-50 text-rose-600 font-semibold flex items-center gap-1.5"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>{t("logout")}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:text-indigo-600 hover:border-indigo-400 bg-white text-xs font-semibold transition"
                >
                  {t("signIn")}
                </Link>
              )}

              {/* Tablet Hamburger Toggle (Only visible on tablet: 768px <= width < 1024px) */}
              <button
                type="button"
                onClick={() => setTabletMenuOpen(!tabletMenuOpen)}
                className="hidden md:flex lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 items-center justify-center ml-1"
                aria-label="Toggle navigation menu"
              >
                {tabletMenuOpen ? <X className="w-5 h-5 text-indigo-600" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

            {/* Mobile: Book Now Button (Only on mobile < 768px, hamburger removed) */}
            <div className="flex md:hidden items-center">
              <button
                type="button"
                onClick={handleBookClick}
                className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition active:scale-95 whitespace-nowrap shadow-sm shadow-indigo-600/20 flex items-center gap-1.5"
              >
                <span>{t("bookNow") || "Book Now"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tablet Dropdown Drawer (Only visible on tablet: 768px <= width < 1024px when opened) */}
        {tabletMenuOpen && (
          <div className="hidden md:block lg:hidden bg-white border-t border-slate-200/90 px-6 py-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
            <nav className="grid grid-cols-2 gap-3 text-sm font-semibold" aria-label="Tablet Navigation Menu">
              <Link
                to="/services"
                onClick={() => setTabletMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition ${
                  isActive("/services")
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("services")}
              </Link>
              <Link
                to="/categories"
                onClick={() => setTabletMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition ${
                  isActive("/categories")
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("categories")}
              </Link>
              <Link
                to="/about"
                onClick={() => setTabletMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition ${
                  isActive("/about")
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("about")}
              </Link>
              <Link
                to="/contact"
                onClick={() => setTabletMenuOpen(false)}
                className={`px-4 py-2.5 rounded-xl transition ${
                  isActive("/contact")
                    ? "bg-indigo-50 text-indigo-600 font-bold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                {t("contact")}
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* ========================================================
          MOBILE STICKY BOTTOM NAVIGATION BAR (Only on Mobile < 768px)
          ======================================================== */}
      <nav
        aria-label="Mobile Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 px-3 py-1.5 flex items-center justify-around shadow-lg"
      >
        <Link
          to="/"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold ${
            isActive("/") ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Home className="w-4 h-4 mb-0.5" />
          <span>{t("home")}</span>
        </Link>

        <Link
          to="/services"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold ${
            isActive("/services") ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Search className="w-4 h-4 mb-0.5" />
          <span>{t("services")}</span>
        </Link>

        <Link
          to="/bookings"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold relative ${
            isActive("/bookings") ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Calendar className="w-4 h-4 mb-0.5" />
          <span>Bookings</span>
          {activeBookingsCount > 0 && (
            <span className="absolute top-0 right-1 w-3.5 h-3.5 rounded-full bg-indigo-600 text-white text-[9px] font-bold flex items-center justify-center">
              {activeBookingsCount}
            </span>
          )}
        </Link>

        <Link
          to="/about"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold ${
            isActive("/about") ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Info className="w-4 h-4 mb-0.5" />
          <span>{t("about")}</span>
        </Link>

        <Link
          to="/contact"
          className={`flex flex-col items-center py-1 px-2 text-[10px] font-bold ${
            isActive("/contact") ? "text-indigo-600" : "text-slate-500 hover:text-slate-800"
          }`}
        >
          <Mail className="w-4 h-4 mb-0.5" />
          <span>{t("contact")}</span>
        </Link>
      </nav>
    </>
  );
};

export default Navbar;
