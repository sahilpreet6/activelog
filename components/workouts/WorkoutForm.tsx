"use client";

import { useState } from "react";
import type { Exercise } from "@/lib/types";

type WorkoutFormState = {
  exercise: string;
  sets: string;
  reps: string;
  duration: string;
};

const initialState: WorkoutFormState = {
  exercise: "",
  sets: "",
  reps: "",
  duration: "",
};

export default function WorkoutForm() {
  const [form, setForm] = useState<WorkoutFormState>(initialState);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [exerciseResults, setExerciseResults] = useState<Exercise[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage("Saving...");

    try {
      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          exercise: form.exercise,
          sets: Number(form.sets),
          reps: Number(form.reps),
          duration: Number(form.duration),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (response.ok) {
        setMessage("Workout saved successfully.");
        setForm(initialState);
      } else {
        setError(data.error ?? "Something went wrong.");
        setMessage(null);
      }
    } catch {
      setError("Network error. Please try again.");
      setMessage(null);
    } finally {
      setLoading(false);
    }
  };

  const handleExerciseSearch = async () => {
    const query = searchTerm.trim();
    if (!query) {
      setExerciseResults([]);
      return;
    }

    setSearchLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/exercises?query=${encodeURIComponent(query)}`);
      const payload = (await response.json()) as {
        exercises?: Exercise[];
        error?: string;
      };

      if (!response.ok) {
        setError(payload.error ?? "Unable to search exercises.");
        setExerciseResults([]);
      } else {
        setExerciseResults(payload.exercises ?? []);
      }
    } catch {
      setError("Network error while searching exercises.");
      setExerciseResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
      <div className="space-y-2 rounded-lg border bg-white p-3">
        <p className="text-sm font-medium">Search ExerciseDB</p>
        <div className="flex gap-2">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercise name"
            className="w-full rounded-lg border px-3 py-2"
          />
          <button
            type="button"
            onClick={handleExerciseSearch}
            disabled={searchLoading}
            className="rounded-lg border px-3 py-2 text-sm disabled:opacity-60"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {exerciseResults.length > 0 ? (
          <ul className="max-h-36 space-y-2 overflow-auto text-sm">
            {exerciseResults.map((exercise) => (
              <li key={exercise.id}>
                <button
                  type="button"
                  className="w-full rounded-md border px-3 py-2 text-left hover:bg-slate-50"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, exercise: exercise.name }));
                    setSearchTerm(exercise.name);
                  }}
                >
                  <p className="font-medium capitalize">{exercise.name}</p>
                  <p className="text-xs text-slate-600">
                    {exercise.bodyPart} · {exercise.target} · {exercise.equipment}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <input
        name="exercise"
        placeholder="Exercise name"
        value={form.exercise}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />
      <input
        name="sets"
        type="number"
        min={1}
        placeholder="Sets"
        value={form.sets}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />
      <input
        name="reps"
        type="number"
        min={1}
        placeholder="Reps"
        value={form.reps}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />
      <input
        name="duration"
        type="number"
        min={1}
        placeholder="Duration (minutes)"
        value={form.duration}
        onChange={handleChange}
        className="w-full rounded-lg border px-4 py-2"
        required
      />
      <button type="submit" className="rounded-lg bg-black px-4 py-2 text-white">
        {loading ? "Saving..." : "Save Workout"}
      </button>
      {message ? <p className="text-sm text-green-700">{message}</p> : null}
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
