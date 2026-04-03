"use client";

import { useEffect, useState } from "react";
import type { Meal } from "@/lib/types";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";

type NutritionForm = {
  name: string;
  calories: string;
  protein: string;
  carbs: string;
  fat: string;
};

const initialForm: NutritionForm = {
  name: "",
  calories: "",
  protein: "",
  carbs: "",
  fat: "",
};

export default function NutritionPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [form, setForm] = useState<NutritionForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadMeals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/nutrition", { cache: "no-store" });
      const payload = (await response.json()) as { meals?: Meal[]; error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Unable to load meals.");
        return;
      }

      setMeals(payload.meals ?? []);
    } catch {
      setError("Network error while loading meals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadMeals();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/nutrition", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          calories: Number(form.calories),
          protein: Number(form.protein),
          carbs: Number(form.carbs),
          fat: Number(form.fat),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Unable to save meal.");
        return;
      }

      setMessage("Meal saved.");
      setForm(initialForm);
      await loadMeals();
    } catch {
      setError("Network error while saving meal.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">Nutrition</h1>
          <p className="text-slate-600">Log meals and macronutrients.</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Add Meal</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">
                Meal Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                placeholder="e.g., Chicken Salad"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div>
                <label htmlFor="calories" className="mb-1 block text-sm font-medium text-slate-700">
                  Calories
                </label>
                <input
                  id="calories"
                  type="number"
                  min={0}
                  value={form.calories}
                  onChange={(e) => setForm((prev) => ({ ...prev, calories: e.target.value }))}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="protein" className="mb-1 block text-sm font-medium text-slate-700">
                  Protein (g)
                </label>
                <input
                  id="protein"
                  type="number"
                  min={0}
                  value={form.protein}
                  onChange={(e) => setForm((prev) => ({ ...prev, protein: e.target.value }))}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="carbs" className="mb-1 block text-sm font-medium text-slate-700">
                  Carbs (g)
                </label>
                <input
                  id="carbs"
                  type="number"
                  min={0}
                  value={form.carbs}
                  onChange={(e) => setForm((prev) => ({ ...prev, carbs: e.target.value }))}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="fat" className="mb-1 block text-sm font-medium text-slate-700">
                  Fat (g)
                </label>
                <input
                  id="fat"
                  type="number"
                  min={0}
                  value={form.fat}
                  onChange={(e) => setForm((prev) => ({ ...prev, fat: e.target.value }))}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Meal"}
            </button>

            {message ? (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {message}
              </p>
            ) : null}
          </form>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Meal History</h2>

          {loading ? <Loader /> : null}
          {error ? <ErrorMessage message={error} /> : null}

          {!loading && !error && meals.length === 0 ? (
            <EmptyState title="No meals yet" description="Add your first meal above." />
          ) : null}

          {!loading && !error && meals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {meals.map((meal) => (
                <article key={meal.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-slate-900">{meal.name}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    {meal.calories} cal • P {meal.protein}g • C {meal.carbs}g • F {meal.fat}g
                  </p>
                </article>
              ))}
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
