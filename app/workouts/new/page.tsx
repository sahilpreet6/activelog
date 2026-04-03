import WorkoutForm from "@/components/workouts/WorkoutForm";

export default function NewWorkoutPage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8 text-slate-900">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-2 text-3xl font-semibold text-slate-900">Add Workout</h1>
        <p className="mb-6 text-slate-600">Log a workout session.</p>

        <div className="rounded-lg border border-slate-200 bg-white p-6">
          <WorkoutForm />
        </div>
      </div>
    </main>
  );
}
