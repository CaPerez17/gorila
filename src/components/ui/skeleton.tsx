import { cn } from "@/lib/utils";

/**
 * Editorial-style skeleton. Subtle pulse; prefers-reduced-motion disables
 * animation entirely (static block). No spinners.
 */
function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "bg-muted/90 rounded-lg animate-pulse",
        "motion-reduce:animate-none motion-reduce:opacity-80",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
