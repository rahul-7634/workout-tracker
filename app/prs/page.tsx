"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Trophy, Award, Dumbbell, TrendingUp, ArrowRight } from "lucide-react";
import { loadPRs, PersonalRecord } from "../lib/pr";

export default function PRsPage() {
  const [prs, setPRs] = useState<PersonalRecord[]>([]);

  useEffect(() => {
    const records = loadPRs();
    records.sort((a, b) => a.exercise.localeCompare(b.exercise));
    setPRs(records);
  }, []);

  return (
    <div className="space-y-8">
      {/* ─── Page Header ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-slate-200/80 dark:border-white/10 pb-6">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-widest text-amber-600 dark:text-amber-400">
            <Trophy size={13} className="inline -mt-0.5 mr-1" />
            Milestone Records
          </p>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            Personal Records
          </h1>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium">
            Your heaviest lifts and peak rep counts across all exercises.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 rounded-2xl border border-amber-400/30 bg-amber-500/10 px-4 py-2.5 text-sm font-extrabold text-amber-700 dark:text-amber-300 backdrop-blur-md w-fit">
          <Award size={18} /> {prs.length} Records Set
        </div>
      </div>

      {/* ─── Empty State ─── */}
      {prs.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-14 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 dark:bg-amber-500/20 text-amber-500 border border-amber-300 dark:border-amber-500/30 mb-4">
            <Trophy size={32} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-white">No Personal Records Yet</h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
            Log workouts with weights & reps — the tracker automatically captures your heaviest lifts here.
          </p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-3 text-xs font-extrabold text-white hover:scale-105 transition shadow-lg shadow-amber-500/20"
          >
            Log A Workout Now <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        /* ─── PRs Table ─── */
        <div className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 overflow-hidden backdrop-blur-xl shadow-md">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead className="border-b border-slate-200 dark:border-white/10 bg-slate-50/80 dark:bg-slate-950/80">
                <tr>
                  <th className="px-5 py-4 text-left text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Exercise
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Max Weight
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Best Reps
                  </th>
                  <th className="px-5 py-4 text-center text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Est. 1RM
                  </th>
                  <th className="px-5 py-4 text-right text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Progress
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 dark:divide-white/5">
                {prs.map((pr, idx) => {
                  const weightNum = Number(pr.weight) || 0;
                  const repsNum = Number(pr.reps) || 0;
                  const oneRepMax = repsNum > 0 ? Math.round(weightNum * (1 + repsNum / 30)) : weightNum;

                  return (
                    <tr key={pr.exercise} className={`transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/40 ${idx % 2 === 0 ? "" : "bg-slate-50/50 dark:bg-slate-950/20"}`}>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 dark:bg-amber-500/20 border border-amber-300 dark:border-amber-500/30 text-amber-600 dark:text-amber-400">
                            <Trophy size={16} />
                          </span>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">{pr.exercise}</span>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="inline-block rounded-xl border border-amber-300 dark:border-amber-500/30 bg-amber-50 dark:bg-amber-500/10 px-3 py-1 text-sm font-extrabold text-amber-700 dark:text-amber-300">
                          {pr.weight} kg
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="font-extrabold text-sm text-blue-600 dark:text-blue-300">
                          {pr.reps} reps
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <span className="font-bold text-sm text-purple-600 dark:text-purple-300">
                          ~{oneRepMax} kg
                        </span>
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/exercise/${encodeURIComponent(pr.exercise)}`}
                          className="inline-flex items-center gap-1 text-xs font-extrabold text-blue-600 dark:text-blue-400 hover:text-indigo-600 dark:hover:text-blue-300 transition"
                        >
                          <TrendingUp size={13} /> Chart →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}