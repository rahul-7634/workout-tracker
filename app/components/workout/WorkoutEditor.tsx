"use client";

import ExerciseCard from "./ExerciseCard";
import { ExerciseData, WorkoutData } from "../../types/workout";

type Exercise = {
  name: string;
  sets: number;
  repRange: string;
};

type WorkoutEditorProps = {
  exercises: Exercise[];
  workout: ExerciseData[];
  previousWorkout: WorkoutData | null;
  onChange: (
    exerciseIndex: number,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => void;
};

export default function WorkoutEditor({
  exercises,
  workout,
  previousWorkout,
  onChange,
}: WorkoutEditorProps) {
  return (
    <div className="space-y-6">
      {exercises.map((exercise, exerciseIndex) => (
        <ExerciseCard
          key={exercise.name}
          name={exercise.name}
          repRange={exercise.repRange}
          data={workout[exerciseIndex].sets}
          previousData={
            previousWorkout?.exercises[exerciseIndex]?.sets
          }
          onChange={(setIndex, field, value) =>
            onChange(
              exerciseIndex,
              setIndex,
              field,
              value
            )
          }
        />
      ))}
    </div>
  );
}