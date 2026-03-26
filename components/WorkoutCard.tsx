interface WorkoutCardProps {
  exercise: string;
  sets?: number;
  reps?: number;
  duration?: number; // minutes
  loggedAt?: string;
}

export default function WorkoutCard({
  exercise,
  sets,
  reps,
  duration,
  loggedAt,
}: WorkoutCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{exercise}</h3>
        {loggedAt && (
          <span className="text-xs text-zinc-400">
            {new Date(loggedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="mt-2 flex gap-4 text-sm text-zinc-500 dark:text-zinc-400">
        {sets != null && <span>{sets} sets</span>}
        {reps != null && <span>{reps} reps</span>}
        {duration != null && <span>{duration} min</span>}
      </div>
    </div>
  );
}
