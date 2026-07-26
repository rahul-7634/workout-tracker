"use client";

import { useEffect, useState } from "react";
import {
  Flame,
  Sun,
  Moon,
  Sparkles,
  Palette,
  Check,
  User,
  LogIn,
  UserPlus,
  LogOut,
  Laptop,
  ChevronDown,
} from "lucide-react";
import { getDashboardStats } from "../../lib/stats";
import { THEMES, GradientTheme } from "./GradientBackground";
import { useAuth } from "../../context/AuthContext";
import { useThemeMode } from "../../context/ThemeModeContext";

export default function Header() {
  const { user, isLoggedIn, logout, openAuthModal } = useAuth();
  const { mode, setMode } = useThemeMode();

  const [streak, setStreak] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<GradientTheme>("cosmic");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    setStreak(getDashboardStats().streak);

    const savedTheme = localStorage.getItem("workout_theme") as GradientTheme;
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  const changeTheme = (themeKey: GradientTheme) => {
    setCurrentTheme(themeKey);
    localStorage.setItem("workout_theme", themeKey);
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: themeKey })
    );
    setShowThemePicker(false);
  };

  const hour = new Date().getHours();
  let greeting = "Good Evening";
  let TimeIcon = Moon;

  if (hour < 12) {
    greeting = "Good Morning";
    TimeIcon = Sun;
  } else if (hour < 18) {
    greeting = "Good Afternoon";
    TimeIcon = Sun;
  }

  const dateString = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const getModeLabel = () => {
    if (mode === "light") return { label: "Light", icon: Sun, color: "text-amber-500" };
    if (mode === "dark") return { label: "Dark", icon: Moon, color: "text-blue-400" };
    return { label: "System", icon: Laptop, color: "text-purple-400" };
  };

  const ActiveModeObj = getModeLabel();
  const ActiveIcon = ActiveModeObj.icon;

  return (
    <header className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 dark:border-white/10 pb-6">
      {/* Symmetrical Left Column: Greeting & Date */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <TimeIcon size={14} className="text-amber-500" />
          <span>{dateString}</span>
        </div>

        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl leading-tight">
          {greeting}, {isLoggedIn && user ? user.name.split(" ")[0] : "Athlete"} <span className="inline-block animate-bounce">👋</span>
        </h1>

        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
          Apex Athletic & Strength Club • Stay consistent, conquer goals.
        </p>
      </div>

      {/* Symmetrical Right Controls: All pills aligned to h-11 height */}
      <div className="flex flex-wrap items-center gap-3 self-end sm:self-center">
        {/* Day Streak Pill (h-11) */}
        <div className="flex h-11 items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-4 backdrop-blur-md">
          <Flame className="h-5 w-5 text-amber-500 animate-pulse shrink-0" />
          <div className="flex items-baseline gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-300">
              Streak:
            </span>
            <span className="text-sm font-black text-slate-900 dark:text-white">
              {streak} <span className="text-[10px] font-normal text-amber-700 dark:text-amber-200">Days</span>
            </span>
          </div>
        </div>

        {/* SINGLE THEME MODE BUTTON (h-11) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowModeDropdown(!showModeDropdown);
              setShowThemePicker(false);
            }}
            className="flex h-11 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-900/80 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm transition-all hover:border-blue-500/50 hover:shadow-md"
            title="Appearance Mode (Light / Dark / System)"
          >
            <ActiveIcon size={16} className={ActiveModeObj.color} />
            <span>Theme: <strong>{ActiveModeObj.label}</strong></span>
            <ChevronDown size={14} className="text-slate-400 ml-0.5" />
          </button>

          {showModeDropdown && (
            <div className="absolute right-0 top-13 z-50 w-52 rounded-2xl border border-slate-200 bg-white/95 dark:border-white/15 dark:bg-slate-950/95 p-2 backdrop-blur-2xl shadow-2xl space-y-1 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 mb-1">
                Select Theme Mode
              </div>

              <button
                onClick={() => {
                  setMode("light");
                  setShowModeDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                  mode === "light"
                    ? "bg-amber-500/15 text-amber-700 dark:text-amber-300 font-black border border-amber-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sun size={15} className="text-amber-500" />
                  <span>Light Mode</span>
                </div>
                {mode === "light" && <Check size={14} className="text-amber-500" />}
              </button>

              <button
                onClick={() => {
                  setMode("dark");
                  setShowModeDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                  mode === "dark"
                    ? "bg-blue-600/15 text-blue-700 dark:text-blue-300 font-black border border-blue-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Moon size={15} className="text-blue-500" />
                  <span>Dark Mode</span>
                </div>
                {mode === "dark" && <Check size={14} className="text-blue-500" />}
              </button>

              <button
                onClick={() => {
                  setMode("system");
                  setShowModeDropdown(false);
                }}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-bold transition ${
                  mode === "system"
                    ? "bg-purple-600/15 text-purple-700 dark:text-purple-300 font-black border border-purple-500/30"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Laptop size={15} className="text-purple-500" />
                  <span>Follow System</span>
                </div>
                {mode === "system" && <Check size={14} className="text-purple-500" />}
              </button>
            </div>
          )}
        </div>

        {/* GRADIENT ACCENT BUTTON (h-11) */}
        <div className="relative">
          <button
            onClick={() => {
              setShowThemePicker(!showThemePicker);
              setShowModeDropdown(false);
            }}
            className="flex h-11 items-center gap-2.5 rounded-2xl border border-slate-200 bg-white/90 dark:border-white/10 dark:bg-slate-900/80 px-4 text-xs font-bold text-slate-800 dark:text-slate-200 backdrop-blur-md transition-all hover:border-blue-500/50 hover:shadow-md"
            title="Gradient Color Accent"
          >
            <Palette className="h-4 w-4 text-purple-500" />
            <span className="hidden md:inline">{THEMES[currentTheme].name}</span>
          </button>

          {showThemePicker && (
            <div className="absolute right-0 top-13 z-50 w-64 rounded-2xl border border-slate-200 bg-white/95 dark:border-white/15 dark:bg-slate-950/95 p-3 backdrop-blur-2xl shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <div className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 border-b border-slate-100 dark:border-white/10 pb-1">
                Gradient Color Accents
              </div>

              <div className="space-y-1">
                {(Object.keys(THEMES) as GradientTheme[]).map((key) => {
                  const theme = THEMES[key];
                  const isSelected = currentTheme === key;

                  return (
                    <button
                      key={key}
                      onClick={() => changeTheme(key)}
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium transition ${
                        isSelected
                          ? "bg-blue-600/20 text-slate-900 dark:text-white font-bold border border-blue-500/40"
                          : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="h-3 w-3 rounded-full ring-2 ring-slate-300 dark:ring-white/20"
                          style={{
                            background: `linear-gradient(135deg, ${theme.primary}, ${theme.secondary})`,
                          }}
                        />
                        <span>{theme.name}</span>
                      </div>
                      {isSelected && <Check size={14} className="text-blue-500" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* AUTH BUTTONS OR USER BADGE (h-11) */}
        {isLoggedIn && user ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex h-11 items-center gap-3 rounded-2xl border border-blue-500/40 bg-blue-600/10 dark:bg-blue-600/20 px-4 backdrop-blur-md hover:bg-blue-600/20 transition-all"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 font-bold text-white text-xs shadow-md">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden md:block">
                <div className="text-xs font-black text-slate-900 dark:text-white leading-none">{user.name}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-300 font-bold">{user.tier}</div>
              </div>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 top-13 z-50 w-56 rounded-2xl border border-slate-200 bg-white/95 dark:border-white/15 dark:bg-slate-950/95 p-3 backdrop-blur-2xl shadow-2xl space-y-2 animate-in fade-in zoom-in-95">
                <div className="border-b border-slate-100 dark:border-white/10 pb-2 px-2">
                  <div className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">{user.email}</div>
                  <div className="mt-1 inline-block rounded-md bg-purple-500/10 border border-purple-500/30 px-2 py-0.5 text-[9px] font-bold text-purple-600 dark:text-purple-300 uppercase">
                    {user.tier}
                  </div>
                </div>

                <button
                  onClick={() => {
                    logout();
                    setShowUserMenu(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 transition"
                >
                  <LogOut size={14} /> Log Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openAuthModal("login")}
              className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white/90 dark:border-white/15 dark:bg-slate-900/80 px-4 text-xs font-extrabold text-slate-800 dark:text-white backdrop-blur-md transition hover:border-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 active:scale-95 shadow-sm"
            >
              <LogIn size={15} className="text-blue-600 dark:text-blue-400" /> Log In
            </button>

            <button
              onClick={() => openAuthModal("signup")}
              className="inline-flex h-11 items-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 text-xs font-extrabold text-white shadow-lg shadow-blue-600/30 transition hover:scale-105 active:scale-95"
            >
              <UserPlus size={15} /> Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}