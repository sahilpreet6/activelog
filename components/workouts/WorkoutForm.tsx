"use client";

import { useState } from "react";

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
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage("Saving...");

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
      setMessage(data.error ?? "Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md space-y-4">
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
        Save Workout
      </button>
      {message ? <p className="text-sm">{message}</p> : null}
    </form>
  );
}
