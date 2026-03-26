"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewWorkoutPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    exercise: "",
    sets: "",
    reps: "",
    duration: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO (Sprint 2): Send to Supabase via API route
    // const res = await fetch("/api/workouts", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(form),
    // });

    // Simulate a short delay for now
    await new Promise((r) => setTimeout(r, 500));
    setLoading(false);
    router.push("/workouts");
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        Log Workout
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Exercise name */}
        <div>
          <label
            htmlFor="exercise"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Exercise <span className="text-red-500">*</span>
          </label>
          <input
            id="exercise"
            name="exercise"
            type="text"
            required
            placeholder="e.g. Bench Press"
            value={form.exercise}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Sets / Reps row */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="sets"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
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
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>
          <div>
            <label
              htmlFor="reps"
              className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
            >
              Reps
            </label>
            <input
              id="reps"
              name="reps"
              type="number"
              min={1}
              placeholder="10"
              value={form.reps}
              onChange={handleChange}
              className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        {/* Duration */}
        <div>
          <label
            htmlFor="duration"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Duration (minutes)
          </label>
          <input
            id="duration"
            name="duration"
            type="number"
            min={1}
            placeholder="30"
            value={form.duration}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="notes"
            className="mb-1 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
          >
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            rows={3}
            placeholder="How did it go?"
            value={form.notes}
            onChange={handleChange}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 rounded-full bg-emerald-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-600 disabled:opacity-60"
          >
            {loading ? "Saving…" : "Save Workout"}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-full border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
