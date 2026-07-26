"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Calendar, Dumbbell, Package, TrendingUp } from "lucide-react";
import { loadHistory } from "../../lib/storage";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

export default function ExerciseHistoryPage({ params }: Props) {
  const router = useRouter();
  const { name } = use(params);
  const exerciseName = decodeURIComponent(name);
  const history = loadHistory();

  const exerciseHistory = history
    .flatMap((workout) =>
      workout.exercises
        .filter((exercise) => exercise.name === exerciseName)
        .map((exercise) => ({
          workoutName: workout.workout,
          date: workout.date,
          sets: exercise.sets,
        }))
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
    );

  let bestWeight = 0;
  let bestReps = 0;
  let totalSets = 0;
  let totalVolume = 0;

  const chartData = exerciseHistory.map((entry) => {
    let maxWeight = 0;

    entry.sets.forEach((set) => {
      const weight = Number(set.weight);
      const reps = Number(set.reps);

      if (!weight || !reps) return;

      totalSets++;
      totalVolume += weight * reps;

      if (
        weight > bestWeight ||
        (weight === bestWeight && reps > bestReps)
      ) {
        bestWeight = weight;
        bestReps = reps;
      }

      if (weight > maxWeight) {
        maxWeight = weight;
      }
    });

    return {
      date: new Date(entry.date).toLocaleDateString([], { month: "short", day: "numeric" }),
      weight: maxWeight,
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 mb-3 transition"
        >
          <ArrowLeft size={14} /> Back
        </button>

        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
          <Dumbbell className="text-blue-400" /> {exerciseName}
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Historical weight progression and set performance metrics.
        </p>
      </div>

      {exerciseHistory.length > 0 && (
        <>
          {/* Exercise Stats Bar */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400">
                <Trophy size={16} /> Personal Record
              </div>
              <p className="mt-2 text-2xl font-black text-white">
                {bestWeight} kg × {bestReps}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
                <Calendar size={16} /> Sessions Logged
              </div>
              <p className="mt-2 text-2xl font-black text-white">
                {exerciseHistory.length}
              </p>
            </div>

            <div className="rounded-2xl border border-purple-500/30 bg-purple-500/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                <Dumbbell size={16} /> Total Sets
              </div>
              <p className="mt-2 text-2xl font-black text-white">
                {totalSets}
              </p>
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 backdrop-blur-xl">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <Package size={16} /> Total Volume
              </div>
              <p className="mt-2 text-2xl font-black text-white">
                {totalVolume.toLocaleString()} kg
              </p>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-xl">
            <h2 className="mb-6 text-xl font-black text-white flex items-center gap-2">
              <TrendingUp className="text-blue-400" /> Weight Progression Chart (kg)
            </h2>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.08)" />
                  <XAxis dataKey="date" stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#94a3b8" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "rgba(15, 23, 42, 0.95)",
                      borderColor: "rgba(255, 255, 255, 0.2)",
                      borderRadius: "16px",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="weight"
                    stroke="#60a5fa"
                    strokeWidth={3}
                    dot={{ r: 6, fill: "#3b82f6", stroke: "#fff", strokeWidth: 2 }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* History Log List */}
      {exerciseHistory.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-12 text-center backdrop-blur-xl">
          <p className="text-slate-400">No recorded history found for {exerciseName}.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-black text-white">History Logs</h2>

          {exerciseHistory.map((entry, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl shadow-md space-y-3"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-blue-400">{entry.workoutName}</h3>
                <span className="text-xs text-slate-400">
                  {new Date(entry.date).toLocaleString()}
                </span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[300px] border-collapse text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      <th className="pb-2 text-left">Set</th>
                      <th className="pb-2 text-center">Weight</th>
                      <th className="pb-2 text-center">Reps</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {entry.sets.map((set, setIndex) => (
                      <tr key={setIndex}>
                        <td className="py-2.5 font-bold text-slate-300">Set {setIndex + 1}</td>
                        <td className="py-2.5 text-center font-extrabold text-white">{set.weight} kg</td>
                        <td className="py-2.5 text-center font-extrabold text-blue-300">{set.reps} reps</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}