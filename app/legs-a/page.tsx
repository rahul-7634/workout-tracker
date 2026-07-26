import WorkoutPage from "../components/workout/WorkoutPage";
import legsA from "../data/workouts/legsA";

export default function LegsAPage() {
  return (
    <WorkoutPage
      workoutName="Legs A"
      storageKey="legsA"
      exercises={legsA}
    />
  );
}