"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatPriceCOP } from "@/lib/format";
import { cn } from "@/lib/utils";

const CATEGORY_LABELS: Record<string, string> = {
  women: "MUJERES",
  men: "HOMBRES",
  headwear: "GORRAS",
  kids: "NIÑOS",
};

interface EditorialProductGridProps {
  products: Product[];
  featuredIndex?: number;
}

function ProductTypeLabel({ category }: { category: string }) {
  const label = CATEGORY_LABELS[category] ?? category.toUpperCase();
  return (
    <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
      {label}
    </p>
  );
}

export function EditorialProductGrid({
  products,
  featuredIndex = 0,
}: EditorialProductGridProps) {
  const featured = products[featuredIndex];
  const rest = products.filter((_, i) => i !== featuredIndex);

  const imageSrc = (p: Product) =>
    p.images[0]?.startsWith("/") || p.images[0]?.startsWith("http")
      ? p.images[0]
      : PLACEHOLDER_IMAGE;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 auto-rows-fr">
      {featured && (
        <Link
          href={`/shop/${featured.category}/${featured.slug}`}
          className="group block col-span-2 row-span-2"
        >
          <div className="aspect-square md:aspect-[4/5] relative bg-muted rounded-lg overflow-hidden mb-3">
            <Image
              src={imageSrc(featured)}
              alt={featured.name}
              fill
              className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <ProductTypeLabel category={featured.category} />
          <p className="font-medium">{featured.name}</p>
          {featured.variants[0]?.price !== undefined &&
          featured.variants[0]?.price !== null ? (
            <p className="text-sm text-muted-foreground">
              {formatPriceCOP(featured.variants[0].price)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Consultar disponibilidad</p>
          )}
        </Link>
      )}
      {rest.map((product) => (
        <Link
          key={product.id}
          href={`/shop/${product.category}/${product.slug}`}
          className="group block"
        >
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-3">
            <Image
              src={imageSrc(product)}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
          <ProductTypeLabel category={product.category} />
          <p className="font-medium text-sm">{product.name}</p>
          {product.variants[0]?.price !== undefined &&
          product.variants[0]?.price !== null ? (
            <p className="text-xs text-muted-foreground">
              {formatPriceCOP(product.variants[0].price)}
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Consultar disponibilidad</p>
          )}
        </Link>
      ))}
    </div>
  );
}
