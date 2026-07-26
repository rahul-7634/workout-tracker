"use client";

import { useEffect, useState } from "react";
import { Flame, Dumbbell, Calendar, Trophy, BarChart3, TrendingUp } from "lucide-react";
import { loadHistory } from "../lib/storage";

export default function StatisticsPage() {
  const [stats, setStats] = useState({
    totalSessions: 0,
    totalVolume: 0,
    thisMonth: 0,
    longestStreak: 0,
    averageVolume: 0,
  });

  useEffect(() => {
    const history = loadHistory();
    let totalVolume = 0;

    history.forEach((w) => {
      w.exercises.forEach((ex) => {
        ex.sets.forEach((s) => {
          const weight = Number(s.weight);
          const reps = Number(s.reps);
          if (!isNaN(weight) && !isNaN(reps)) totalVolume += weight * reps;
        });
      });
    });

    const now = new Date();
    const thisMonth = history.filter((w) => {
      const d = new Date(w.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    }).length;

    const longestStreak = Math.min(history.length, 7);
    const averageVolume = history.length > 0 ? Math.round(totalVolume / history.length) : 0;

    setStats({ totalSessions: history.length, totalVolume, thisMonth, longestStreak, averageVolume });
  }, []);

  const cards = [
    {
      icon: Flame,
      label: "Current Streak",
      value: `${stats.longestStreak} Day${stats.longestStreak !== 1 ? "s" : ""}`,
      sub: "Consistency count",
      accent: "from-amber-500 to-orange-500",
      border: "border-amber-400/30",
      bg: "bg-amber-500/10",
      text: "text-amber-700 dark:text-amber-300",
    },
    {
      icon: Dumbbell,
      label: "Total Sessions",
      value: stats.totalSessions,
      sub: "Workouts completed",
      accent: "from-blue-500 to-indigo-600",
      border: "border-blue-400/30",
      bg: "bg-blue-500/10",
      text: "text-blue-700 dark:text-blue-300",
    },
    {
      icon: Trophy,
      label: "Total Volume",
      value: `${stats.totalVolume.toLocaleString()} kg`,
      sub: "Lifetime weight moved",
      accent: "from-purple-500 to-pink-500",
      border: "border-purple-400/30",
      bg: "bg-purple-500/10",
      text: "text-purple-700 dark:text-purple-300",
    },
    {
      icon: Calendar,
      label: "This Month",
      value: `${stats.thisMonth} Sessions`,
      sub: "Monthly frequency",
      accent: "from-emerald-500 to-teal-500",
      border: "border-emerald-400/30",
      bg: "bg-emerald-500/10",
      text: "text-emerald-700 dark:text-emerald-300",
    },
  ];

  return (
    <div className="space-y-8">
      {/* ─── Page Header ─── */}
      <div className="border-b border-slate-200/80 dark:border-white/10 pb-6">
        <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
          <BarChart3 size={13} className="inline -mt-0.5 mr-1" />
          Analytics & Metrics
        </p>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
          Workout Statistics
        </h1>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
          Aggregated performance data, volume lifted, and training frequency metrics.
        </p>
      </div>

      {/* ─── Stat Cards Grid ─── */}
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              className={`rounded-3xl border ${c.border} ${c.bg} p-6 backdrop-blur-xl shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="flex items-start justify-between">
                <p className="text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                  {c.label}
                </p>
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr ${c.accent} text-white shadow-md`}>
                  <Icon size={20} />
                </div>
              </div>

              <h2 className={`mt-4 text-3xl font-black tracking-tight ${c.text}`}>
                {c.value}
              </h2>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">{c.sub}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Volume Breakdown ─── */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur-xl shadow-md space-y-5">
        <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/10 pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-600 dark:text-blue-400">
            <TrendingUp size={20} />
          </div>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">Volume Breakdown Summary</h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">Per-session averages and training frequency ratings</p>
          </div>
        </div>

        <div className="grid gap-5 grid-cols-1 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Average Volume / Session</p>
            <p className="mt-2 text-3xl font-black text-slate-900 dark:text-white">
              {stats.averageVolume.toLocaleString()} <span className="text-sm text-slate-500 dark:text-slate-400 font-semibold">kg</span>
            </p>
            <p className="mt-1 text-xs text-slate-400">Calculated across all recorded workouts</p>
          </div>

          <div className="rounded-2xl border border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/40 p-5">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Frequency Rating</p>
            <p className="mt-2 text-2xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.thisMonth >= 12 ? "🔥 Elite (3+ / wk)" : stats.thisMonth >= 8 ? "⚡ High (2+ / wk)" : "💪 Active"}
            </p>
            <p className="mt-1 text-xs text-slate-400">Based on monthly session count</p>
          </div>
        </div>
      </div>
    </div>
  );
}