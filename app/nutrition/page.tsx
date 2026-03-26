import Link from "next/link";
import MealCard from "@/components/MealCard";
import { EmptyState } from "@/components/ui";

// TODO (Sprint 2): Replace with Supabase fetch
const meals: never[] = [];

export default function NutritionPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-white">Nutrition</h1>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Track your daily meals and macros.
          </p>
        </div>
        <Link
          href="/nutrition/search"
          className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
        >
          + Log Meal
        </Link>
      </div>

      {meals.length === 0 ? (
        <EmptyState
          title="No meals logged today"
          description="Search for a food to get started."
          action={
            <Link
              href="/nutrition/search"
              className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600"
            >
              Search Food
            </Link>
          }
        />
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {meals.map((m: any) => (
            <MealCard key={m.id} {...m} />
          ))}
        </div>
      )}
    </div>
  );
}
