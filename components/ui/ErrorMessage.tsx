type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-red-800">
      <p className="text-sm font-medium">Error</p>
      <p className="mt-1 text-sm">{message}</p>
    </div>
  );
}
