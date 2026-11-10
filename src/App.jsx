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
const HomePage = React.lazy(() => import("./pages/HomePage"));
const ServicesPage = React.lazy(() => import("./pages/ServicesPage"));
const CategoriesPage = React.lazy(() => import("./pages/CategoriesPage"));
const MyBookingsPage = React.lazy(() => import("./pages/MyBookingsPage"));
const AboutPage = React.lazy(() => import("./pages/AboutPage"));
const ContactPage = React.lazy(() => import("./pages/ContactPage"));
const LoginPage = React.lazy(() => import("./pages/auth/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/auth/RegisterPage"));
const ForgotPasswordPage = React.lazy(() => import("./pages/auth/ForgotPasswordPage"));
const CustomerDashboard = React.lazy(() => import("./pages/dashboard/CustomerDashboard"));
const ProviderDashboard = React.lazy(() => import("./pages/dashboard/ProviderDashboard"));
const AdminDashboard = React.lazy(() => import("./pages/dashboard/AdminDashboard"));

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

                  {/* Auth routes */}
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/forgot-password" element={<ForgotPasswordPage />} />

                  {/* Dashboards */}
                  <Route path="/dashboard/customer" element={<CustomerDashboard />} />
                  <Route path="/dashboard/provider" element={<ProviderDashboard />} />
                  <Route path="/dashboard/admin" element={<AdminDashboard />} />

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
