"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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

function CustomBuilderContent() {
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<string>("All");

  const [routineTitle, setRoutineTitle] = useState("");

  const [selectedExercises, setSelectedExercises] =
    useState<CustomRoutineExercise[]>([]);

  const [savedRoutines, setSavedRoutines] =
    useState<CustomRoutine[]>([]);

  const [activeWorkoutRoutine, setActiveWorkoutRoutine] =
    useState<CustomRoutine | null>(null);

  const [customExerciseName, setCustomExerciseName] =
    useState("");

  useEffect(() => {
    loadSavedRoutines();
  }, []);

  useEffect(() => {
    const workoutId = searchParams.get("workout");

    if (!workoutId) return;

    try {
      const stored = localStorage.getItem(
        "custom_workout_routines"
      );

      if (!stored) return;

      const routines: CustomRoutine[] =
        JSON.parse(stored);

      const found = routines.find(
        (r) => r.id === workoutId
      );

      if (found) {
        setActiveWorkoutRoutine(found);
      }
    } catch (err) {
      console.error(err);
    }
  }, [searchParams]);

  const loadSavedRoutines = () => {
    try {
      const stored = localStorage.getItem(
        "custom_workout_routines"
      );

      if (stored) {
        setSavedRoutines(JSON.parse(stored));
      }
    } catch (e) {
      console.error(
        "Failed to load custom routines",
        e
      );
    }
  };

  const categories = [
    "All",
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Legs",
    "Calves",
  ];

  const filteredExercises = MASTER_EXERCISES.filter(
    (item) => {
      const matchesCategory =
        selectedCategory === "All" ||
        item.category === selectedCategory;

      const matchesQuery =
        item.name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        item.equipment
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      return matchesCategory && matchesQuery;
    }
  );

  const addExerciseToPlan = (
    item: ExerciseItem
  ) => {
    if (
      selectedExercises.some(
        (e) => e.name === item.name
      )
    )
      return;

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

    if (
      selectedExercises.some(
        (e) =>
          e.name.toLowerCase() ===
          customExerciseName
            .trim()
            .toLowerCase()
      )
    )
      return;

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

  const removeExerciseFromPlan = (
    index: number
  ) => {
    const updated = [...selectedExercises];
    updated.splice(index, 1);
    setSelectedExercises(updated);
  };

  const updateExerciseSets = (
    index: number,
    delta: number
  ) => {
    const updated = [...selectedExercises];

    updated[index].sets = Math.max(
      1,
      Math.min(
        10,
        updated[index].sets + delta
      )
    );

    setSelectedExercises(updated);
  };

  const updateExerciseReps = (
    index: number,
    repRange: string
  ) => {
    const updated = [...selectedExercises];
    updated[index].repRange = repRange;
    setSelectedExercises(updated);
  };

  const saveCustomRoutine = () => {
    if (!routineTitle.trim()) {
      alert(
        "Please enter a workout title."
      );
      return;
    }

    if (selectedExercises.length === 0) {
      alert(
        "Please add at least one exercise."
      );
      return;
    }

    const newRoutine: CustomRoutine = {
      id: "custom_" + crypto.randomUUID(),
      title: routineTitle.trim(),
      exercises: selectedExercises,
      createdAt: new Date().toISOString(),
    };

    const updatedList = [
      newRoutine,
      ...savedRoutines,
    ];

    setSavedRoutines(updatedList);

    localStorage.setItem(
      "custom_workout_routines",
      JSON.stringify(updatedList)
    );

    setRoutineTitle("");
    setSelectedExercises([]);

    alert(
      `✅ "${newRoutine.title}" created successfully!`
    );
  };

  const deleteRoutine = (id: string) => {
    if (
      !confirm(
        "Delete this custom workout?"
      )
    )
      return;

    const updated = savedRoutines.filter(
      (r) => r.id !== id
    );

    setSavedRoutines(updated);

    localStorage.setItem(
      "custom_workout_routines",
      JSON.stringify(updated)
    );
  };

  if (activeWorkoutRoutine) {
    return (
      <div className="space-y-4">
        <button
          onClick={() =>
            setActiveWorkoutRoutine(null)
          }
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
    <div className="max-w-7xl mx-auto space-y-8 p-4 md:p-6 pb-24">
      {/* Header */}
      <header className="space-y-2">
        <div className="flex items-center space-x-2 text-blue-500 font-semibold text-sm">
          <Sparkles className="w-4 h-4" />
          <span>Routine Creator</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          Custom Plan Builder
        </h1>
        <p className="text-muted-foreground text-sm max-w-xl">
          Build tailored workout split routines, adjust sets and rep targets, or
          start saved custom sessions on the fly.
        </p>
      </header>

      {/* Builder Core Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side: Exercise Selection Database */}
        <section className="lg:col-span-7 space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search exercise or equipment..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-secondary/50 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Custom Manual Exercise Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Custom move..."
                value={customExerciseName}
                onChange={(e) => setCustomExerciseName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addCustomExercise()}
                className="w-36 pl-3 pr-2 py-2 bg-secondary/50 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addCustomExercise}
                className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors flex items-center justify-center shrink-0"
                title="Add manual custom exercise"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Muscle Category Chips */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-secondary/60 hover:bg-secondary text-muted-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Exercise List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[500px] overflow-y-auto pr-1">
            {filteredExercises.map((exercise) => {
              const isAdded = selectedExercises.some(
                (e) => e.name === exercise.name
              );

              return (
                <div
                  key={exercise.id || exercise.name}
                  className={`p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 ${
                    isAdded
                      ? "border-blue-500/50 bg-blue-500/5"
                      : "border-border/60 bg-card hover:border-border"
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-sm truncate">
                      {exercise.name}
                    </p>
                    <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                      <span className="bg-secondary px-2 py-0.5 rounded text-[10px]">
                        {exercise.category}
                      </span>
                      <span>•</span>
                      <span className="truncate">{exercise.equipment}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => addExerciseToPlan(exercise)}
                    disabled={isAdded}
                    className={`p-2 rounded-lg transition-colors shrink-0 ${
                      isAdded
                        ? "bg-emerald-500/10 text-emerald-500 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                    }`}
                  >
                    {isAdded ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Side: Routine Draft Assembly */}
        <section className="lg:col-span-5 space-y-4 bg-card border border-border p-5 rounded-2xl h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-border">
            <h2 className="font-semibold text-lg flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-500" />
              <span>Routine Draft</span>
            </h2>
            <span className="text-xs text-muted-foreground font-mono">
              {selectedExercises.length} Exercises
            </span>
          </div>

          {/* Routine Title Field */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">
              Routine Title
            </label>
            <input
              type="text"
              placeholder="e.g., Hypertrophy Arms & Abs"
              value={routineTitle}
              onChange={(e) => setRoutineTitle(e.target.value)}
              className="w-full px-3 py-2 bg-secondary/50 rounded-lg border border-border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Selected Exercises Stack */}
          <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
            {selectedExercises.length === 0 ? (
              <div className="py-12 text-center text-muted-foreground border border-dashed border-border/80 rounded-xl">
                <Dumbbell className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-xs">No exercises added yet.</p>
                <p className="text-[11px] opacity-75 mt-0.5">
                  Select items from the catalog on the left.
                </p>
              </div>
            ) : (
              selectedExercises.map((exercise, index) => (
                <div
                  key={exercise.name + index}
                  className="p-3 bg-secondary/40 rounded-xl border border-border/50 space-y-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-medium text-sm truncate">
                      {index + 1}. {exercise.name}
                    </span>
                    <button
                      onClick={() => removeExerciseFromPlan(index)}
                      className="text-muted-foreground hover:text-red-400 transition-colors p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 text-xs">
                    {/* Sets Adjustment */}
                    <div className="flex items-center gap-1.5 bg-background border border-border rounded-lg p-1">
                      <span className="text-muted-foreground px-1">Sets:</span>
                      <button
                        onClick={() => updateExerciseSets(index, -1)}
                        className="w-5 h-5 bg-secondary rounded hover:bg-secondary/80 flex items-center justify-center font-bold"
                      >
                        -
                      </button>
                      <span className="w-5 text-center font-semibold">
                        {exercise.sets}
                      </span>
                      <button
                        onClick={() => updateExerciseSets(index, 1)}
                        className="w-5 h-5 bg-secondary rounded hover:bg-secondary/80 flex items-center justify-center font-bold"
                      >
                        +
                      </button>
                    </div>

                    {/* Rep Target Range */}
                    <div className="flex-1 flex items-center gap-1.5 bg-background border border-border rounded-lg px-2 py-1">
                      <span className="text-muted-foreground shrink-0">Reps:</span>
                      <input
                        type="text"
                        value={exercise.repRange}
                        onChange={(e) =>
                          updateExerciseReps(index, e.target.value)
                        }
                        className="w-full bg-transparent focus:outline-none font-medium text-center"
                      />
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Action Button */}
          <button
            onClick={saveCustomRoutine}
            className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium text-sm rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <BookmarkPlus className="w-4 h-4" />
            <span>Save Custom Routine</span>
          </button>
        </section>
      </div>

      {/* Saved Routines Library Section */}
      {savedRoutines.length > 0 && (
        <section className="space-y-4 pt-6 border-t border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <PlayCircle className="w-5 h-5 text-blue-500" />
              <span>Saved Custom Workouts</span>
            </h2>
            <span className="text-xs text-muted-foreground">
              {savedRoutines.length} Saved
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {savedRoutines.map((routine) => (
              <div
                key={routine.id}
                className="p-4 bg-card border border-border rounded-xl space-y-3 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-base">
                      {routine.title}
                    </h3>
                    <button
                      onClick={() => deleteRoutine(routine.id)}
                      className="text-muted-foreground hover:text-red-400 p-1 transition-colors"
                      title="Delete routine"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {routine.exercises.length} Exercises • Created{" "}
                    {new Date(routine.createdAt).toLocaleDateString()}
                  </p>

                  <div className="mt-3 space-y-1">
                    {routine.exercises.slice(0, 3).map((ex, i) => (
                      <p
                        key={i}
                        className="text-xs text-muted-foreground truncate"
                      >
                        • {ex.name} ({ex.sets} × {ex.repRange})
                      </p>
                    ))}
                    {routine.exercises.length > 3 && (
                      <p className="text-[11px] text-muted-foreground/70 italic">
                        +{routine.exercises.length - 3} more...
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setActiveWorkoutRoutine(routine)}
                  className="w-full mt-2 py-2 bg-secondary hover:bg-blue-600 hover:text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Start Routine</span>
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function CustomBuilderPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-sm text-muted-foreground">Loading custom builder...</div>}>
      <CustomBuilderContent />
    </Suspense>
  );
}