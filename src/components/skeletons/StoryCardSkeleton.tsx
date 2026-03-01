import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Editorial-style skeleton for a single StoryCard.
 * Matches title + excerpt layout. No spinners.
 */
interface StoryCardSkeletonProps {
  className?: string;
}

export function StoryCardSkeleton({ className }: StoryCardSkeletonProps) {
  return (
    <div
      className={cn(
        "p-6 rounded-lg border border-border space-y-2",
        className
      )}
    >
      <Skeleton className="h-6 w-3/4" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}
