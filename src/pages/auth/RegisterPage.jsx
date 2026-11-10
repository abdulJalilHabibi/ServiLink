import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wrench, Lock, Mail, User, Phone, MapPin, ArrowRight, Briefcase } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { useBooking } from "../../context/useBooking";
import { CITIES, CATEGORIES } from "../../data/mockData";

const registerSchema = z.object({
  fullName: z.string().min(3, { message: "Full name must be at least 3 characters long" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().regex(/^07\d{8}$/, { message: "Enter valid 10-digit phone starting with 07 (e.g. 0799123456)" }),
  district: z.string().min(1, { message: "Please select your primary district" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
  role: z.enum(["customer", "provider"]),
  tradeHeadline: z.string().optional(),
  category: z.string().optional(),
  hourlyRate: z.string().optional(),
});

export const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const { showToast } = useBooking();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("customer");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      district: CITIES[1] || "District 10 - Wazir Akbar Khan",
      password: "",
      role: "customer",
      tradeHeadline: "",
      category: "electrical",
      hourlyRate: "35"
    }
  });

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setValue("role", role);
  };

  const onSubmit = (data) => {
    registerUser(data);
    showToast(`Account created successfully! Welcome, ${data.fullName}`, "success");
    if (data.role === "provider") {
      navigate("/dashboard/provider");
    } else {
      navigate("/dashboard/customer");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Wrench className="w-5 h-5 transition-transform group-hover:rotate-12" />
          </div>
          <span className="font-black text-2xl text-slate-900 tracking-tight">
            Servi<span className="text-indigo-600">Link</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Join ServiLink Today
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Book vetted technicians or offer your technical expertise across Kabul.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          {/* Account Type Selector Tabs */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Select Account Type
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleRoleSelect("customer")}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedRole === "customer"
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-600/20"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <User className="w-4 h-4 text-indigo-600" />
                  <span>Customer</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1">
                  Book verified home & office repairs
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("provider")}
                className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between ${
                  selectedRole === "provider"
                    ? "border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-600/20"
                    : "border-slate-200 hover:border-slate-300 text-slate-700"
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  <Briefcase className="w-4 h-4 text-indigo-600" />
                  <span>Service Pro</span>
                </div>
                <span className="text-[11px] text-slate-500 mt-1">
                  Offer trade skills & receive dispatches
                </span>
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-name"
                  type="text"
                  {...register("fullName")}
                  placeholder="e.g. Ahmad Shah"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>
              {errors.fullName && (
                <p className="text-xs text-rose-500 mt-1">{errors.fullName.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="reg-email"
                    type="email"
                    {...register("email")}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="reg-phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Mobile Phone <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="reg-phone"
                    type="tel"
                    {...register("phone")}
                    placeholder="0799123456"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-rose-500 mt-1">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="reg-district" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Primary Kabul District <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <select
                  id="reg-district"
                  {...register("district")}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                >
                  {CITIES.map((c, i) => (
                    <option key={i} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Provider Specific Inputs if selected */}
            {selectedRole === "provider" && (
              <div className="p-4 bg-indigo-50/60 rounded-2xl border border-indigo-100 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-800 block">
                  Technician Credentials
                </span>
                <div>
                  <label htmlFor="reg-trade" className="block text-xs font-semibold text-slate-700 mb-1">
                    Trade Headline
                  </label>
                  <input
                    id="reg-trade"
                    type="text"
                    {...register("tradeHeadline")}
                    placeholder="e.g. Master Electrician & Solar Installer"
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reg-category" className="block text-xs font-semibold text-slate-700 mb-1">
                      Primary Trade
                    </label>
                    <select
                      id="reg-category"
                      {...register("category")}
                      className="w-full px-2.5 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="reg-rate" className="block text-xs font-semibold text-slate-700 mb-1">
                      Hourly Rate ($)
                    </label>
                    <input
                      id="reg-rate"
                      type="number"
                      {...register("hourlyRate")}
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs"
                    />
                  </div>
                </div>
              </div>
            )}

            <div>
              <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Password <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="reg-password"
                  type="password"
                  {...register("password")}
                  placeholder="At least 6 characters"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center justify-center gap-2 text-sm"
            >
              <span>Create Account</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-indigo-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
