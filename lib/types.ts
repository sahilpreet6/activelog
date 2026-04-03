export type Workout = {
  id: string;
  user_id: string;
  exercise: string;
  sets: number;
  reps: number;
  duration: number;
  date: string;
  created_at: string;
};

export type Meal = {
  id: string;
  user_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  created_at: string;
};

export type Goal = {
  id: string;
  user_id: string;
  title: string;
  target_value: number;
  current_value: number;
  created_at: string;
};

export type Exercise = {
  id: string;
  name: string;
  bodyPart: string;
  target: string;
  equipment: string;
};
