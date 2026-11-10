import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Wrench, Mail, ArrowRight, CheckCircle2 } from "lucide-react";
import { useBooking } from "../../context/useBooking";

export const ForgotPasswordPage = () => {
  const { showToast } = useBooking();
  const [step, setStep] = useState(1); // 1: enter identifier, 2: enter code, 3: success
  const [identifier, setIdentifier] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendCode = (e) => {
    e.preventDefault();
    if (!identifier) return;
    showToast(`Verification code sent to ${identifier}! (Demo code: 123456)`, "info");
    setStep(2);
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (code.length < 4 || newPassword.length < 6) {
      showToast("Please enter a valid verification code and new password", "error");
      return;
    }
    setStep(3);
    showToast("Password updated successfully!", "success");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFC] py-12 flex flex-col justify-center px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Wrench className="w-5 h-5" />
          </div>
          <span className="font-black text-2xl text-slate-900 tracking-tight">
            Servi<span className="text-indigo-600">Link</span>
          </span>
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Reset Your Password
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-slate-500">
          Enter your registered email or phone to receive a recovery code.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 sm:px-10 rounded-3xl border border-slate-200/90 shadow-sm space-y-6">
          {step === 1 && (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div>
                <label htmlFor="reset-id" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Email or Afghan Mobile Phone (07XXXXXXXX)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    id="reset-id"
                    type="text"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder="0799123456 or ahmad@example.com"
                    required
                    className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                <span>Send Verification Code</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="p-3 bg-indigo-50 rounded-xl border border-indigo-100 text-xs text-indigo-800">
                A 6-digit code has been sent to <strong>{identifier}</strong>. (Hint: enter <strong>123456</strong>)
              </div>

              <div>
                <label htmlFor="reset-code" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  6-Digit Verification Code
                </label>
                <input
                  id="reset-code"
                  type="text"
                  maxLength="6"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-center text-lg font-mono font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              <div>
                <label htmlFor="reset-pass" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  New Password
                </label>
                <input
                  id="reset-pass"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center justify-center gap-2 text-sm"
              >
                <span>Update Password</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </form>
          )}

          {step === 3 && (
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-4 ring-emerald-50">
                <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-slate-900">
                Password Successfully Reset!
              </h3>
              <p className="text-xs text-slate-500">
                You can now log in with your updated credentials.
              </p>
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl shadow-md transition active:scale-95 text-sm"
              >
                <span>Proceed to Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}

          <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
            Remember your credentials?{" "}
            <Link to="/login" className="font-bold text-indigo-600 hover:underline">
              Back to login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
