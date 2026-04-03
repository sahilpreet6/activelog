"use client";

import { useEffect, useState } from "react";
import type { Goal } from "@/lib/types";
import Loader from "@/components/ui/Loader";
import ErrorMessage from "@/components/ui/ErrorMessage";
import EmptyState from "@/components/ui/EmptyState";

type GoalForm = {
  title: string;
  target_value: string;
  current_value: string;
};

const initialForm: GoalForm = {
  title: "",
  target_value: "",
  current_value: "0",
};

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [form, setForm] = useState<GoalForm>(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const loadGoals = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/goals", { cache: "no-store" });
      const payload = (await response.json()) as { goals?: Goal[]; error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Unable to load goals.");
        return;
      }

      setGoals(payload.goals ?? []);
    } catch {
      setError("Network error while loading goals.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadGoals();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: form.title,
          target_value: Number(form.target_value),
          current_value: Number(form.current_value),
        }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(payload.error ?? "Unable to save goal.");
        return;
      }

      setMessage("Goal saved.");
      setForm(initialForm);
      await loadGoals();
    } catch {
      setError("Network error while saving goal.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <div className="mx-auto max-w-6xl space-y-8">
        <section>
          <h1 className="mb-2 text-3xl font-semibold text-slate-900">Goals</h1>
          <p className="text-slate-600">Set targets and track progress.</p>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Add Goal</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="mb-1 block text-sm font-medium text-slate-700">
                Goal Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                placeholder="e.g., Weekly Cardio Minutes"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="target" className="mb-1 block text-sm font-medium text-slate-700">
                  Target Value
                </label>
                <input
                  id="target"
                  type="number"
                  min={0}
                  value={form.target_value}
                  onChange={(e) => setForm((prev) => ({ ...prev, target_value: e.target.value }))}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
                  required
                />
              </div>
              <div>
                <label htmlFor="current" className="mb-1 block text-sm font-medium text-slate-700">
                  Current Value
                </label>
                <input
                  id="current"
                  type="number"
                  min={0}
                  value={form.current_value}
                  onChange={(e) => setForm((prev) => ({ ...prev, current_value: e.target.value }))}
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
              {saving ? "Saving..." : "Save Goal"}
            </button>

            {message ? (
              <p className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                {message}
              </p>
            ) : null}
          </form>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Goal List</h2>

          {loading ? <Loader /> : null}
          {error ? <ErrorMessage message={error} /> : null}

          {!loading && !error && goals.length === 0 ? (
            <EmptyState title="No goals yet" description="Create your first goal above." />
          ) : null}

          {!loading && !error && goals.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {goals.map((goal) => (
                <article key={goal.id} className="rounded-lg border border-slate-200 bg-white p-4">
                  <h3 className="text-base font-semibold text-slate-900">{goal.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">
                    Progress: {goal.current_value}/{goal.target_value}
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
