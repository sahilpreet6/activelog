type WorkoutCardProps = {
  exercise: string;
  sets: number;
  reps: number;
  duration: number;
  date?: string;
};

export default function WorkoutCard({
  exercise,
  sets,
  reps,
  duration,
  date,
}: WorkoutCardProps) {
  return (
    <article className="rounded-xl border bg-white p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{exercise}</h3>
      <p className="text-sm text-slate-600">{sets} sets x {reps} reps</p>
      <p className="text-sm text-slate-600">{duration} minutes</p>
      {date ? <p className="mt-2 text-xs text-slate-500">{date}</p> : null}
    </article>
  );
}
