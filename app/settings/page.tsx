"use client";

import { useEffect, useState } from "react";
import {
  Settings as SettingsIcon,
  Palette,
  Check,
  Sparkles,
  Download,
  Trash2,
  Bell,
  Scale,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { THEMES, GradientTheme } from "../components/layout/GradientBackground";
import { loadHistory, clearHistory } from "../lib/storage";
import { useThemeMode, ThemeMode } from "../context/ThemeModeContext";

export default function SettingsPage() {
  const { mode, setMode } = useThemeMode();
  const [currentTheme, setCurrentTheme] = useState<GradientTheme>("cosmic");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lbs">("kg");
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("workout_theme") as GradientTheme;
    if (savedTheme && THEMES[savedTheme]) {
      setCurrentTheme(savedTheme);
    }

    const savedUnit = localStorage.getItem("workout_unit") as "kg" | "lbs";
    if (savedUnit) {
      setWeightUnit(savedUnit);
    }
  }, []);

  const changeTheme = (themeKey: GradientTheme) => {
    setCurrentTheme(themeKey);
    localStorage.setItem("workout_theme", themeKey);
    window.dispatchEvent(
      new CustomEvent("theme-change", { detail: themeKey })
    );
  };

  const toggleUnit = (unit: "kg" | "lbs") => {
    setWeightUnit(unit);
    localStorage.setItem("workout_unit", unit);
  };

  const handleExportData = () => {
    const history = loadHistory();
    const prs = localStorage.getItem("personalRecords");
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ history, prs }));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `workout_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClearAll = () => {
    if (confirm("⚠️ Are you sure you want to erase all workout logs and Personal Records? This cannot be undone!")) {
      clearHistory();
      alert("✅ All workout history and records cleared!");
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
          <SettingsIcon size={14} />
          <span>Preferences & Design</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Settings & Theme Engine
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure Light/Dark/System theme modes, ambient gradient presets, and app preferences.
        </p>
      </div>

      {/* Section 1: Dedicated Theme Mode Controls (Light, Dark, System) */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
            <Sun size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Appearance Theme Mode</h2>
            <p className="text-xs text-slate-400">Choose Light mode, Dark mode, or Follow System preferences</p>
          </div>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
          {/* Light Mode Button */}
          <button
            onClick={() => setMode("light")}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 transition-all ${
              mode === "light"
                ? "border-amber-400 bg-amber-500/15 text-white shadow-xl shadow-amber-500/10 scale-[1.02]"
                : "border-white/10 bg-slate-950/40 text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${mode === "light" ? "bg-amber-500 text-slate-950" : "bg-slate-900 text-amber-400"}`}>
              <Sun size={24} />
            </div>
            <div className="text-center">
              <div className="text-sm font-extrabold">Light Mode</div>
              <div className="text-[11px] opacity-70">Bright & clean interface</div>
            </div>
            {mode === "light" && <Check size={16} className="text-amber-400" />}
          </button>

          {/* Dark Mode Button */}
          <button
            onClick={() => setMode("dark")}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 transition-all ${
              mode === "dark"
                ? "border-blue-400 bg-blue-600/15 text-white shadow-xl shadow-blue-600/10 scale-[1.02]"
                : "border-white/10 bg-slate-950/40 text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${mode === "dark" ? "bg-blue-600 text-white" : "bg-slate-900 text-blue-400"}`}>
              <Moon size={24} />
            </div>
            <div className="text-center">
              <div className="text-sm font-extrabold">Dark Mode</div>
              <div className="text-[11px] opacity-70">Deep dark obsidian contrast</div>
            </div>
            {mode === "dark" && <Check size={16} className="text-blue-400" />}
          </button>

          {/* Follow System Theme Button */}
          <button
            onClick={() => setMode("system")}
            className={`flex flex-col items-center justify-center gap-3 rounded-2xl border p-5 transition-all ${
              mode === "system"
                ? "border-purple-400 bg-purple-600/15 text-white shadow-xl shadow-purple-600/10 scale-[1.02]"
                : "border-white/10 bg-slate-950/40 text-slate-400 hover:border-white/20 hover:text-white"
            }`}
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${mode === "system" ? "bg-purple-600 text-white" : "bg-slate-900 text-purple-400"}`}>
              <Laptop size={24} />
            </div>
            <div className="text-center">
              <div className="text-sm font-extrabold">System Auto</div>
              <div className="text-[11px] opacity-70">Sync with OS light/dark setting</div>
            </div>
            {mode === "system" && <Check size={16} className="text-purple-400" />}
          </button>
        </div>
      </div>

      {/* Section 2: Variable Gradient Theme Customizer */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
              <Palette size={20} />
            </div>
            <div>
              <h2 className="text-xl font-black text-white">Variable Gradient Accents</h2>
              <p className="text-xs text-slate-400">Select ambient mesh background colors</p>
            </div>
          </div>

          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${THEMES[currentTheme].badge}`}>
            <Sparkles size={12} className="inline mr-1" /> Active: {THEMES[currentTheme].name}
          </span>
        </div>

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2">
          {(Object.keys(THEMES) as GradientTheme[]).map((key) => {
            const theme = THEMES[key];
            const isSelected = currentTheme === key;

            return (
              <div
                key={key}
                onClick={() => changeTheme(key)}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl border p-5 transition-all duration-300 ${
                  isSelected
                    ? "border-purple-500/50 bg-purple-600/15 shadow-xl shadow-purple-600/10 scale-[1.02]"
                    : "border-white/10 bg-slate-950/40 hover:border-white/20 hover:bg-slate-950/70"
                }`}
              >
                <div
                  className="h-2 w-full rounded-full mb-3"
                  style={{
                    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent})`,
                  }}
                />

                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                      {theme.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-400">{theme.description}</p>
                  </div>

                  <div
                    className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                      isSelected
                        ? "border-purple-400 bg-purple-500 text-white"
                        : "border-white/10 bg-slate-900 text-slate-500 group-hover:border-white/30"
                    }`}
                  >
                    <Check size={14} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: App Preferences */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Scale size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">App Preferences</h2>
            <p className="text-xs text-slate-400">Configure measurement units and sounds</p>
          </div>
        </div>

        <div className="space-y-4">
          {/* Unit Toggle */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-slate-950/40">
            <div>
              <div className="text-sm font-bold text-white">Preferred Weight Unit</div>
              <div className="text-xs text-slate-400">Default unit for logging set weights</div>
            </div>

            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-white/10">
              <button
                onClick={() => toggleUnit("kg")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  weightUnit === "kg" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                kg (Kilograms)
              </button>
              <button
                onClick={() => toggleUnit("lbs")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                  weightUnit === "lbs" ? "bg-blue-600 text-white shadow-md" : "text-slate-400 hover:text-white"
                }`}
              >
                lbs (Pounds)
              </button>
            </div>
          </div>

          {/* Sound Effect Switch */}
          <div className="flex items-center justify-between p-4 rounded-2xl border border-white/5 bg-slate-950/40">
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2">
                <Bell size={16} className="text-amber-400" /> Completion Chime Sounds
              </div>
              <div className="text-xs text-slate-400">Play audio cue when personal records are broken</div>
            </div>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`h-7 w-12 rounded-full p-1 transition-colors ${
                soundEnabled ? "bg-emerald-500" : "bg-slate-700"
              }`}
            >
              <div
                className={`h-5 w-5 rounded-full bg-white transition-transform ${
                  soundEnabled ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Section 4: Data & Backup */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl space-y-6">
        <div className="flex items-center gap-3 border-b border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600/20 text-emerald-400 border border-emerald-500/30">
            <Download size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Data Management & Backup</h2>
            <p className="text-xs text-slate-400">Export or reset your workout history</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <button
            onClick={handleExportData}
            className="flex-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-3.5 text-sm font-bold text-emerald-300 hover:bg-emerald-500/20 transition"
          >
            <Download size={18} /> Export JSON Data Backup
          </button>

          <button
            onClick={handleClearAll}
            className="flex-1 w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-3.5 text-sm font-bold text-red-300 hover:bg-red-500/20 transition"
          >
            <Trash2 size={18} /> Clear Workout History
          </button>
        </div>
      </div>
    </div>
  );
}