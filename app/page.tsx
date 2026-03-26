import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
      <div className="max-w-lg text-center">
        <h1 className="text-5xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Active<span className="text-emerald-500">Log</span>
        </h1>
        <p className="mt-4 text-lg text-zinc-500 dark:text-zinc-400">
          Log workouts, track nutrition, and hit your goals — all in one place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-600"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Log In
          </Link>
        </div>
      </div>
    </main>
  );
}
