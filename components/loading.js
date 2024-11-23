// components/loading.js
import { Loader2 } from "lucide-react";

export function FullPageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-primary-500" />
    </div>
  );
}

export function ContentLoader() {
  return (
    <div className="w-24 h-6 rounded-md bg-neutral-200 dark:bg-neutral-700 animate-pulse" />
  );
}

export function SkeletonLoader({ width = "w-24", height = "h-6" }) {
  return (
    <div
      className={`${width} ${height} bg-neutral-200 dark:bg-neutral-700 rounded-md animate-pulse`}
    />
  );
}
