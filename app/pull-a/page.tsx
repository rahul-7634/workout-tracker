import WorkoutPage from "../components/workout/WorkoutPage";
import pullA from "../data/workouts/pullA";

export default function PullAPage() {
  return (
    <WorkoutPage
      workoutName="Pull A"
      storageKey="pullA"
      exercises={pullA}
    />
  );
}