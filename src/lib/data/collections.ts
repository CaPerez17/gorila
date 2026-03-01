import type { Collection } from "@/types";
import collectionsData from "../../../data/collections.json";
import {
  getCollections as getSanityCollections,
  getCollectionBySlug as getSanityCollectionBySlug,
  getDrops as getSanityDrops,
  getFoundingCollection as getSanityFoundingCollection,
} from "@/lib/sanity";

const collections = collectionsData as Collection[];

import { isSanityConfigured } from "@/lib/sanity";

const useSanity = isSanityConfigured;

export async function getAllCollections(): Promise<Collection[]> {
  if (useSanity) {
    const sanityCollections = await getSanityCollections();
    if (sanityCollections.length > 0) return sanityCollections;
  }
  return collections;
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug);
}

export async function getCollectionBySlugAsync(
  slug: string
): Promise<Collection | undefined> {
  if (useSanity) {
    const found = await getSanityCollectionBySlug(slug);
    if (found) return found;
  }
  return collections.find((c) => c.slug === slug);
}

export function getCollectionById(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export async function getDrops(): Promise<Collection[]> {
  if (useSanity) {
    const sanityDrops = await getSanityDrops();
    if (sanityDrops.length > 0) return sanityDrops;
  }
  return collections.filter((c) => c.type === "drop");
}

export async function getHistoricalCollections(): Promise<Collection[]> {
  if (useSanity) {
    const all = await getSanityCollections();
    const historical = all.filter((c) => c.type === "collection");
    if (historical.length > 0) return historical;
  }
  return collections.filter((c) => c.type === "collection");
}

export async function getFoundingCollection(): Promise<Collection | undefined> {
  if (useSanity) {
    const founding = await getSanityFoundingCollection();
    if (founding) return founding;
  }
  return collections.find((c) => c.slug === "god-is-first");
}
