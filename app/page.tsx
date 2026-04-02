import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black px-6 text-center text-white">
      <h1 className="mb-4 text-5xl font-bold">ActiveLog</h1>
      <p className="mb-8 max-w-2xl text-lg text-gray-300">
        A personal health tracking app for workouts, nutrition, goals, and
        progress.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="rounded-xl bg-white px-6 py-3 font-medium text-black"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="rounded-xl border border-white px-6 py-3 font-medium"
        >
          Sign Up
        </Link>
      </div>
    </main>
  );
}
