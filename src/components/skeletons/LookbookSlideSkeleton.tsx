import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

/**
 * Editorial-style skeleton for a single LookbookRail slide.
 * Matches aspect-[3/4] + CTA line. No spinners.
 */
interface LookbookSlideSkeletonProps {
  className?: string;
}

export function LookbookSlideSkeleton({
  className,
}: LookbookSlideSkeletonProps) {
  return (
    <div className={cn("shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw]", className)}>
      <Skeleton className="aspect-[3/4] rounded-lg mb-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  );
}
