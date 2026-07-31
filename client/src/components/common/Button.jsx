import clsx from "clsx";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  ...props
}) {
  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    secondary:
      "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white",

    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800",

    danger:
      "bg-red-600 hover:bg-red-700 text-white",
  };

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      type={type}
      className={clsx(
        "rounded-xl font-medium transition-all duration-300 shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}