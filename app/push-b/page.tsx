import WorkoutPage from "../components/workout/WorkoutPage";
import pushB from "../data/workouts/pushB";

export default function PushBPage() {
  return (
    <WorkoutPage
      workoutName="Push B"
      storageKey="pushB"
      exercises={pushB}
    />
  );
}