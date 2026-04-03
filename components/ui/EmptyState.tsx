type EmptyStateProps = {
  title: string;
  description?: string;
};

export default function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-md border border-slate-200 bg-white p-10 text-center">
      <h3 className="text-xl font-semibold text-slate-900">{title}</h3>
      {description ? <p className="mt-2 text-slate-600">{description}</p> : null}
    </div>
  );
}
