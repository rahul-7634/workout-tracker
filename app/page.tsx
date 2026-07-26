"use client";

import { useState } from "react";
import Dashboard from "./components/dashboard/Dashboard";
import GymLanding from "./components/home/GymLanding";
import { Dumbbell, Info, Sparkles, LayoutDashboard } from "lucide-react";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"gym" | "tracker">("tracker");

  return (
    <div className="space-y-6">
      {/* Home Screen View Selector Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-900/60 p-2 backdrop-blur-xl">
        <div className="flex items-center gap-2 px-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
            <Sparkles size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Apex Home Portal
          </span>
        </div>

        <div className="flex w-full sm:w-auto rounded-xl border border-white/10 bg-slate-950/60 p-1">
          <button
            onClick={() => setActiveTab("tracker")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-xs font-extrabold transition ${
              activeTab === "tracker"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <LayoutDashboard size={14} /> Workout Tracker
          </button>

          <button
            onClick={() => setActiveTab("gym")}
            className={`flex-1 sm:flex-none flex items-center justify-center gap-2 rounded-lg px-4 py-1.5 text-xs font-extrabold transition ${
              activeTab === "gym"
                ? "bg-blue-600 text-white shadow-md"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Info size={14} /> Gym Details & Facilities
          </button>
        </div>
      </div>

      {/* Render Active View */}
      {activeTab === "tracker" ? <Dashboard /> : <GymLanding />}
    </div>
  );
}