import { WorkoutData } from "../types/workout";

export type PersonalRecord = {
  exercise: string;
  weight: number;
  reps: number;
};

const STORAGE_KEY = "personalRecords";

export function loadPRs(): PersonalRecord[] {
  if (typeof window === "undefined") return [];

  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function savePRs(records: PersonalRecord[]) {
  if (typeof window === "undefined") return;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

export function updatePR(
  exercise: string,
  weight: string,
  reps: string
): boolean {
  const w = Number(weight);
  const r = Number(reps);

  if (!w || !r) return false;

  const prs = loadPRs();

  const index = prs.findIndex(
    (item) => item.exercise === exercise
  );

  if (index === -1) {
    prs.push({
      exercise,
      weight: w,
      reps: r,
    });

    savePRs(prs);
    return true;
  }

  const current = prs[index];

  const better =
    w > current.weight ||
    (w === current.weight && r > current.reps);

  if (better) {
    prs[index] = {
      exercise,
      weight: w,
      reps: r,
    };

    savePRs(prs);
    return true;
  }

  return false;
}

export function rebuildPRs(history: WorkoutData[]) {
  const prs: PersonalRecord[] = [];

  history.forEach((workout) => {
    workout.exercises.forEach((exercise) => {
      exercise.sets.forEach((set) => {
        const weight = Number(set.weight);
        const reps = Number(set.reps);

        if (!weight || !reps) return;

        const index = prs.findIndex(
          (p) => p.exercise === exercise.name
        );

        if (index === -1) {
          prs.push({
            exercise: exercise.name,
            weight,
            reps,
          });
        } else {
          const current = prs[index];

          if (
            weight > current.weight ||
            (weight === current.weight &&
              reps > current.reps)
          ) {
            prs[index] = {
              exercise: exercise.name,
              weight,
              reps,
            };
          }
        }
      });
    });
  });

  savePRs(prs);
}