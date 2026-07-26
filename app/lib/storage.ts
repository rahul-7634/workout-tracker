import { WorkoutData } from "../types/workout";

const STORAGE_KEY = "workoutHistory";

export function loadHistory(): WorkoutData[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return [];
  }

  try {
    return JSON.parse(saved);
  } catch {
    return [];
  }
}

export function saveHistory(history: WorkoutData[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
}

export function addWorkout(workout: WorkoutData) {
  const history = loadHistory();

  history.unshift(workout);

  saveHistory(history);
}

export function updateWorkout(updatedWorkout: WorkoutData) {
  const history = loadHistory();

  const updatedHistory = history.map((workout) =>
    workout.id === updatedWorkout.id ? updatedWorkout : workout
  );

  saveHistory(updatedHistory);
}

export function deleteWorkout(id: string) {
  const history = loadHistory();

  const updatedHistory = history.filter(
    (workout) => workout.id !== id
  );

  saveHistory(updatedHistory);
}

export function clearHistory() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("personalRecords");
}

/**
 * Returns the latest workout of the requested type.
 * Example:
 * loadWorkout("pullA")
 * loadWorkout("pushB")
 */
export function loadWorkout(storageKey: string): WorkoutData | null {
  const history = loadHistory();

  return (
    history.find((workout) => workout.type === storageKey) ?? null
  );
}