// components/ui/badge.js
import { cn } from "@/lib/utils";

export function Badge({
  children,
  variant = "default",
  className = "",
  ...props
}) {
  const variants = {
    default:
      "bg-primary-100 text-primary-800 dark:bg-primary-900/90 dark:text-primary-300",
    secondary:
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-800/90 dark:text-neutral-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
