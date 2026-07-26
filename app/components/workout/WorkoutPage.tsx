"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Dumbbell, Sparkles, Trophy } from "lucide-react";
import WorkoutEditor from "./WorkoutEditor";
import { loadWorkout, addWorkout } from "../../lib/storage";
import { updatePR } from "../../lib/pr";

type Exercise = {
  name: string;
  sets: number;
  repRange: string;
};

type WorkoutPageProps = {
  workoutName: string;
  storageKey: string;
  exercises: Exercise[];
};

export default function WorkoutPage({
  workoutName,
  storageKey,
  exercises,
}: WorkoutPageProps) {
  const [workout, setWorkout] = useState(
    exercises.map((exercise) => ({
      name: exercise.name,
      sets: Array.from({ length: exercise.sets }, () => ({
        weight: "",
        reps: "",
      })),
    }))
  );

  const [savedSuccess, setSavedSuccess] = useState<string | null>(null);

  const previousWorkout =
    typeof window !== "undefined" ? loadWorkout(storageKey) : null;

  function updateSet(
    exerciseIndex: number,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) {
    const updatedWorkout = [...workout];
    updatedWorkout[exerciseIndex].sets[setIndex][field] = value;
    setWorkout(updatedWorkout);
  }

  function finishWorkout() {
    let newPRs = 0;

    workout.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        if (set.weight && set.reps) {
          if (updatePR(exercise.name, set.weight, set.reps)) {
            newPRs++;
          }
        }
      });
    });

    addWorkout({
      id: crypto.randomUUID(),
      type: storageKey,
      workout: workoutName,
      date: new Date().toISOString(),
      exercises: workout,
    });

    const msg =
      newPRs > 0
        ? `🏆 Amazing! ${newPRs} New Personal Record${newPRs > 1 ? "s" : ""} set!`
        : `✅ Workout saved successfully! Great effort!`;

    setSavedSuccess(msg);

    setTimeout(() => {
      setSavedSuccess(null);
    }, 4000);
  }

  // Calculate completed sets
  let totalSetsCount = 0;
  let completedSetsCount = 0;

  workout.forEach((ex) => {
    ex.sets.forEach((s) => {
      totalSetsCount++;
      if (s.weight && s.reps) completedSetsCount++;
    });
  });

  const progressPercent = totalSetsCount > 0 ? Math.round((completedSetsCount / totalSetsCount) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Top Header & Back Button */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-blue-400 hover:text-blue-300 mb-2 transition"
          >
            <ArrowLeft size={14} /> Back to Programs
          </Link>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
            <Dumbbell className="text-blue-400" /> {workoutName}
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Log your sets below. Your performance will automatically track towards personal records.
          </p>
        </div>

        {/* Action Button */}
        <button
          onClick={finishWorkout}
          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-6 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-emerald-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <CheckCircle size={18} /> Finish Workout
        </button>
      </div>

      {/* Progress Bar Header Card */}
      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Workout Progress
            </div>
            <div className="text-sm font-bold text-white">
              {completedSetsCount} of {totalSetsCount} Sets Completed ({progressPercent}%)
            </div>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full sm:w-64 h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Success Notification Banner */}
      {savedSuccess && (
        <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/15 p-4 text-emerald-300 font-bold backdrop-blur-xl flex items-center justify-between animate-in fade-in slide-in-from-top-4">
          <span className="flex items-center gap-2">
            <Trophy className="text-amber-400" size={20} /> {savedSuccess}
          </span>
          <Link
            href="/history"
            className="text-xs underline hover:text-white"
          >
            View History →
          </Link>
        </div>
      )}

      {/* Exercises List */}
      <WorkoutEditor
        exercises={exercises}
        workout={workout}
        previousWorkout={previousWorkout}
        onChange={updateSet}
      />

      {/* Bottom Save Bar */}
      <div className="pt-4 flex justify-end">
        <button
          onClick={finishWorkout}
          className="inline-flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 px-8 py-4 text-base font-extrabold text-slate-950 shadow-2xl shadow-emerald-500/25 transition-all hover:scale-105 active:scale-95"
        >
          <CheckCircle size={20} /> Finish & Complete Session
        </button>
      </div>
    </div>
  );
}