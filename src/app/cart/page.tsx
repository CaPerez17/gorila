"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/stores/cart-store";
import {
  buildWhatsAppCheckoutUrl,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";
import { formatPriceCOP } from "@/lib/format";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";
import type { OrderDraftCustomer } from "@/types";

const initialCustomer: OrderDraftCustomer = {
  name: "",
  city: "",
  address: "",
  notes: "",
  deliveryPreference: "delivery",
};

export default function CartPage() {
  const { items, updateQty, removeItem, getSubtotal } = useCartStore();
  const [customer, setCustomer] = useState<OrderDraftCustomer>(initialCustomer);
  const [isOpening, setIsOpening] = useState(false);

  const subtotal = getSubtotal();
  const isEmpty = items.length === 0;
  const whatsAppReady = isWhatsAppConfigured();

  const handleCheckout = useCallback(() => {
    if (isOpening) return;
    setIsOpening(true);
    const url = whatsAppReady
      ? buildWhatsAppCheckoutUrl({ items, customer })
      : FALLBACK_CONTACT_URL;
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => setIsOpening(false), 1500);
  }, [isOpening, whatsAppReady, items, customer]);

  const imageSrc = (path: string | undefined) =>
    path?.startsWith("/") || path?.startsWith("http") ? path : PLACEHOLDER_IMAGE;

  if (isEmpty) {
    return (
      <div className="container py-12 md:py-16">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">Carrito</h1>
        <div className="max-w-xl">
          <p className="text-muted-foreground mb-8 text-lg">
            Tu carrito está vacío. Añade productos desde la tienda para comenzar.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Seguir comprando</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10">Carrito</h1>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <ul className="space-y-6">
            {items.map((item) => (
              <li
                key={`${item.productId}-${item.variantId}`}
                className="flex gap-6 pb-6 border-b last:border-0"
              >
                <div className="relative w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={imageSrc(item.variant.imageUrl ?? item.product.images[0])}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {[item.variant.color, item.variant.size]
                      .filter(Boolean)
                      .join(" / ")}
                  </p>
                  {item.variant.price !== undefined &&
                    item.variant.price !== null && (
                      <p className="text-sm mt-1">
                        {formatPriceCOP(item.variant.price * item.quantity)}
                      </p>
                    )}
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex items-center gap-1 border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQty(item.productId, item.variantId, item.quantity - 1)
                      }
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() =>
                        updateQty(item.productId, item.variantId, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => removeItem(item.productId, item.variantId)}
                    aria-label="Eliminar"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border p-6 space-y-6">
            <h2 className="font-semibold text-lg">Datos de entrega</h2>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Nombre</Label>
                <Input
                  id="name"
                  value={customer.name}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, name: e.target.value }))
                  }
                  placeholder="Tu nombre"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="city">Ciudad</Label>
                <Input
                  id="city"
                  value={customer.city}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, city: e.target.value }))
                  }
                  placeholder="Ciudad"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="address">Dirección</Label>
                <Input
                  id="address"
                  value={customer.address}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, address: e.target.value }))
                  }
                  placeholder="Dirección completa"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="notes">Notas</Label>
                <Textarea
                  id="notes"
                  value={customer.notes}
                  onChange={(e) =>
                    setCustomer((c) => ({ ...c, notes: e.target.value }))
                  }
                  placeholder="Instrucciones de entrega, etc."
                  className="mt-1 min-h-[80px]"
                />
              </div>
              <div>
                <Label htmlFor="delivery">Preferencia de entrega</Label>
                <Select
                  value={customer.deliveryPreference}
                  onValueChange={(v: "pickup" | "delivery") =>
                    setCustomer((c) => ({ ...c, deliveryPreference: v }))
                  }
                >
                  <SelectTrigger id="delivery" className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="delivery">Domicilio</SelectItem>
                    <SelectItem value="pickup">Recoger</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {subtotal !== null && (
              <p className="text-lg font-semibold pt-4 border-t">
                Total: {formatPriceCOP(subtotal)}
              </p>
            )}

            {whatsAppReady ? (
              <Button
                size="lg"
                className="w-full"
                onClick={handleCheckout}
                disabled={isOpening}
              >
                Finalizar por WhatsApp
              </Button>
            ) : (
              <Button size="lg" className="w-full" asChild>
                <a
                  href={FALLBACK_CONTACT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp aún no configurado. Contáctanos por Instagram.
                </a>
              </Button>
            )}
            {whatsAppReady && (
              <p className="text-xs text-muted-foreground/80 text-center">
                Confirmamos disponibilidad y envío.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
