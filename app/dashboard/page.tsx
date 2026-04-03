"use client";

import { useEffect, useMemo, useState } from "react";
import type { Goal, Meal, Workout } from "@/lib/types";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function DashboardPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [meals, setMeals] = useState<Meal[]>([]);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadSummary = async () => {
      setLoading(true);
      setError(null);

      try {
        const [workoutsRes, mealsRes, goalsRes] = await Promise.all([
          fetch("/api/workouts", { cache: "no-store" }),
          fetch("/api/nutrition", { cache: "no-store" }),
          fetch("/api/goals", { cache: "no-store" }),
        ]);

        const [workoutPayload, mealPayload, goalPayload] = await Promise.all([
          workoutsRes.json(),
          mealsRes.json(),
          goalsRes.json(),
        ]);

        if (!workoutsRes.ok || !mealsRes.ok || !goalsRes.ok) {
          setError(
            workoutPayload.error ?? mealPayload.error ?? goalPayload.error ?? "Unable to load dashboard summary.",
          );
          return;
        }

        setWorkouts(workoutPayload.workouts ?? []);
        setMeals(mealPayload.meals ?? []);
        setGoals(goalPayload.goals ?? []);
      } catch {
        setError("Network error while loading dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    void loadSummary();
  }, []);

  const totalWorkoutMinutes = useMemo(
    () => workouts.reduce((total, item) => total + item.duration, 0),
    [workouts],
  );

  const averageCalories = useMemo(() => {
    if (meals.length === 0) {
      return 0;
    }

    const sum = meals.reduce((total, item) => total + item.calories, 0);
    return Math.round(sum / meals.length);
  }, [meals]);

  const completedGoals = useMemo(
    () => goals.filter((goal) => goal.current_value >= goal.target_value).length,
    [goals],
  );

  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-slate-600">Welcome to your health dashboard.</p>

      {loading ? <Loader /> : null}
      {error ? <ErrorMessage message={error} /> : null}

      {!loading && !error ? (
        <div className="grid gap-4 md:grid-cols-3">
          <article className="rounded-xl border bg-white p-4">
            <h2 className="text-sm font-medium text-slate-600">Workout Sessions</h2>
            <p className="mt-2 text-3xl font-bold">{workouts.length}</p>
            <p className="mt-1 text-sm text-slate-500">{totalWorkoutMinutes} total minutes</p>
          </article>

          <article className="rounded-xl border bg-white p-4">
            <h2 className="text-sm font-medium text-slate-600">Nutrition Entries</h2>
            <p className="mt-2 text-3xl font-bold">{meals.length}</p>
            <p className="mt-1 text-sm text-slate-500">Avg {averageCalories} calories per meal</p>
          </article>

          <article className="rounded-xl border bg-white p-4">
            <h2 className="text-sm font-medium text-slate-600">Goals Completed</h2>
            <p className="mt-2 text-3xl font-bold">
              {completedGoals}/{goals.length}
            </p>
            <p className="mt-1 text-sm text-slate-500">Track your consistency weekly</p>
          </article>
        </div>
      ) : null}
    </main>
  );
}
