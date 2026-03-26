interface MealCardProps {
  name: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
  loggedAt?: string;
}

export default function MealCard({
  name,
  calories,
  protein,
  carbs,
  fat,
  loggedAt,
}: MealCardProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">{name}</h3>
        {loggedAt && (
          <span className="text-xs text-zinc-400">
            {new Date(loggedAt).toLocaleDateString()}
          </span>
        )}
      </div>
      <div className="mt-2 flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
        {calories != null && (
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            {calories} kcal
          </span>
        )}
        {protein != null && <span>P: {protein}g</span>}
        {carbs != null && <span>C: {carbs}g</span>}
        {fat != null && <span>F: {fat}g</span>}
      </div>
    </div>
  );
}
