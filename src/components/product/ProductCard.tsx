"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import { formatPriceCOP } from "@/lib/format";
import { cn } from "@/lib/utils";
import { QuickViewDrawer } from "./QuickViewDrawer";

const CATEGORY_LABELS: Record<string, string> = {
  women: "MUJERES",
  men: "HOMBRES",
  headwear: "GORRAS",
  kids: "NIÑOS",
};

interface ProductCardProps {
  product: Product;
  className?: string;
  /** Optional editorial microcopy shown on hover */
  microcopy?: string;
  /** Optional editorial line for Quick View drawer (e.g. "Edición limitada", "Hecho para entrenar") */
  editorialLine?: string;
}

export function ProductCard({
  product,
  className,
  microcopy,
  editorialLine,
}: ProductCardProps) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const imageSrc =
    product.images[0]?.startsWith("/") || product.images[0]?.startsWith("http")
      ? product.images[0]
      : PLACEHOLDER_IMAGE;
  const price = product.variants[0]?.price;
  const typeLabel = CATEGORY_LABELS[product.category] ?? product.category.toUpperCase();

  return (
    <>
      <div className={cn("group relative min-w-0", className)}>
        <Link href={`/shop/${product.category}/${product.slug}`} className="block">
          <div className="aspect-square relative bg-muted rounded-lg overflow-hidden mb-3">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
          <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground mb-1">
            {typeLabel}
          </p>
          <p className="font-medium">{product.name}</p>
          {price !== undefined && price !== null ? (
            <p className="text-sm text-muted-foreground">
              {formatPriceCOP(price)}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">Consultar disponibilidad</p>
          )}
          {microcopy && (
            <p className="text-xs text-muted-foreground mt-1 opacity-0 transition-opacity duration-150 ease-out delay-0 group-hover:opacity-100 group-hover:delay-100 line-clamp-2">
              {microcopy}
            </p>
          )}
        </Link>
        {/* Mobile-first: explicit button always visible on touch; hover-only on desktop */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setQuickViewOpen(true);
          }}
          className={cn(
            "absolute bottom-2 left-2 right-2 md:left-auto md:right-2 md:bottom-3",
            "py-2 px-3 text-xs font-medium uppercase tracking-wider",
            "bg-background/95 text-foreground rounded-md",
            "transition-opacity duration-150 ease-out",
            "md:opacity-0 md:delay-0 md:group-hover:opacity-100 md:group-hover:delay-75",
            "hover:bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          )}
          aria-label="Vista rápida"
        >
          Vista rápida
        </button>
      </div>
      <QuickViewDrawer
        product={product}
        open={quickViewOpen}
        onOpenChange={setQuickViewOpen}
        editorialLine={editorialLine}
      />
    </>
  );
}
