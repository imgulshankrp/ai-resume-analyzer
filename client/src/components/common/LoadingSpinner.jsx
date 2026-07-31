export default function LoadingSpinner({
  text = "Processing...",
}) {
  return (
    <div
      className="flex flex-col items-center justify-center py-12"
      role="status"
      aria-live="polite"
    >
      {/* Spinner */}
      <div className="relative">
        <div className="w-14 h-14 rounded-full border-4 border-slate-200 dark:border-slate-700"></div>

        <div className="absolute inset-0 w-14 h-14 rounded-full border-4 border-transparent border-t-blue-600 animate-spin"></div>
      </div>

      {/* Title */}
      <h3 className="mt-6 text-lg font-semibold text-slate-800 dark:text-white">
        {text}
      </h3>

      {/* Subtitle */}
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
        This may take a few seconds. Please wait...
      </p>
    </div>
  );
}