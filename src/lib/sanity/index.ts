import { client, isSanityConfigured } from "./client";

export { isSanityConfigured };
import {
  siteSettingsQuery,
  productsQuery,
  productsByCategoryQuery,
  productBySlugQuery,
  productsByIdsQuery,
  collectionsQuery,
  collectionBySlugQuery,
  dropsQuery,
  foundingCollectionQuery,
  timelineQuery,
  lookbooksQuery,
  lookbookBySlugQuery,
} from "./queries";
import type { Product, ProductVariant, Collection, TimelineEvent } from "@/types";

type SanityProduct = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  productType: string;
  images?: string[];
  variants?: {
    _key: string;
    id?: string;
    sku: string;
    color?: string;
    size?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
  }[];
  _createdAt?: string;
};

function mapSanityProductToProduct(doc: SanityProduct): Product {
  const images =
    doc.images?.filter((url): url is string => !!url) ?? [];
  const variants: ProductVariant[] =
    doc.variants?.map((v, i) => ({
      id: v.id || v._key || `var-${i}`,
      sku: v.sku,
      color: v.color,
      size: v.size,
      price: v.price,
      stock: v.stock,
      imageUrl: v.imageUrl,
    })) ?? [];
  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    category: doc.category as Product["category"],
    productType: doc.productType,
    variants,
    images: images.length > 0 ? images : ["/placeholders/product.svg"],
    collectionIds: [],
    createdAt: doc._createdAt || new Date().toISOString(),
  };
}

export async function getSiteSettings() {
  if (!isSanityConfigured) return null;
  try {
    return await client.fetch(siteSettingsQuery);
  } catch {
    return null;
  }
}

export async function getProducts(options?: {
  category?: Product["category"];
  collectionId?: string;
}) {
  try {
    let docs: SanityProduct[];
    if (options?.category) {
      docs = await client.fetch(productsByCategoryQuery, {
        category: options.category,
      });
    } else {
      docs = await client.fetch(productsQuery);
    }
    if (options?.collectionId && docs) {
      const coll = await client.fetch(
        `*[_type == "collection" && _id == $id][0]{ "productIds": products[]->_id }`,
        { id: options.collectionId }
      );
      const ids = coll?.productIds ?? [];
      docs = docs.filter((p) => ids.includes(p._id));
    }
    return (docs ?? []).map(mapSanityProductToProduct);
  } catch {
    return [];
  }
}

export async function getProductBySlug(
  category: Product["category"],
  slug: string
): Promise<Product | null> {
  try {
    const doc = await client.fetch(productBySlugQuery, { category, slug });
    return doc ? mapSanityProductToProduct(doc) : null;
  } catch {
    return null;
  }
}

export async function getProductsByIds(ids: string[]): Promise<Product[]> {
  if (ids.length === 0) return [];
  try {
    const docs = await client.fetch(productsByIdsQuery, { ids });
    return (docs ?? []).map(mapSanityProductToProduct);
  } catch {
    return [];
  }
}

type SanityCollection = {
  _id: string;
  slug: string;
  name: string;
  description: string;
  type: string;
  imageUrl?: string;
  productIds?: string[];
};

function mapToCollection(doc: SanityCollection): Collection {
  return {
    id: doc._id,
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    productIds: doc.productIds ?? [],
    imageUrl: doc.imageUrl,
    type: doc.type === "drop" ? "drop" : "collection",
  };
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const docs = await client.fetch(collectionsQuery);
    return (docs ?? []).map(mapToCollection);
  } catch {
    return [];
  }
}

export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  try {
    const doc = await client.fetch(collectionBySlugQuery, { slug });
    return doc ? mapToCollection(doc) : null;
  } catch {
    return null;
  }
}

export async function getDrops(): Promise<Collection[]> {
  try {
    const docs = await client.fetch(dropsQuery);
    return (docs ?? []).map(mapToCollection);
  } catch {
    return [];
  }
}

export async function getFoundingCollection(): Promise<Collection | null> {
  try {
    const doc = await client.fetch(foundingCollectionQuery);
    return doc ? mapToCollection(doc) : null;
  } catch {
    return null;
  }
}

export async function getTimeline(): Promise<TimelineEvent[]> {
  try {
    const docs = await client.fetch(timelineQuery);
    return (docs ?? []).map((d: { _id: string; imageUrl?: string; titleEn?: string; descriptionEn?: string } & TimelineEvent) => ({
      id: d._id,
      year: d.year,
      title: d.titleEn ?? d.title,
      titleEs: d.title,
      description: d.descriptionEn ?? d.description,
      descriptionEs: d.description,
      imageUrl: d.imageUrl,
    }));
  } catch {
    return [];
  }
}

export async function getLookbooks() {
  try {
    return await client.fetch(lookbooksQuery);
  } catch {
    return [];
  }
}

export async function getLookbookBySlug(slug: string) {
  try {
    return await client.fetch(lookbookBySlugQuery, { slug });
  } catch {
    return null;
  }
}
