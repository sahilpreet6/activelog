import GoalCard from "@/components/GoalCard";
import { EmptyState } from "@/components/ui";

// TODO (Sprint 2): Replace with Supabase fetch
const goals: never[] = [];

export default function GoalsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Goals</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Set targets and track your progress.
          </p>
        </div>
        <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600">
          + Add Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <EmptyState
          title="No goals yet"
          description="Add your first goal to start tracking progress."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((g: any) => (
            <GoalCard key={g.id} {...g} />
          ))}
        </div>
      )}
    </div>
  );
}
