import WorkoutPage from "../components/workout/WorkoutPage";
import legsB from "../data/workouts/legsB";

export default function LegsBPage() {
  return (
    <WorkoutPage
      workoutName="Legs B"
      storageKey="legsB"
      exercises={legsB}
    />
  );
}