import { Inbox } from "lucide-react";

export default function EmptyState({
  title = "Nothing Here",
  description = "No data available.",
  icon: Icon = Inbox,
  action = null,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center bg-white dark:bg-slate-900 border border-dashed border-slate-300 dark:border-slate-700 rounded-2xl">
      <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
        <Icon className="w-8 h-8 text-blue-600" />
      </div>

      <h2 className="mt-6 text-xl font-semibold text-slate-900 dark:text-white">
        {title}
      </h2>

      <p className="mt-2 text-slate-500 dark:text-slate-400 max-w-sm">
        {description}
      </p>

      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}