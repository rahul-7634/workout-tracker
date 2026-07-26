import WorkoutPage from "../components/workout/WorkoutPage";
import pullB from "../data/workouts/pullB";

export default function PullBPage() {
  return (
    <WorkoutPage
      workoutName="Pull B"
      storageKey="pullB"
      exercises={pullB}
    />
  );
}