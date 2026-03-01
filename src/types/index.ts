export interface ProductVariant {
  id: string;
  sku: string;
  color?: string;
  size?: string;
  price?: number;
  stock?: number;
  imageUrl?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  category: "women" | "men" | "headwear" | "kids";
  productType: string;
  variants: ProductVariant[];
  images: string[];
  collectionIds: string[];
  createdAt: string;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description: string;
  productIds: string[];
  imageUrl?: string;
  type?: "drop" | "collection";
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  titleEs?: string;
  description: string;
  descriptionEs?: string;
  imageUrl?: string;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
  product: Product;
  variant: ProductVariant;
}

export interface OrderDraftCustomer {
  name: string;
  city: string;
  address: string;
  notes: string;
  deliveryPreference: "pickup" | "delivery";
}

export interface OrderDraft {
  items: CartItem[];
  customer: OrderDraftCustomer;
}

export type ProductCategory = "women" | "men" | "headwear" | "kids";

/** Variant is available if stock is undefined or > 0 */
export function isVariantAvailable(variant: ProductVariant): boolean {
  return variant.stock === undefined || variant.stock > 0;
}
