"use client";

import { useEffect, useState } from "react";
import type { Workout } from "@/lib/types";
import WorkoutCard from "@/components/workouts/WorkoutCard";
import Loader from "@/components/ui/Loader";
import EmptyState from "@/components/ui/EmptyState";
import ErrorMessage from "@/components/ui/ErrorMessage";

export default function WorkoutsPage() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/workouts", { cache: "no-store" });
        const payload = (await response.json()) as {
          workouts?: Workout[];
          error?: string;
        };

        if (!response.ok) {
          setError(payload.error ?? "Unable to load workout history.");
          return;
        }

        setWorkouts(payload.workouts ?? []);
      } catch {
        setError("Network error while loading workouts.");
      } finally {
        setLoading(false);
      }
    };

    void loadWorkouts();
  }, []);

  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Workouts</h1>

      {loading ? <Loader /> : null}
      {error ? <ErrorMessage message={error} /> : null}

      {!loading && !error && workouts.length === 0 ? (
        <EmptyState
          title="No workouts yet"
          description="Log your first workout from the Add Workout page."
        />
      ) : null}

      {!loading && !error && workouts.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              exercise={workout.exercise}
              sets={workout.sets}
              reps={workout.reps}
              duration={workout.duration}
              date={new Date(workout.date).toLocaleDateString()}
            />
          ))}
        </div>
      ) : null}
    </main>
  );
}
