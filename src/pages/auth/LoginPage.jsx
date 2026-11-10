import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Wrench, Lock, Mail, ArrowRight, Sparkles } from "lucide-react";
import { useAuth } from "../../context/useAuth";
import { DEMO_USERS } from "../../data/demoUsers";
import { useBooking } from "../../context/useBooking";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export const LoginPage = () => {
  const { login, switchRole } = useAuth();
  const { showToast } = useBooking();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "ahmad.shah@example.com",
      password: "password123"
    }
  });

  const onSubmit = (data) => {
    login(data.email, data.password, "customer");
    showToast("Welcome back, Ahmad Shah!", "success");
    navigate("/dashboard/customer");
  };

  const handleQuickLogin = (role) => {
    switchRole(role);
    showToast(`Logged in as ${DEMO_USERS[role].name} (${role.toUpperCase()})`, "success");
    if (role === "customer") navigate("/dashboard/customer");
    else if (role === "provider") navigate("/dashboard/provider");
    else if (role === "admin") navigate("/dashboard/admin");
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
          Welcome Back
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Sign in to access your appointments, favorites, or provider portal.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          {/* 1-Click Demo Profiles */}
          <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-2xl">
            <div className="flex items-center gap-1.5 text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instant Demo Accounts</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => handleQuickLogin("customer")}
                className="py-1.5 px-2 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-[11px] rounded-xl border border-indigo-200 transition shadow-2xs text-center"
              >
                Customer
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("provider")}
                className="py-1.5 px-2 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-[11px] rounded-xl border border-indigo-200 transition shadow-2xs text-center"
              >
                Provider
              </button>
              <button
                type="button"
                onClick={() => handleQuickLogin("admin")}
                className="py-1.5 px-2 bg-white hover:bg-indigo-600 hover:text-white text-indigo-700 font-bold text-[11px] rounded-xl border border-indigo-200 transition shadow-2xs text-center"
              >
                Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="login-email"
                  type="email"
                  {...register("email")}
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-indigo-600 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  id="login-password"
                  type="password"
                  {...register("password")}
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
              <span>Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Don't have an account yet?{" "}
            <Link to="/register" className="font-bold text-indigo-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
