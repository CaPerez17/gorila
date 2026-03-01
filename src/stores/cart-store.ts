"use client";

import { create } from "zustand";
import type { Product, ProductVariant, CartItem } from "@/types";

interface CartState {
  items: CartItem[];
  addItem: (
    product: Product,
    variant: ProductVariant,
    quantity?: number
  ) => void;
  updateQty: (productId: string, variantId: string, quantity: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  getSubtotal: () => number | null;
}

function findItem(
  items: CartItem[],
  productId: string,
  variantId: string
): CartItem | undefined {
  return items.find(
    (i) => i.productId === productId && i.variantId === variantId
  );
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  /**
   * Idempotent add: same product+variant updates quantity instead of duplicating.
   * UI should guard against rapid repeated calls (e.g. debounce/disable on AddToCart).
   */
  addItem: (product, variant, quantity = 1) => {
    set((state) => {
      const existing = findItem(state.items, product.id, variant.id);
      if (existing) {
        // Idempotency: same product+variant updates qty instead of duplicating
        return {
          items: state.items.map((i) =>
            i.productId === product.id && i.variantId === variant.id
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return {
        items: [
          ...state.items,
          { productId: product.id, variantId: variant.id, quantity, product, variant },
        ],
      };
    });
  },

  updateQty: (productId, variantId, quantity) => {
    if (quantity < 1) {
      get().removeItem(productId, variantId);
      return;
    }
    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId && i.variantId === variantId
          ? { ...i, quantity }
          : i
      ),
    }));
  },

  removeItem: (productId, variantId) => {
    set((state) => ({
      items: state.items.filter(
        (i) => !(i.productId === productId && i.variantId === variantId)
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getSubtotal: () => {
    const items = get().items;
    const hasPrice = items.every(
      (i) => i.variant.price !== undefined && i.variant.price !== null
    );
    if (!hasPrice) return null;
    return items.reduce(
      (sum, i) => sum + (i.variant.price ?? 0) * i.quantity,
      0
    );
  },
}));
