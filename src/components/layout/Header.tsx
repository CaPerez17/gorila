"use client";

import { useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingBag, MessageCircle, Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  buildWhatsAppGenericMessage,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";

const navLinks = [
  { href: "/shop", label: "Tienda" },
  { href: "/collections", label: "Colecciones" },
  { href: "/brand", label: "Marca" },
  { href: "/customer-care", label: "Atención" },
];

const mobileNavLinks = [
  { href: "/shop", label: "Tienda" },
  { href: "/collections", label: "Colecciones" },
  { href: "/brand", label: "Marca" },
  { href: "/customer-care", label: "Atención" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              overlayClassName="glass-scrim"
              className="glass bg-transparent w-full max-w-[320px] border-r border-white/10 p-0 gap-0"
            >
              <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
              <div className="flex flex-col h-full overflow-y-auto scrollbar-hide">
                <div className="flex-1 px-6 pt-16 pb-8">
                  <nav
                    className="flex flex-col gap-8"
                    aria-label="Navegación principal"
                  >
                    {mobileNavLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="text-base font-medium text-foreground hover:text-foreground/80 transition-colors duration-150 ease-out"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </nav>
                </div>
                <div className="mt-auto px-6 py-8 border-t border-white/10 space-y-4">
                  <p className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {isWhatsAppConfigured()
                      ? "Pedidos por WhatsApp"
                      : "Contacto"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Lun–Sáb · 9:00–18:00
                  </p>
                  <Button asChild size="sm" className="w-full">
                    <Link
                      href={
                        isWhatsAppConfigured()
                          ? buildWhatsAppGenericMessage("Hola, quisiera hacer un pedido")
                          : FALLBACK_CONTACT_URL
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileOpen(false)}
                    >
                      {isWhatsAppConfigured()
                        ? "Escríbenos"
                        : "WhatsApp aún no configurado. Contáctanos por Instagram."}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/" className="font-bold text-xl tracking-tight">
            LADELGORILA
          </Link>
        </div>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar..."
              className="w-full h-9 pl-9 pr-4 rounded-md border border-input bg-transparent text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              aria-label="Buscar productos"
            />
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 shrink-0">
          <Button variant="ghost" size="icon" asChild aria-label={isWhatsAppConfigured() ? "WhatsApp" : "Contacto"}>
            <Link
              href={
                isWhatsAppConfigured()
                  ? buildWhatsAppGenericMessage("Hola")
                  : FALLBACK_CONTACT_URL
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild aria-label="Carrito">
            <Link href="/cart" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center rounded-full bg-foreground text-background text-xs px-1">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
