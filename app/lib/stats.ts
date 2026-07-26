import { loadHistory } from "./storage";

export function getDashboardStats() {
  const history = loadHistory();

  const totalSessions = history.length;
  let thisWeek = 0;

  const workoutDates: Date[] = [];

  const today = new Date();

  const firstDayOfWeek = new Date(today);
  firstDayOfWeek.setHours(0, 0, 0, 0);
  firstDayOfWeek.setDate(today.getDate() - today.getDay());

  history.forEach((workout) => {
    const date = new Date(workout.date);

    workoutDates.push(date);

    if (date >= firstDayOfWeek) {
      thisWeek++;
    }
  });

  // Remove duplicate workout days
  const uniqueDays = [...new Set(workoutDates.map((d) => d.toDateString()))];

  uniqueDays.sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime()
  );

  let streak = 0;
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  for (;;) {
    const day = current.toDateString();

    if (uniqueDays.includes(day)) {
      streak++;
      current.setDate(current.getDate() - 1);
    } else {
      break;
    }
  }

  return {
    totalSessions,
    thisWeek,
    streak,
  };
}