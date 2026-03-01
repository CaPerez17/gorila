import { ProductGridSkeleton } from "@/components/product/ProductGridSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

export default function ShopCategoryLoading() {
  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <nav className="text-sm text-muted-foreground mb-6">
        <Skeleton className="h-4 w-16 inline-block" />
        <span className="mx-2">/</span>
        <Skeleton className="h-4 w-24 inline-block" />
      </nav>
      <Skeleton className="h-10 w-32 mb-10" />
      <ProductGridSkeleton />
    </div>
  );
}
