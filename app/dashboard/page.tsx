import Link from "next/link";
import WorkoutCard from "@/components/WorkoutCard";
import GoalCard from "@/components/GoalCard";
import { EmptyState } from "@/components/ui";

// TODO (Sprint 2): Replace with real data fetched from Supabase
const recentWorkouts: never[] = [];
const goals: never[] = [];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-8">
      <div>
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
          Welcome back. Here&apos;s your activity at a glance.
        </p>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/workouts/new"
          className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          + Log Workout
        </Link>
        <Link
          href="/nutrition/search"
          className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          + Log Meal
        </Link>
      </div>

      {/* Recent workouts */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">
            Recent Workouts
          </h2>
          <Link href="/workouts" className="text-sm text-emerald-500 hover:underline">
            View all
          </Link>
        </div>
        {recentWorkouts.length === 0 ? (
          <EmptyState
            title="No workouts yet"
            description="Log your first workout to get started."
            action={
              <Link
                href="/workouts/new"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Log Workout
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {recentWorkouts.map((w: any) => (
              <WorkoutCard key={w.id} {...w} />
            ))}
          </div>
        )}
      </section>

      {/* Goals */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-zinc-900 dark:text-white">Goals</h2>
          <Link href="/goals" className="text-sm text-emerald-500 hover:underline">
            View all
          </Link>
        </div>
        {goals.length === 0 ? (
          <EmptyState
            title="No goals set"
            description="Set a goal to start tracking your progress."
            action={
              <Link
                href="/goals"
                className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
              >
                Add Goal
              </Link>
            }
          />
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {goals.map((g: any) => (
              <GoalCard key={g.id} {...g} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
