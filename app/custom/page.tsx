"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  Plus,
  Trash2,
  Check,
  Search,
  Dumbbell,
  Play,
  ArrowRight,
  SlidersHorizontal,
  BookmarkPlus,
  PlayCircle,
} from "lucide-react";
import { MASTER_EXERCISES, ExerciseItem } from "../data/exercises";
import WorkoutPage from "../components/workout/WorkoutPage";

export type CustomRoutineExercise = {
  name: string;
  sets: number;
  repRange: string;
};

export type CustomRoutine = {
  id: string;
  title: string;
  exercises: CustomRoutineExercise[];
  createdAt: string;
};

export default function CustomBuilderPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [routineTitle, setRoutineTitle] = useState("");
  const [selectedExercises, setSelectedExercises] = useState<CustomRoutineExercise[]>([]);
  const [savedRoutines, setSavedRoutines] = useState<CustomRoutine[]>([]);
  const [activeWorkoutRoutine, setActiveWorkoutRoutine] = useState<CustomRoutine | null>(null);
  const [customExerciseName, setCustomExerciseName] = useState("");

  useEffect(() => {
    loadSavedRoutines();
  }, []);

  const loadSavedRoutines = () => {
    try {
      const stored = localStorage.getItem("custom_workout_routines");
      if (stored) {
        setSavedRoutines(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to load custom routines", e);
    }
  };

  const categories = ["All", "Chest", "Back", "Shoulders", "Biceps", "Triceps", "Legs", "Calves"];

  const filteredExercises = MASTER_EXERCISES.filter((item) => {
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    const matchesQuery = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.equipment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  const addExerciseToPlan = (item: ExerciseItem) => {
    if (selectedExercises.some((e) => e.name === item.name)) return;

    setSelectedExercises([
      ...selectedExercises,
      {
        name: item.name,
        sets: item.defaultSets,
        repRange: item.defaultRepRange,
      },
    ]);
  };

  const addCustomExercise = () => {
    if (!customExerciseName.trim()) return;
    if (selectedExercises.some((e) => e.name.toLowerCase() === customExerciseName.trim().toLowerCase())) return;

    setSelectedExercises([
      ...selectedExercises,
      {
        name: customExerciseName.trim(),
        sets: 3,
        repRange: "8–12",
      },
    ]);
    setCustomExerciseName("");
  };

  const removeExerciseFromPlan = (index: number) => {
    const updated = [...selectedExercises];
    updated.splice(index, 1);
    setSelectedExercises(updated);
  };

  const updateExerciseSets = (index: number, delta: number) => {
    const updated = [...selectedExercises];
    const newSets = Math.max(1, Math.min(10, updated[index].sets + delta));
    updated[index].sets = newSets;
    setSelectedExercises(updated);
  };

  const updateExerciseReps = (index: number, repRange: string) => {
    const updated = [...selectedExercises];
    updated[index].repRange = repRange;
    setSelectedExercises(updated);
  };

  const saveCustomRoutine = () => {
    if (!routineTitle.trim()) {
      alert("Please enter a title for your custom workout routine.");
      return;
    }
    if (selectedExercises.length === 0) {
      alert("Please select at least 1 exercise for your routine.");
      return;
    }

    const newRoutine: CustomRoutine = {
      id: "custom_" + crypto.randomUUID(),
      title: routineTitle.trim(),
      exercises: selectedExercises,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [newRoutine, ...savedRoutines];
    setSavedRoutines(updatedList);
    localStorage.setItem("custom_workout_routines", JSON.stringify(updatedList));

    // Reset draft
    setRoutineTitle("");
    setSelectedExercises([]);
    alert(`✅ "${newRoutine.title}" created successfully!`);
  };

  const deleteRoutine = (id: string) => {
    if (!confirm("Delete this custom workout routine?")) return;
    const updatedList = savedRoutines.filter((r) => r.id !== id);
    setSavedRoutines(updatedList);
    localStorage.setItem("custom_workout_routines", JSON.stringify(updatedList));
  };

  // If a custom workout routine is launched to log:
  if (activeWorkoutRoutine) {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveWorkoutRoutine(null)}
          className="text-xs font-bold text-blue-400 hover:underline"
        >
          ← Back to Custom Plan Builder
        </button>

        <WorkoutPage
          workoutName={activeWorkoutRoutine.title}
          storageKey={activeWorkoutRoutine.id}
          exercises={activeWorkoutRoutine.exercises}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
          <BookmarkPlus size={14} />
          <span>Custom Program Creator</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Custom Workout Builder
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Choose exercises from the master database to construct your own custom training split.
        </p>
      </div>

      {/* Main Grid: Left = Exercise Database & Filters, Right = Active Plan Draft */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-12">
        {/* Left Column: Master Exercise Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Search & Category Filter */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 backdrop-blur-xl space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exercises by name or equipment (e.g. Cable, Smith, Dumbbell)..."
                className="w-full rounded-2xl border border-white/10 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-xl px-3 py-1.5 text-xs font-bold transition whitespace-nowrap ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-slate-950/60 border border-white/5 text-slate-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Add Custom Exercise Input */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-4 backdrop-blur-md flex items-center gap-3">
            <input
              type="text"
              value={customExerciseName}
              onChange={(e) => setCustomExerciseName(e.target.value)}
              placeholder="Or type a custom exercise name..."
              className="flex-1 rounded-xl border border-white/10 bg-slate-950/60 p-2.5 text-xs text-white outline-none focus:border-blue-500 transition"
            />
            <button
              onClick={addCustomExercise}
              className="inline-flex items-center gap-1.5 rounded-xl bg-blue-600/20 border border-blue-500/40 px-4 py-2.5 text-xs font-extrabold text-blue-300 hover:bg-blue-600 hover:text-white transition"
            >
              <Plus size={16} /> Add Custom
            </button>
          </div>

          {/* Exercise Database Grid */}
          <div className="space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {filteredExercises.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/30 p-8 text-center text-slate-400 text-sm">
                No exercises found matching "{searchQuery}".
              </div>
            ) : (
              filteredExercises.map((item) => {
                const isSelected = selectedExercises.some((e) => e.name === item.name);

                return (
                  <div
                    key={item.id}
                    className={`flex items-center justify-between rounded-2xl border p-4 backdrop-blur-xl transition-all ${
                      isSelected
                        ? "border-emerald-500/40 bg-emerald-500/10 opacity-90"
                        : "border-white/10 bg-slate-900/60 hover:border-white/20"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-base font-bold text-white">{item.name}</h4>
                        <span className="rounded-md border border-white/10 bg-slate-950 px-2 py-0.5 text-[10px] font-semibold text-slate-400">
                          {item.category}
                        </span>
                      </div>

                      <div className="mt-1 text-xs text-slate-400">
                        Equipment: <span className="text-slate-300">{item.equipment}</span> • Suggested: {item.defaultSets} × {item.defaultRepRange}
                      </div>
                    </div>

                    <button
                      onClick={() => addExerciseToPlan(item)}
                      disabled={isSelected}
                      className={`inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
                        isSelected
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default"
                          : "bg-blue-600 text-white shadow-md hover:bg-blue-500 active:scale-95"
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check size={14} /> Added
                        </>
                      ) : (
                        <>
                          <Plus size={14} /> Add To Plan
                        </>
                      )}
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Custom Plan Draft Builder Card (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="sticky top-6 rounded-3xl border border-white/15 bg-slate-900/80 p-6 backdrop-blur-2xl shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <SlidersHorizontal className="text-blue-400" size={18} /> Plan Builder Draft
              </h3>
              <span className="text-xs font-bold text-blue-300 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30">
                {selectedExercises.length} Exercises
              </span>
            </div>

            {/* Routine Title Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
                Workout Program Title
              </label>
              <input
                type="text"
                value={routineTitle}
                onChange={(e) => setRoutineTitle(e.target.value)}
                placeholder="e.g. Heavy Upper Body Power"
                className="w-full rounded-2xl border border-white/15 bg-slate-950/90 py-2.5 px-4 text-sm font-bold text-white outline-none focus:border-blue-500 transition"
              />
            </div>

            {/* Selected Exercises Draft List */}
            <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
              {selectedExercises.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/15 p-8 text-center text-xs text-slate-400">
                  Select exercises from the library on the left to build your custom routine.
                </div>
              ) : (
                selectedExercises.map((ex, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-white/10 bg-slate-950/80 p-3.5 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white flex items-center gap-2">
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-blue-600/30 text-[10px] text-blue-300">
                          {idx + 1}
                        </span>
                        {ex.name}
                      </span>
                      <button
                        onClick={() => removeExerciseFromPlan(idx)}
                        className="text-slate-500 hover:text-red-400 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1 border-t border-white/5">
                      {/* Sets stepper */}
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400">Sets:</span>
                        <div className="flex items-center rounded-lg border border-white/10 bg-slate-900">
                          <button
                            onClick={() => updateExerciseSets(idx, -1)}
                            className="px-2 py-0.5 text-slate-300 hover:bg-slate-800 rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="px-2 font-bold text-white">{ex.sets}</span>
                          <button
                            onClick={() => updateExerciseSets(idx, 1)}
                            className="px-2 py-0.5 text-slate-300 hover:bg-slate-800 rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Rep range selector */}
                      <div className="flex items-center gap-1.5">
                        <span className="text-slate-400">Reps:</span>
                        <select
                          value={ex.repRange}
                          onChange={(e) => updateExerciseReps(idx, e.target.value)}
                          className="rounded-lg border border-white/10 bg-slate-900 p-1 text-xs text-white outline-none"
                        >
                          <option value="6–8">6–8 reps</option>
                          <option value="8–10">8–10 reps</option>
                          <option value="10–12">10–12 reps</option>
                          <option value="12–15">12–15 reps</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Save Routine Button */}
            <button
              onClick={saveCustomRoutine}
              disabled={selectedExercises.length === 0}
              className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 py-3.5 text-sm font-extrabold text-slate-950 shadow-xl shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 disabled:opacity-50 transition"
            >
              <Sparkles size={18} /> Save Custom Workout Plan
            </button>
          </div>
        </div>
      </div>

      {/* Saved Custom Workout Plans Gallery */}
      <div className="space-y-4 pt-6 border-t border-white/10">
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          <Dumbbell className="text-blue-400" /> Your Saved Custom Routines ({savedRoutines.length})
        </h2>

        {savedRoutines.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-slate-900/40 p-8 text-center text-sm text-slate-400">
            No custom workout routines saved yet. Build your first routine above!
          </div>
        ) : (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {savedRoutines.map((routine) => (
              <div
                key={routine.id}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/60 p-6 backdrop-blur-xl transition-all hover:border-blue-500/40 hover:shadow-xl space-y-4"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white group-hover:text-blue-300 transition">
                      {routine.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {routine.exercises.length} Exercises Configured
                    </p>
                  </div>

                  <button
                    onClick={() => deleteRoutine(routine.id)}
                    className="text-slate-500 hover:text-red-400 transition"
                    title="Delete Custom Plan"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>

                {/* Exercises Preview */}
                <div className="space-y-1.5">
                  {routine.exercises.slice(0, 4).map((ex, idx) => (
                    <div key={idx} className="flex items-center justify-between text-xs text-slate-300">
                      <span className="truncate max-w-[200px]">• {ex.name}</span>
                      <span className="text-[10px] text-slate-400 font-semibold">{ex.sets} × {ex.repRange}</span>
                    </div>
                  ))}
                  {routine.exercises.length > 4 && (
                    <div className="text-[10px] text-blue-400 font-bold">
                      + {routine.exercises.length - 4} more exercises...
                    </div>
                  )}
                </div>

                {/* Start Workout Action Button */}
                <button
                  onClick={() => setActiveWorkoutRoutine(routine)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-xs font-extrabold text-white hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
                >
                  <PlayCircle size={16} /> Start Custom Workout Session
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
