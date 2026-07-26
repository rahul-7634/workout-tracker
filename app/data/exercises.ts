export type ExerciseItem = {
  id: string;
  name: string;
  category: "Chest" | "Back" | "Shoulders" | "Biceps" | "Triceps" | "Legs" | "Calves";
  defaultSets: number;
  defaultRepRange: string;
  equipment: string;
};

export const MASTER_EXERCISES: ExerciseItem[] = [
  // Chest
  { id: "c1", name: "Smith Machine Incline Press", category: "Chest", defaultSets: 4, defaultRepRange: "6–8", equipment: "Smith Machine" },
  { id: "c2", name: "Flat Smith Machine Press", category: "Chest", defaultSets: 4, defaultRepRange: "6–8", equipment: "Smith Machine" },
  { id: "c3", name: "Low-to-High Cable Fly", category: "Chest", defaultSets: 3, defaultRepRange: "12–15", equipment: "Cable" },
  { id: "c4", name: "Pec Deck Fly", category: "Chest", defaultSets: 3, defaultRepRange: "10–12", equipment: "Machine" },
  { id: "c5", name: "Incline Dumbbell Press", category: "Chest", defaultSets: 4, defaultRepRange: "8–10", equipment: "Dumbbells" },
  { id: "c6", name: "Barbell Bench Press", category: "Chest", defaultSets: 4, defaultRepRange: "5–8", equipment: "Barbell" },

  // Shoulders
  { id: "s1", name: "Seated Dumbbell Shoulder Press", category: "Shoulders", defaultSets: 3, defaultRepRange: "8–10", equipment: "Dumbbells" },
  { id: "s2", name: "Machine Shoulder Press", category: "Shoulders", defaultSets: 3, defaultRepRange: "8–10", equipment: "Machine" },
  { id: "s3", name: "Cable Lateral Raise", category: "Shoulders", defaultSets: 4, defaultRepRange: "12–15", equipment: "Cable" },
  { id: "s4", name: "Reverse Pec Deck", category: "Shoulders", defaultSets: 3, defaultRepRange: "12–15", equipment: "Machine" },
  { id: "s5", name: "Face Pull", category: "Shoulders", defaultSets: 3, defaultRepRange: "12–15", equipment: "Cable" },

  // Back / Lats
  { id: "b1", name: "Weighted Pull-Up / Wide Lat Pulldown", category: "Back", defaultSets: 4, defaultRepRange: "6–8", equipment: "Cable / Bodyweight" },
  { id: "b2", name: "Chest-Supported Row", category: "Back", defaultSets: 3, defaultRepRange: "8–10", equipment: "Machine / Bench" },
  { id: "b3", name: "Single-Arm Cable Lat Pulldown", category: "Back", defaultSets: 3, defaultRepRange: "10–12", equipment: "Cable" },
  { id: "b4", name: "Straight-Arm Cable Pulldown", category: "Back", defaultSets: 2, defaultRepRange: "12–15", equipment: "Cable" },
  { id: "b5", name: "Neutral-Grip Lat Pulldown", category: "Back", defaultSets: 4, defaultRepRange: "8–10", equipment: "Cable" },
  { id: "b6", name: "Chest-Supported T-Bar Row", category: "Back", defaultSets: 3, defaultRepRange: "8–10", equipment: "T-Bar" },
  { id: "b7", name: "Single-Arm Dumbbell Row", category: "Back", defaultSets: 3, defaultRepRange: "10–12", equipment: "Dumbbell" },

  // Triceps
  { id: "t1", name: "Overhead Cable Triceps Extension", category: "Triceps", defaultSets: 3, defaultRepRange: "10–12", equipment: "Cable" },
  { id: "t2", name: "Rope Pushdown", category: "Triceps", defaultSets: 2, defaultRepRange: "12–15", equipment: "Cable" },
  { id: "t3", name: "Skull Crushers", category: "Triceps", defaultSets: 3, defaultRepRange: "8–10", equipment: "EZ-Bar" },
  { id: "t4", name: "Single-Arm Cable Pushdown", category: "Triceps", defaultSets: 2, defaultRepRange: "12–15", equipment: "Cable" },

  // Biceps
  { id: "bi1", name: "Incline Dumbbell Curl", category: "Biceps", defaultSets: 3, defaultRepRange: "8–10", equipment: "Dumbbells" },
  { id: "bi2", name: "Hammer Curl", category: "Biceps", defaultSets: 2, defaultRepRange: "10–12", equipment: "Dumbbells" },
  { id: "bi3", name: "EZ-Bar Curl", category: "Biceps", defaultSets: 3, defaultRepRange: "8–10", equipment: "EZ-Bar" },
  { id: "bi4", name: "Cable Curl", category: "Biceps", defaultSets: 2, defaultRepRange: "12–15", equipment: "Cable" },

  // Legs & Calves
  { id: "l1", name: "Romanian Deadlift", category: "Legs", defaultSets: 4, defaultRepRange: "8–10", equipment: "Barbell / Dumbbells" },
  { id: "l2", name: "Leg Press", category: "Legs", defaultSets: 3, defaultRepRange: "8–10", equipment: "Machine" },
  { id: "l3", name: "Seated Leg Curl", category: "Legs", defaultSets: 3, defaultRepRange: "10–12", equipment: "Machine" },
  { id: "l4", name: "Walking Lunges", category: "Legs", defaultSets: 2, defaultRepRange: "10–12 / leg", equipment: "Dumbbells" },
  { id: "l5", name: "Hack Squat", category: "Legs", defaultSets: 4, defaultRepRange: "6–8", equipment: "Machine" },
  { id: "l6", name: "Bulgarian Split Squat", category: "Legs", defaultSets: 3, defaultRepRange: "8–10 / leg", equipment: "Dumbbells" },
  { id: "l7", name: "Leg Extension", category: "Legs", defaultSets: 3, defaultRepRange: "12–15", equipment: "Machine" },
  { id: "l8", name: "Lying Leg Curl", category: "Legs", defaultSets: 3, defaultRepRange: "10–12", equipment: "Machine" },
  { id: "c_1", name: "Standing Calf Raise", category: "Calves", defaultSets: 4, defaultRepRange: "12–15", equipment: "Machine" },
  { id: "c_2", name: "Seated Calf Raise", category: "Calves", defaultSets: 4, defaultRepRange: "12–15", equipment: "Machine" },
];
