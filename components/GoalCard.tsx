interface GoalCardProps {
  title: string;
  currentValue: number;
  targetValue: number;
  unit?: string;
}

export default function GoalCard({
  title,
  currentValue,
  targetValue,
  unit,
}: GoalCardProps) {
  const pct = Math.min(100, Math.round((currentValue / targetValue) * 100));

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{title}</h3>
        <span className="text-sm font-medium text-emerald-500">{pct}%</span>
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        {currentValue}
        {unit ? ` ${unit}` : ""} / {targetValue}
        {unit ? ` ${unit}` : ""}
      </p>
    </div>
  );
}
