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
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-4">
        <p className="text-sm font-medium text-slate-700">Search ExerciseDB</p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search exercise name"
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleExerciseSearch}
            disabled={searchLoading}
            className="rounded-md border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-60"
          >
            {searchLoading ? "Searching..." : "Search"}
          </button>
        </div>
        {exerciseResults.length > 0 ? (
          <ul className="max-h-40 space-y-2 overflow-auto pr-1 text-sm">
            {exerciseResults.map((exercise) => (
              <li key={exercise.id}>
                <button
                  type="button"
                  className="w-full rounded-md border border-slate-200 px-3 py-2 text-left hover:bg-slate-50"
                  onClick={() => {
                    setForm((prev) => ({ ...prev, exercise: exercise.name }));
                    setSearchTerm(exercise.name);
                  }}
                >
                  <p className="font-medium capitalize text-slate-900">{exercise.name}</p>
                  <p className="text-xs text-slate-600">
                    {exercise.bodyPart} · {exercise.target} · {exercise.equipment}
                  </p>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div>
        <label htmlFor="exercise" className="mb-1 block text-sm font-medium text-slate-700">
          Exercise
        </label>
        <input
          id="exercise"
          name="exercise"
          placeholder="e.g., Push Ups"
          value={form.exercise}
          onChange={handleChange}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="sets" className="mb-1 block text-sm font-medium text-slate-700">
            Sets
          </label>
          <input
            id="sets"
            name="sets"
            type="number"
            min={1}
            placeholder="3"
            value={form.sets}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="reps" className="mb-1 block text-sm font-medium text-slate-700">
            Reps
          </label>
          <input
            id="reps"
            name="reps"
            type="number"
            min={1}
            placeholder="12"
            value={form.reps}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="duration" className="mb-1 block text-sm font-medium text-slate-700">
            Minutes
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            placeholder="15"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save Workout"}
      </button>

      {message ? (
        <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          {error}
        </p>
      ) : null}
    </form>
  );
}
