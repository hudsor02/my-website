// components/ui/Card.js
import { cn } from "../../lib/utils";

const CardHeader = ({ children, className, ...props }) => (
  <div
    className={cn(
      "px-4 py-2 border-b border-neutral-200 dark:border-neutral-800",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }) => (
  <h3
    className={cn(
      "text-lg font-semibold text-neutral-900 dark:text-neutral-100",
      className
    )}
    {...props}
  >
    {children}
  </h3>
);

const CardContent = ({ children, className, ...props }) => (
  <div className={cn("p-4", className)} {...props}>
    {children}
  </div>
);

const Card = ({ className, children, ...props }) => (
  <div
    className={cn(
      "rounded-lg border border-neutral-200 bg-white text-neutral-950 shadow-sm dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Content = CardContent;

export { Card };
export default Card;
