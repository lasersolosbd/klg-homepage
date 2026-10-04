import { LAST_UPDATED, LAST_UPDATED_LABEL } from "@/lib/config";

// Visible freshness line. The same date feeds dateModified and article:modified_time.
export function LastUpdated({ className = "" }: { className?: string }) {
  return (
    <p className={`text-xs text-slate ${className}`}>
      Last updated <time dateTime={LAST_UPDATED}>{LAST_UPDATED_LABEL}</time>
    </p>
  );
}
