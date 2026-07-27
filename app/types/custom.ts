export type Exercise = {
  name: string;
  sets: number;
  repRange: string;
};

export type CustomRoutine = {
  id: string;
  title: string;
  exercises: Exercise[];
};