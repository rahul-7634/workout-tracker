export type SetData = {
  weight: string;
  reps: string;
};

export type ExerciseData = {
  name: string;
  sets: SetData[];
};

export type WorkoutData = {
  id: string;
  type: string;
  date: string;
  workout: string;
  exercises: ExerciseData[];
};