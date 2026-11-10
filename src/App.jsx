import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { AuthProvider } from "./context/AuthContext";
import { BookingProvider } from "./context/BookingContext";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { BookingModal } from "./components/booking/BookingModal";
import { ConfirmationModal } from "./components/booking/ConfirmationModal";
import { ProviderDetailsModal } from "./components/ui/ProviderDetailsModal";
import { Toast } from "./components/ui/Toast";

// Lazy load pages for fast code-splitting and performance
const HomePage = React.lazy(() => import("./pages/home/HomePage"));
const ServicesPage = React.lazy(() => import("./pages/services/ServicesPage"));
const CategoriesPage = React.lazy(() => import("./pages/categories/CategoriesPage"));
const MyBookingsPage = React.lazy(() => import("./pages/bookings/MyBookingsPage"));
const AboutPage = React.lazy(() => import("./pages/about/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/contact/ContactPage"));
const ProviderDashboard = React.lazy(() => import("./pages/dashboard/ProviderDashboard"));

export default function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <BookingProvider>
          <div className="flex flex-col min-h-screen bg-[#FAFAFC] text-slate-900 overflow-x-hidden">
            {/* Navigation Header */}
            <Navbar />

            {/* Dynamic Route Content (with pb-16 for mobile to prevent Bottom Nav overlay) */}
            <main className="flex-1 w-full overflow-x-hidden pb-16 md:pb-0">
              <Suspense
                fallback={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full border-2 border-indigo-600 border-t-transparent animate-spin" />
                  </div>
                }
              >
                <Routes>
                  {/* Public routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/services" element={<ServicesPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/bookings" element={<MyBookingsPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/contact" element={<ContactPage />} />

                  {/* Provider Dashboard */}
                  <Route path="/dashboard/provider" element={<ProviderDashboard />} />

                  {/* Catch-all */}
                  <Route path="*" element={<HomePage />} />
                </Routes>
              </Suspense>
            </main>

            {/* Global Footer */}
            <Footer />

            {/* Global Modals & Notifications */}
            <BookingModal />
            <ConfirmationModal />
            <ProviderDetailsModal />
            <Toast />
          </div>
        </BookingProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}
