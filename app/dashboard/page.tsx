import WorkoutCard from "@/components/workouts/WorkoutCard";

export default function DashboardPage() {
  return (
    <main className="p-6">
      <h1 className="mb-4 text-3xl font-bold">Dashboard</h1>
      <p className="mb-6 text-slate-600">Welcome to your health dashboard.</p>
      <div className="grid gap-4 md:grid-cols-2">
        <WorkoutCard
          exercise="Push Ups"
          sets={3}
          reps={12}
          duration={15}
          date="Today"
        />
        <WorkoutCard
          exercise="Jogging"
          sets={1}
          reps={1}
          duration={30}
          date="Yesterday"
        />
      </div>
    </main>
  );
}
