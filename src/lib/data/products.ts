import type { Product } from "@/types";
import productsData from "../../../data/products.json";
import {
  getProducts as getSanityProducts,
  getProductBySlug as getSanityProductBySlug,
  getProductsByIds as getSanityProductsByIds,
} from "@/lib/sanity";

const products = productsData as Product[];

import { isSanityConfigured } from "@/lib/sanity";

const useSanity = isSanityConfigured;

export async function getAllProducts(): Promise<Product[]> {
  if (useSanity) {
    const sanityProducts = await getSanityProducts();
    if (sanityProducts.length > 0) return sanityProducts;
  }
  return products;
}

export async function getProductsByCategory(
  category: Product["category"]
): Promise<Product[]> {
  if (useSanity) {
    const sanityProducts = await getSanityProducts({ category });
    if (sanityProducts.length > 0) return sanityProducts;
  }
  return products.filter((p) => p.category === category);
}

export async function getProductBySlug(
  category: Product["category"],
  slug: string
): Promise<Product | undefined> {
  if (useSanity) {
    const product = await getSanityProductBySlug(category, slug);
    if (product) return product;
  }
  return products.find(
    (p) => p.category === category && p.slug === slug
  );
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (useSanity && ids.length > 0) {
    const sanityProducts = await getSanityProductsByIds(ids);
    if (sanityProducts.length > 0) return sanityProducts;
  }
  return products.filter((p) => ids.includes(p.id));
}
