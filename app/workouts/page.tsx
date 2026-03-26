import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import { EmptyState } from "@/components/ui";

// TODO (Sprint 2): Replace with Supabase fetch
const workouts: never[] = [];

export default function WorkoutsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Workouts</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Your full workout history.
          </p>
        </div>
        <Link
          href="/workouts/new"
          className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          + Log Workout
        </Link>
      </div>

      {workouts.length === 0 ? (
        <EmptyState
          title="No workouts logged yet"
          description="Hit the button above to log your first session."
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((w: any) => (
            <WorkoutCard key={w.id} {...w} />
          ))}
        </div>
      )}
    </div>
  );
}
