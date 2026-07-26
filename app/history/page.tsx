"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  History as HistoryIcon,
  Trash2,
  Calendar,
  Dumbbell,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { loadHistory, deleteWorkout, clearHistory } from "../lib/storage";
import { WorkoutData } from "../types/workout";
import { rebuildPRs } from "../lib/pr";

export default function HistoryPage() {
  const [history, setHistory] = useState<WorkoutData[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  function refreshHistory() {
    setHistory(loadHistory());
  }

  function handleDelete(id: string) {
    if (!confirm("Delete this workout session?")) return;
    deleteWorkout(id);
    const updated = loadHistory();
    rebuildPRs(updated);
    setHistory(updated);
  }

  function handleClearHistory() {
    if (!confirm("⚠️ Delete ALL workout history and Personal Records?")) return;
    clearHistory();
    refreshHistory();
  }

  return (
    <div className="space-y-8">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-blue-600 dark:text-blue-400">
            <HistoryIcon size={13} className="inline -mt-0.5 mr-1" />
            Logged Sessions
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            Workout History
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
            Review past sessions, detailed exercise sets and PR milestones.
          </p>
        </div>

        {history.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-2 rounded-2xl border border-red-300 dark:border-red-500/30 bg-red-50 dark:bg-red-500/10 px-4 py-2.5 text-xs font-bold text-red-600 dark:text-red-300 hover:bg-red-100 dark:hover:bg-red-500/20 transition w-fit"
          >
            <Trash2 size={14} /> Clear All Logs
          </button>
        )}
      </div>

      {/* ─── History List ─── */}
      {history.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 mb-4">
            <HistoryIcon size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No Workouts Logged Yet</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Completed sessions will appear here automatically with exercise details and performance stats.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-xs font-extrabold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
          >
            Start Your First Workout →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((workout) => {
            const dateObj = new Date(workout.date);
            const dateFormatted = dateObj.toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const timeFormatted = dateObj.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <div
                key={workout.id}
                className="group rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-5 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-lg dark:hover:shadow-blue-500/10 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400">
                      <Dumbbell size={22} />
                    </div>
                    <div>
                      <Link href={`/history/${workout.id}`}>
                        <h2 className="text-lg font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-1">
                          {workout.workout}
                          <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
                        </h2>
                      </Link>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} /> {dateFormatted} at {timeFormatted}
                        </span>
                        <span className="inline-block rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-600 dark:text-blue-300">
                          {workout.exercises.length} Exercises
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 self-end sm:self-center">
                    <Link
                      href={`/history/${workout.id}`}
                      className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 dark:border-blue-500/30 bg-slate-100 dark:bg-blue-600/20 px-4 py-2 text-xs font-bold text-slate-700 dark:text-blue-300 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition"
                    >
                      <ExternalLink size={13} /> View Details
                    </Link>
                    <button
                      onClick={() => handleDelete(workout.id)}
                      className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 dark:border-red-500/20 bg-slate-100 dark:bg-red-500/10 text-slate-500 dark:text-red-400 hover:bg-red-500 hover:text-white hover:border-red-500 transition"
                      title="Delete Session"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}