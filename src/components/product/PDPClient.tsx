"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
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

interface PDPClientProps {
  product: Product;
  category: string;
  categoryLabel: string;
}

export function PDPClient({
  product,
}: PDPClientProps) {
  const v0 = product.variants[0];
  const [selectedColor, setSelectedColor] = useState<string | null>(
    v0?.color ?? null
  );
  const [selectedSize, setSelectedSize] = useState<string | null>(
    v0?.size ?? null
  );

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

  // Sync selectedSize when color changes and we have sizes
  const colorFilteredVariants = selectedColor
    ? product.variants.filter((v) => v.color === selectedColor)
    : product.variants;
  const available = isVariantAvailable(selectedVariant);

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="aspect-square relative bg-muted rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          {product.name}
        </h1>
        {selectedVariant.price !== undefined && selectedVariant.price !== null ? (
          <p className="text-xl text-muted-foreground">
            {formatPriceCOP(selectedVariant.price)}
          </p>
        ) : (
          <p className="text-xl text-muted-foreground">Consultar disponibilidad</p>
        )}
        <p className="text-muted-foreground leading-relaxed">
          {product.description}
        </p>

        <div className="space-y-6 pt-4">
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

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <AddToCartButton
            product={product}
            variant={selectedVariant}
            className="flex-1"
          />
          <div className="flex-1 space-y-1">
            {isWhatsAppConfigured() ? (
              <Button variant="outline" asChild className="w-full">
                <Link
                  href={buildWhatsAppGenericMessage(
                    buildWhatsAppProductInquiry(product, selectedVariant)
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {available &&
                  selectedVariant.price !== undefined &&
                  selectedVariant.price !== null
                    ? "Finalizar por WhatsApp"
                    : "Consultar por WhatsApp"}
                </Link>
              </Button>
            ) : (
              <Button variant="outline" asChild className="w-full">
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

        {!available && (
          <p className="text-sm text-muted-foreground">
            Esta variante no está disponible.
          </p>
        )}
      </div>
    </div>
  );
}
