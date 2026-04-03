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
    <article className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-semibold text-slate-900 capitalize">{exercise}</h3>
      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p>{sets} sets × {reps} reps</p>
        <p>{duration} minutes</p>
      </div>
      {date ? <p className="mt-4 text-xs text-slate-500">{date}</p> : null}
    </article>
  );
}
