"use client";

import { cn } from "@/lib/utils";
import type { ProductVariant } from "@/types";
import { isVariantAvailable } from "@/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selectedVariantId: string;
  onSelect: (variant: ProductVariant) => void;
  type: "color" | "size";
}

const COLOR_MAP: Record<string, string> = {
  Black: "bg-zinc-900",
  White: "bg-white border border-zinc-300",
  Navy: "bg-blue-950",
  Olive: "bg-amber-900",
};

export function VariantSelector({
  variants,
  selectedVariantId,
  onSelect,
  type,
}: VariantSelectorProps) {
  const uniqueValues =
    type === "color"
      ? [...new Set(variants.map((v) => v.color).filter(Boolean))] as string[]
      : [...new Set(variants.map((v) => v.size).filter(Boolean))] as string[];

  if (uniqueValues.length === 0) return null;

  const label = type === "color" ? "Color" : "Talla";
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {type === "color"
          ? uniqueValues.map((color) => {
              const variant = variants.find((v) => v.color === color);
              if (!variant) return null;
              const available = isVariantAvailable(variant);
              const isSelected = selectedVariantId === variant.id;
              const swatchClass = COLOR_MAP[color ?? ""] ?? "bg-zinc-400";
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => available && onSelect(variant)}
                  disabled={!available}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-colors duration-150 ease-out",
                    swatchClass,
                    isSelected
                      ? "border-foreground ring-2 ring-foreground ring-offset-2"
                      : "border-transparent hover:border-muted-foreground",
                    !available && "opacity-40 cursor-not-allowed"
                  )}
                  title={`${color}${!available ? " (Agotado)" : ""}`}
                  aria-label={`Seleccionar ${color}`}
                />
              );
            })
          : uniqueValues.map((size) => {
              const variant = variants.find((v) => v.size === size);
              if (!variant) return null;
              const available = isVariantAvailable(variant);
              const isSelected = selectedVariantId === variant.id;
              return (
                <button
                  key={variant.id}
                  type="button"
                  onClick={() => available && onSelect(variant)}
                  disabled={!available}
                  className={cn(
                    "px-4 py-2 rounded-md text-sm font-medium border transition-colors duration-150 ease-out",
                    isSelected
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/50",
                    !available && "opacity-40 cursor-not-allowed line-through"
                  )}
                >
                  {size}
                </button>
              );
            })}
      </div>
    </div>
  );
}
