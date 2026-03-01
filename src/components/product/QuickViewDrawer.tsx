"use client";

import { useState, useMemo, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { VariantSelector } from "./VariantSelector";
import { AddToCartButton } from "./AddToCartButton";
import {
  buildWhatsAppGenericMessage,
  buildWhatsAppProductInquiry,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";
import { formatPriceCOP } from "@/lib/format";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { Product, ProductVariant } from "@/types";
import { isVariantAvailable } from "@/types";
import { cn } from "@/lib/utils";

interface QuickViewDrawerProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Optional editorial microcopy (e.g. "Edición limitada", "Hecho para entrenar") */
  editorialLine?: string;
}

/** Mobile-first: bottom sheet on small screens, side sheet on desktop. */
function useSheetSide() {
  const [side, setSide] = useState<"right" | "bottom">("right");
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setSide(mq.matches ? "bottom" : "right");
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return side;
}

export function QuickViewDrawer({
  product,
  open,
  onOpenChange,
  editorialLine,
}: QuickViewDrawerProps) {
  const side = useSheetSide();
  const v0 = product?.variants[0];
  const [selectedColor, setSelectedColor] = useState<string | null>(
    v0?.color ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    v0?.size ?? null
  );

  // Reset selection when product changes
  useEffect(() => {
    const v = product?.variants[0];
    setSelectedColor(v?.color ?? null);
    setSelectedSize(v?.size ?? null);
  }, [product?.id]);

  if (!product) return null;

  const hasColors = product.variants.some((v) => v.color);
  const hasSizes = product.variants.some((v) => v.size);

  const selectedVariant = useMemo(() => {
    let filtered = product.variants;
    if (selectedColor)
      filtered = filtered.filter((v) => v.color === selectedColor);
    if (selectedSize) filtered = filtered.filter((v) => v.size === selectedSize);
    return filtered[0] ?? product.variants[0] ?? ({} as ProductVariant);
  }, [product.variants, selectedColor, selectedSize]);

  const handleColorSelect = (v: ProductVariant) => {
    setSelectedColor(v.color ?? null);
    const byColor = product.variants.filter((x) => x.color === v.color);
    if (hasSizes && byColor[0]?.size) setSelectedSize(byColor[0].size);
  };
  const handleSizeSelect = (v: ProductVariant) => {
    setSelectedSize(v.size ?? null);
  };

  const imageSrc =
    selectedVariant.imageUrl?.startsWith("/") ||
    selectedVariant.imageUrl?.startsWith("http")
      ? selectedVariant.imageUrl
      : product.images[0]?.startsWith("/") || product.images[0]?.startsWith("http")
        ? product.images[0]
        : PLACEHOLDER_IMAGE;

  const colorFilteredVariants = selectedColor
    ? product.variants.filter((v) => v.color === selectedColor)
    : product.variants;
  const available = isVariantAvailable(selectedVariant);

  const whatsAppCtaLabel =
    available &&
    selectedVariant.price !== undefined &&
    selectedVariant.price !== null
      ? "Finalizar por WhatsApp"
      : "Consultar por WhatsApp";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={side}
        className={cn(
          "flex flex-col p-0 gap-0 border-0 sm:max-w-md",
          side === "bottom" && "max-h-[85vh] rounded-t-xl"
        )}
        overlayClassName="bg-black/40"
      >
        <div className="flex flex-col overflow-hidden h-full">
          {/* Image */}
          <div className="relative aspect-square shrink-0 bg-muted">
            <Image
              src={imageSrc}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 28rem"
            />
          </div>

          {/* Content - scrollable */}
          <div className="flex flex-col flex-1 min-h-0 overflow-y-auto p-6 space-y-5">
            <SheetHeader className="p-0 space-y-1">
              <SheetTitle className="text-xl font-semibold tracking-tight">
                {product.name}
              </SheetTitle>
            </SheetHeader>

            {/* Price + availability */}
            <div className="space-y-1">
              {selectedVariant.price !== undefined &&
              selectedVariant.price !== null ? (
                <p className="text-lg text-muted-foreground">
                  {formatPriceCOP(selectedVariant.price)}
                </p>
              ) : null}
              <p className="text-sm text-muted-foreground">
                {available ? "Disponible" : "Consultar disponibilidad"}
              </p>
            </div>

            {/* Variant selectors */}
            <div className="space-y-4">
              {hasColors && (
                <VariantSelector
                  variants={product.variants}
                  selectedVariantId={selectedVariant.id}
                  onSelect={handleColorSelect}
                  type="color"
                />
              )}
              {hasSizes && (
                <VariantSelector
                  variants={colorFilteredVariants}
                  selectedVariantId={selectedVariant.id}
                  onSelect={handleSizeSelect}
                  type="size"
                />
              )}
            </div>

            {/* Editorial line */}
            {editorialLine && (
              <p className="text-sm text-muted-foreground italic">
                {editorialLine}
              </p>
            )}

            {/* CTAs */}
            <div className="flex flex-col gap-3 pt-2">
              <AddToCartButton
                product={product}
                variant={selectedVariant}
                skipNavigation
                className="w-full"
              />
              <div className="space-y-1">
                {isWhatsAppConfigured() ? (
                  <Button variant="ghost" asChild className="w-full text-sm">
                    <Link
                      href={buildWhatsAppGenericMessage(
                        buildWhatsAppProductInquiry(product, selectedVariant)
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {whatsAppCtaLabel}
                    </Link>
                  </Button>
                ) : (
                  <Button variant="ghost" asChild className="w-full text-sm">
                    <Link
                      href={FALLBACK_CONTACT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      WhatsApp aún no configurado. Contáctanos por Instagram.
                    </Link>
                  </Button>
                )}
                {isWhatsAppConfigured() && (
                  <p className="text-xs text-muted-foreground/80">
                    Te responde una persona real.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
