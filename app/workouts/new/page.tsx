import WorkoutForm from "@/components/workouts/WorkoutForm";

export default function NewWorkoutPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Add Workout</h1>
      <WorkoutForm />
    </main>
  );
}
