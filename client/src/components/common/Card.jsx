export default function Card({
  children,
  title,
  subtitle,
  className = "",
}) {
  return (
    <div
      className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 ${className}`}
    >
      {(title || subtitle) && (
        <div className="mb-5">
          {title && (
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {title}
            </h2>
          )}

          {subtitle && (
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {children}
    </div>
  );
}