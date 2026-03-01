import type { OrderDraft } from "@/types";
import type { Product, ProductVariant } from "@/types";
import { formatPriceCOP } from "./format";

const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim() || "573001112233";

/** True when WhatsApp is configured. False when env is missing or placeholder. */
export function isWhatsAppConfigured(): boolean {
  const raw = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  return !!raw && raw.length >= 10;
}

/** Fallback contact URL when WhatsApp is not configured. */
export const FALLBACK_CONTACT_URL =
  process.env.NEXT_PUBLIC_INSTAGRAM_URL || "https://instagram.com";

/** Pure: no state mutation, deterministic output from cart + form data. */
export function buildWhatsAppCheckoutUrl(order: OrderDraft): string {
  const deliveryLabel =
    order.customer.deliveryPreference === "delivery" ? "Domicilio" : "Recoger";

  const clienteBlock = [
    "*Cliente:*",
    `Nombre: ${order.customer.name}`,
    `Ciudad: ${order.customer.city}`,
    `Dirección: ${order.customer.address}`,
    `Entrega: ${deliveryLabel}`,
  ].join("\n");

  const productLines = order.items.map((item) => {
    const variantLabel = [item.variant.color, item.variant.size]
      .filter(Boolean)
      .join(" / ");
    const variantStr = variantLabel ? ` (${variantLabel})` : "";
    const priceStr =
      item.variant.price !== undefined && item.variant.price !== null
        ? ` — ${formatPriceCOP(item.variant.price * item.quantity)}`
        : "";
    return `• ${item.product.name}${variantStr} x${item.quantity}${priceStr}`;
  });
  const productosBlock = ["*Productos:*", ...productLines].join("\n");

  const subtotal = order.items.every(
    (i) => i.variant.price !== undefined && i.variant.price !== null
  )
    ? order.items.reduce(
        (sum, i) => sum + (i.variant.price ?? 0) * i.quantity,
        0
      )
    : null;

  const sections: string[] = [
    "*LADELGORILA — Pedido por WhatsApp*",
    clienteBlock,
    productosBlock,
  ];

  if (subtotal !== null) {
    sections.push(`*Total:* ${formatPriceCOP(subtotal)}`);
  }

  if (order.customer.notes.trim()) {
    sections.push(`*Notas:*\n${order.customer.notes.trim()}`);
  }

  sections.push("¿Me confirmas disponibilidad y tiempo de entrega?");

  const message = sections.join("\n\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/**
 * Pure: no state mutation, deterministic output.
 * Spanish-first, readable, actionable.
 */
export function buildWhatsAppProductInquiry(
  product: Product,
  variant: ProductVariant
): string {
  const variantLabel = [variant.color, variant.size]
    .filter(Boolean)
    .join(" / ");
  const variantStr = variantLabel ? ` (${variantLabel})` : "";

  const message = [
    "*LADELGORILA — Consulta*",
    `Hola, me interesa:\n• ${product.name}${variantStr}`,
    "¿Me confirmas disponibilidad y tiempo de entrega?",
  ].join("\n\n");

  return message;
}

export function buildWhatsAppGenericMessage(text: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
