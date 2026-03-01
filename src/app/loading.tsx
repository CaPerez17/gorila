import {
  LookbookSlideSkeleton,
  ProductCardSkeleton,
} from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Root loading UI. Shown during client-side navigation.
 * Mirrors home layout to avoid layout shift.
 */
export default function RootLoading() {
  return (
    <div>
      <section className="h-[55vh] min-h-[380px] bg-[#111]" />
      <section className="container py-8 md:py-12 px-4 md:px-6">
        <Skeleton className="h-6 w-24 mb-6" />
        <div className="py-12 md:py-16">
          <div className="overflow-hidden flex gap-4 md:gap-6 px-4 md:px-6 pb-4">
            <LookbookSlideSkeleton />
            <LookbookSlideSkeleton />
            <LookbookSlideSkeleton />
          </div>
        </div>
      </section>
      <section className="container py-16 md:py-24 px-4 md:px-6">
        <Skeleton className="h-9 w-40 mb-2" />
        <Skeleton className="h-5 w-64 mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6">
          <div className="col-span-2 row-span-2">
            <ProductCardSkeleton />
          </div>
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
