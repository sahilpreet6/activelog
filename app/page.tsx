import Link from "next/link";


export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <section className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-4xl font-bold text-slate-900">ActiveLog</h1>
        <p className="mt-3 text-slate-600">
          Track workouts, nutrition, and goals in one place.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800"
          >
            Login
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Sign Up
          </Link>
        </div>
      </section>
    </main>
  );
}
