"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart-store";
import type { Product, ProductVariant } from "@/types";
import { isVariantAvailable } from "@/types";

const ADD_COOLDOWN_MS = 400;

interface AddToCartButtonProps {
  product: Product;
  variant: ProductVariant;
  quantity?: number;
  /** When true, does not navigate to /cart after adding (e.g. for Quick View drawer) */
  skipNavigation?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AddToCartButton({
  product,
  variant,
  quantity = 1,
  skipNavigation = false,
  className,
  children,
}: AddToCartButtonProps) {
  const addItem = useCartStore((s) => s.addItem);
  const router = useRouter();
  const available = isVariantAvailable(variant);
  const [isAdding, setIsAdding] = useState(false);

  const handleClick = useCallback(() => {
    if (!available || isAdding) return;
    setIsAdding(true);
    addItem(product, variant, quantity);
    if (!skipNavigation) router.push("/cart");
    setTimeout(() => setIsAdding(false), ADD_COOLDOWN_MS);
  }, [available, isAdding, addItem, product, variant, quantity, skipNavigation, router]);

  return (
    <Button
      onClick={handleClick}
      disabled={!available || isAdding}
      className={className}
    >
      {children ?? "Añadir al carrito"}
    </Button>
  );
}
