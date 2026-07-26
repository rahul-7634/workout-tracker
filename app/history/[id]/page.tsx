"use client";

import { use } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Dumbbell, ExternalLink } from "lucide-react";
import { loadHistory } from "../../lib/storage";

type Props = {
  params: Promise<{ id: string }>;
};

export default function WorkoutDetailsPage({ params }: Props) {
  const { id } = use(params);
  const history = loadHistory();
  const workout = history.find((w) => w.id === id);

  if (!workout) {
    return (
      <div className="rounded-3xl border border-dashed border-slate-300 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 p-12 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Session Not Found</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">This workout log may have been deleted.</p>
        <Link
          href="/history"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-blue-500 transition"
        >
          ← Back to History
        </Link>
      </div>
    );
  }

  const dateFormatted = new Date(workout.date).toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="space-y-8">
      {/* ─── Page Header ─── */}
      <div className="border-b border-slate-200/80 dark:border-white/10 pb-6">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 mb-3 transition"
        >
          <ArrowLeft size={14} /> Back to History Logs
        </Link>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-3 mt-1">
          <Dumbbell className="text-blue-600 dark:text-blue-400" /> {workout.workout}
        </h1>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 font-medium flex items-center gap-2">
          <Calendar size={14} className="text-slate-400" /> {dateFormatted}
        </p>
      </div>

      {/* ─── Exercise Log Cards ─── */}
      <div className="space-y-5">
        {workout.exercises.map((exercise) => (
          <div
            key={exercise.name}
            className="rounded-3xl border border-slate-200/80 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-6 backdrop-blur-xl shadow-md space-y-5"
          >
            <div className="flex items-center justify-between">
              <Link
                href={`/exercise/${encodeURIComponent(exercise.name)}`}
                className="group inline-flex items-center gap-2 text-xl font-black text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
              >
                {exercise.name}
                <ExternalLink size={15} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>

              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {exercise.sets.length} Sets
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[280px]">
                <thead>
                  <tr className="border-b border-slate-100 dark:border-white/10 text-xs font-extrabold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    <th className="pb-3 text-left">Set</th>
                    <th className="pb-3 text-center">Weight</th>
                    <th className="pb-3 text-center">Reps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {exercise.sets.map((set, index) => (
                    <tr key={index} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 text-sm font-bold text-slate-700 dark:text-slate-300">
                        Set {index + 1}
                      </td>
                      <td className="py-3 text-center text-sm font-extrabold text-slate-900 dark:text-white">
                        {set.weight ? `${set.weight} kg` : <span className="text-slate-400">—</span>}
                      </td>
                      <td className="py-3 text-center text-sm font-extrabold text-blue-600 dark:text-blue-300">
                        {set.reps ? `${set.reps} reps` : <span className="text-slate-400">—</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}