import WorkoutPage from "../components/workout/WorkoutPage";
import pushA from "../data/workouts/pushA";

export default function PushAPage() {
  return (
    <WorkoutPage
      workoutName="Push A"
      storageKey="pushA"
      exercises={pushA}
    />
  );
}