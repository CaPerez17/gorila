import { Skeleton } from "@/components/ui/skeleton";

/**
 * PDP loading. Matches nav + 2-col layout to avoid CLS.
 */
export default function ProductPageLoading() {
  return (
    <div className="container py-8 md:py-12">
      <nav className="text-sm text-muted-foreground mb-8">
        <Skeleton className="h-4 w-14 inline-block" />
        <span className="mx-2">/</span>
        <Skeleton className="h-4 w-20 inline-block" />
        <span className="mx-2">/</span>
        <Skeleton className="h-4 w-32 inline-block" />
      </nav>
      <div className="grid md:grid-cols-2 gap-10">
        <Skeleton className="aspect-square rounded-lg" />
        <div className="space-y-6">
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex gap-2 pt-4">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
