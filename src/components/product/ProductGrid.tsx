import type { Product } from "@/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  if (!products?.length) {
    return (
      <div className="py-12 text-center">
        <p className="text-muted-foreground">
          No hay productos en esta categoría por el momento.
        </p>
      </div>
    );
  }

  // Mobile-first: 2 cols from 0px, min-w-0 prevents overflow at <360px
  return (
    <div
      className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 min-w-0 ${className ?? ""}`}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          microcopy={product.description}
        />
      ))}
    </div>
  );
}
