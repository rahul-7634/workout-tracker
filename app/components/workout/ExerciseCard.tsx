"use client";

import { SetData } from "../../types/workout";
import { PlayCircle, Target, CheckCircle2 } from "lucide-react";

type ExerciseCardProps = {
  name: string;
  repRange: string;
  data: SetData[];
  previousData?: SetData[];
  onChange: (
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => void;
};

export default function ExerciseCard({
  name,
  repRange,
  data,
  previousData,
  onChange,
}: ExerciseCardProps) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 sm:p-6 backdrop-blur-xl shadow-xl transition-all hover:border-white/20">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            {name}
          </h2>

          <div className="mt-1 flex items-center gap-2 text-xs sm:text-sm text-slate-400">
            <Target size={14} className="text-blue-400" />
            <span>Target: <strong className="text-slate-200">{data.length} sets</strong> × <strong className="text-slate-200">{repRange} reps</strong></span>
          </div>
        </div>

        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            name + " exercise tutorial form"
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-red-600/20 transition-transform active:scale-95 hover:from-red-500 hover:to-rose-500 w-fit"
        >
          <PlayCircle size={16} />
          Watch Guide
        </a>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[400px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="pb-3 text-left">Set</th>
              <th className="pb-3 text-left">Previous Best</th>
              <th className="pb-3 text-center">Weight (kg)</th>
              <th className="pb-3 text-center">Reps</th>
              <th className="pb-3 text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-white/5">
            {data.map((set, index) => {
              const isCompleted = Boolean(set.weight && set.reps);

              return (
                <tr
                  key={index}
                  className={`transition-colors ${
                    isCompleted ? "bg-blue-600/10" : "hover:bg-slate-800/40"
                  }`}
                >
                  <td className="py-3 font-bold text-slate-200">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-800 text-xs font-extrabold text-blue-400 border border-white/5">
                      {index + 1}
                    </span>
                  </td>

                  <td className="py-3 text-xs font-medium text-slate-400">
                    {previousData?.[index] ? (
                      <span className="rounded-md border border-white/5 bg-slate-800/80 px-2 py-1 text-slate-300">
                        {previousData[index].weight || "-"} kg × {previousData[index].reps || "-"}
                      </span>
                    ) : (
                      <span className="text-slate-600">-</span>
                    )}
                  </td>

                  <td className="py-3 text-center">
                    <input
                      type="number"
                      value={set.weight}
                      placeholder="0"
                      onChange={(e) =>
                        onChange(index, "weight", e.target.value)
                      }
                      className="w-20 sm:w-24 rounded-xl border border-white/15 bg-slate-950/80 p-2.5 text-center font-bold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </td>

                  <td className="py-3 text-center">
                    <input
                      type="number"
                      value={set.reps}
                      placeholder="0"
                      onChange={(e) =>
                        onChange(index, "reps", e.target.value)
                      }
                      className="w-20 sm:w-24 rounded-xl border border-white/15 bg-slate-950/80 p-2.5 text-center font-bold text-white outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
                    />
                  </td>

                  <td className="py-3 text-center">
                    {isCompleted ? (
                      <CheckCircle2 className="mx-auto h-5 w-5 text-emerald-400" />
                    ) : (
                      <div className="mx-auto h-3 w-3 rounded-full bg-slate-700" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}