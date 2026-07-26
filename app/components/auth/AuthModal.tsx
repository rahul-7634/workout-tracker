"use client";

import { useState } from "react";
import { X, Lock, Mail, User, Dumbbell, Sparkles, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function AuthModal() {
  const {
    showAuthModal,
    closeAuthModal,
    authModalMode,
    login,
    signup,
    loginAsDemo,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "signup">(authModalMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("Muscle Building & Strength");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!showAuthModal) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (mode === "login") {
      if (!email || !password) {
        setErrorMsg("Please enter both email and password.");
        return;
      }
      const ok = login(email, password);
      if (!ok) setErrorMsg("Invalid credentials.");
    } else {
      if (!name || !email || !password) {
        setErrorMsg("Please complete all required fields.");
        return;
      }
      const ok = signup(name, email, password, goal);
      if (!ok) setErrorMsg("Signup failed. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-white/20 bg-slate-900/90 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-blue-950/50 space-y-6">
        {/* Top Floating Glow Backdrop */}
        <div className="absolute -left-20 -top-20 h-44 w-44 rounded-full bg-blue-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -right-20 -bottom-20 h-44 w-44 rounded-full bg-purple-500/20 blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-lg shadow-blue-500/30">
              <Dumbbell className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-black text-white tracking-tight">
                {mode === "login" ? "Welcome Back" : "Join Apex Gym"}
              </h2>
              <p className="text-xs text-slate-400">
                {mode === "login" ? "Sign in to access your workout logs" : "Create an account to start tracking"}
              </p>
            </div>
          </div>

          <button
            onClick={closeAuthModal}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-slate-800/80 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex rounded-2xl border border-white/10 bg-slate-950/60 p-1">
          <button
            onClick={() => {
              setMode("login");
              setErrorMsg("");
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-extrabold transition ${
              mode === "login"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => {
              setMode("signup");
              setErrorMsg("");
            }}
            className={`flex-1 rounded-xl py-2 text-xs font-extrabold transition ${
              mode === "signup"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {errorMsg && (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-bold text-red-300">
            ⚠️ {errorMsg}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@gym.com"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 py-2.5 pl-10 pr-10 text-sm text-white outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {mode === "signup" && (
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Primary Fitness Goal
              </label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/60 p-2.5 text-sm text-white outline-none focus:border-blue-500 transition"
              >
                <option value="Muscle Building & Strength">Muscle Building & Strength</option>
                <option value="Fat Loss & Conditioning">Fat Loss & Conditioning</option>
                <option value="Powerlifting & Heavy Lifts">Powerlifting & Heavy Lifts</option>
                <option value="General Health & Mobility">General Health & Mobility</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95 transition"
          >
            {mode === "login" ? "Log In to Account" : "Create Member Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-[11px] font-bold text-slate-500 uppercase">Or</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Quick Demo Access Button */}
        <button
          onClick={loginAsDemo}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-500/30 bg-amber-500/10 py-3 text-xs font-bold text-amber-300 hover:bg-amber-500/20 transition"
        >
          <Sparkles size={16} className="text-amber-400" /> Instant Demo Athlete Login
        </button>
      </div>
    </div>
  );
}
