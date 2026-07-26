"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Sparkles,
  Trophy,
  Flame,
} from "lucide-react";
import { loadHistory } from "../lib/storage";
import { WorkoutData } from "../types/workout";

export default function CalendarPage() {
  const [history, setHistory] = useState<WorkoutData[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDayWorkouts, setSelectedDayWorkouts] = useState<WorkoutData[] | null>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Map history workouts to day strings (YYYY-MM-DD)
  const workoutMap: Record<string, WorkoutData[]> = {};
  history.forEach((w) => {
    const d = new Date(w.date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    if (!workoutMap[key]) workoutMap[key] = [];
    workoutMap[key].push(w);
  });

  // Calculate monthly stats
  const workoutsThisMonth = history.filter((w) => {
    const d = new Date(w.date);
    return d.getFullYear() === year && d.getMonth() === month;
  });

  let monthlyVolume = 0;
  workoutsThisMonth.forEach((w) => {
    w.exercises.forEach((ex) => {
      ex.sets.forEach((s) => {
        const weight = Number(s.weight);
        const reps = Number(s.reps);
        if (!isNaN(weight) && !isNaN(reps)) monthlyVolume += weight * reps;
      });
    });
  });

  const todayKey = `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}-${String(new Date().getDate()).padStart(2, "0")}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <CalendarIcon size={14} />
            <span>Interactive Logs</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Workout Calendar
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Track your consistency, frequency, and total monthly progress over time.
          </p>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-3 bg-slate-900/80 p-1.5 rounded-2xl border border-white/10 backdrop-blur-md">
          <button
            onClick={prevMonth}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-800 text-slate-300 transition"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="min-w-[140px] text-center text-sm font-extrabold text-white">
            {monthNames[month]} {year}
          </span>

          <button
            onClick={nextMonth}
            className="flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-800 text-slate-300 transition"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Monthly Summary Badges */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
            <Dumbbell size={22} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Workouts Completed</div>
            <div className="text-2xl font-black text-white">{workoutsThisMonth.length} Sessions</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-600/20 text-purple-400 border border-purple-500/30">
            <Trophy size={22} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Monthly Volume</div>
            <div className="text-2xl font-black text-white">{monthlyVolume.toLocaleString()} kg</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-900/50 p-4 backdrop-blur-xl flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/20 text-amber-400 border border-amber-500/30">
            <Flame size={22} />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-400">Consistency Rate</div>
            <div className="text-2xl font-black text-white">
              {daysInMonth > 0 ? Math.round((workoutsThisMonth.length / daysInMonth) * 100) : 0}% Days
            </div>
          </div>
        </div>
      </div>

      {/* Calendar Grid Container */}
      <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-4 sm:p-6 backdrop-blur-xl shadow-2xl">
        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold uppercase tracking-wider text-slate-400 pb-4 border-b border-white/10">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="py-1">{day}</div>
          ))}
        </div>

        {/* Days Grid */}
        <div className="grid grid-cols-7 gap-2 pt-4">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayOfWeek }).map((_, idx) => (
            <div key={`empty-${idx}`} className="h-20 sm:h-28 rounded-2xl bg-slate-950/20 border border-white/5 opacity-30" />
          ))}

          {/* Days of month */}
          {Array.from({ length: daysInMonth }).map((_, idx) => {
            const dayNum = idx + 1;
            const key = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
            const dayWorkouts = workoutMap[key] || [];
            const isToday = key === todayKey;

            return (
              <div
                key={key}
                onClick={() => dayWorkouts.length > 0 && setSelectedDayWorkouts(dayWorkouts)}
                className={`group relative h-20 sm:h-28 rounded-2xl border p-2 flex flex-col justify-between transition-all duration-300 ${
                  dayWorkouts.length > 0
                    ? "cursor-pointer border-blue-500/40 bg-gradient-to-br from-blue-900/30 to-indigo-900/20 hover:scale-[1.03] hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/20"
                    : isToday
                    ? "border-amber-500/40 bg-amber-500/10"
                    : "border-white/5 bg-slate-950/40 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`text-xs sm:text-sm font-bold ${
                    isToday ? "flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-slate-950 font-black" : "text-slate-300"
                  }`}>
                    {dayNum}
                  </span>

                  {dayWorkouts.length > 0 && (
                    <span className="flex h-2 w-2 rounded-full bg-emerald-400 ring-4 ring-emerald-400/20 animate-pulse" />
                  )}
                </div>

                {dayWorkouts.length > 0 ? (
                  <div className="space-y-1">
                    {dayWorkouts.map((w, wIdx) => (
                      <div
                        key={wIdx}
                        className="rounded-lg bg-blue-600/40 px-2 py-1 text-[10px] font-extrabold text-blue-200 truncate border border-blue-500/30"
                      >
                        💪 {w.workout}
                      </div>
                    ))}
                  </div>
                ) : (
                  <span className="text-[10px] text-slate-600 hidden sm:inline">Rest Day</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Day Details Modal */}
      {selectedDayWorkouts && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-lg rounded-3xl border border-white/20 bg-slate-900 p-6 backdrop-blur-2xl shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-xl font-black text-white flex items-center gap-2">
                <Sparkles className="text-amber-400" /> Workout Log Details
              </h3>
              <button
                onClick={() => setSelectedDayWorkouts(null)}
                className="text-slate-400 hover:text-white text-sm font-bold"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3">
              {selectedDayWorkouts.map((w) => (
                <div key={w.id} className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-bold text-blue-400">{w.workout}</h4>
                    <span className="text-xs text-slate-400">{new Date(w.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <p className="text-xs text-slate-300">{w.exercises.length} Exercises Recorded</p>
                  <Link
                    href={`/history/${w.id}`}
                    className="inline-block mt-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 transition"
                  >
                    View Full Breakdown →
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}