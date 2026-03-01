"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/stores/cart-store";
import { ShoppingBag, MessageCircle, X, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  buildWhatsAppGenericMessage,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";

const SHOP_CATEGORIES = [
  { href: "/shop/women", label: "Mujeres" },
  { href: "/shop/men", label: "Hombres" },
  { href: "/shop/headwear", label: "Gorras" },
  { href: "/shop/kids", label: "Niños" },
  { href: "/shop", label: "Ver todo" },
];

const COLLECTION_LINKS = [
  { href: "/collections", label: "Ver todas" },
];

type DropdownId = "tienda" | "colecciones" | null;

const navItems: {
  id: DropdownId;
  href: string;
  label: string;
  hasDropdown: boolean;
}[] = [
  { id: "tienda", href: "/shop", label: "Tienda", hasDropdown: true },
  { id: "colecciones", href: "/collections", label: "Colecciones", hasDropdown: true },
  { id: null, href: "/brand", label: "Marca", hasDropdown: false },
  { id: null, href: "/customer-care", label: "Atención", hasDropdown: false },
];

const mobileNavLinks = [
  { href: "/shop", label: "Tienda" },
  { href: "/shop/women", label: "Mujeres", indent: true },
  { href: "/shop/men", label: "Hombres", indent: true },
  { href: "/shop/headwear", label: "Gorras", indent: true },
  { href: "/shop/kids", label: "Niños", indent: true },
  { href: "/collections", label: "Colecciones" },
  { href: "/brand", label: "Marca" },
  { href: "/customer-care", label: "Atención" },
];

function DesktopDropdown({
  items,
  visible,
}: {
  items: { href: string; label: string }[];
  visible: boolean;
}) {
  return (
    <div
      className={`absolute top-full left-0 pt-2 transition-all duration-200 ease-out ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-1 pointer-events-none"
      }`}
    >
      <div className="bg-background/98 backdrop-blur-sm border border-border/60 rounded-md shadow-lg py-2 min-w-[180px]">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block px-5 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors duration-150"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<DropdownId>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const itemCount = useCartStore((s) =>
    s.items.reduce((n, i) => n + i.quantity, 0)
  );

  const openDropdown = useCallback((id: DropdownId) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setActiveDropdown(id);
  }, []);

  const scheduleClose = useCallback(() => {
    closeTimerRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const dropdownContent: Record<string, { href: string; label: string }[]> = {
    tienda: SHOP_CATEGORIES,
    colecciones: COLLECTION_LINKS,
  };

  const contactHref = isWhatsAppConfigured()
    ? buildWhatsAppGenericMessage("Hola")
    : FALLBACK_CONTACT_URL;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          {/* Left: hamburger + logo */}
          <div className="flex items-center gap-3">
            <button
              aria-label="Abrir menú"
              onClick={() => setMobileOpen(true)}
              className="p-1.5 -ml-1.5 text-foreground hover:text-foreground/70 transition-colors"
            >
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            </button>
            <Link href="/" className="font-bold text-xl tracking-tight">
              LADELGORILA
            </Link>
          </div>

          {/* Center: desktop nav with dropdowns */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() =>
                  item.hasDropdown ? openDropdown(item.id) : setActiveDropdown(null)
                }
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-colors duration-150 ${
                    activeDropdown === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {/* Active indicator line */}
                  <span
                    className={`absolute bottom-0 left-4 right-4 h-[1.5px] bg-foreground transition-transform duration-200 origin-left ${
                      activeDropdown === item.id
                        ? "scale-x-100"
                        : "scale-x-0"
                    }`}
                  />
                </Link>
                {item.hasDropdown && item.id && (
                  <DesktopDropdown
                    items={dropdownContent[item.id] ?? []}
                    visible={activeDropdown === item.id}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Right: actions */}
          <div className="flex items-center gap-1 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              asChild
              aria-label={isWhatsAppConfigured() ? "WhatsApp" : "Contacto"}
            >
              <Link href={contactHref} target="_blank" rel="noopener noreferrer">
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

      {/* Mobile sidebar overlay + drawer (ALD-style) */}
      <div
        className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        aria-hidden={!mobileOpen}
      >
        {/* Scrim */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer panel */}
        <nav
          className={`absolute inset-y-0 left-0 w-[300px] max-w-[85vw] bg-background flex flex-col transition-transform duration-300 ease-out ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          aria-label="Navegación principal"
        >
          {/* Close button */}
          <div className="flex items-center justify-end h-16 px-5">
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 -mr-2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Nav links */}
          <div className="flex-1 px-8 pb-8 overflow-y-auto">
            <ul className="space-y-1">
              {mobileNavLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block py-3 font-medium tracking-wide transition-colors duration-150 hover:text-foreground ${
                      "indent" in link && link.indent
                        ? "text-[13px] text-muted-foreground pl-4"
                        : "text-[15px] text-foreground uppercase"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bottom section */}
          <div className="mt-auto px-8 py-8 border-t border-border/50 space-y-5">
            <div className="space-y-2">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {isWhatsAppConfigured() ? "Pedidos por WhatsApp" : "Contacto"}
              </p>
              <p className="text-xs text-muted-foreground">
                Lun–Sáb · 9:00–18:00
              </p>
            </div>
            <a
              href={
                isWhatsAppConfigured()
                  ? buildWhatsAppGenericMessage("Hola, quisiera hacer un pedido")
                  : FALLBACK_CONTACT_URL
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="block w-full text-center py-2.5 text-sm font-medium bg-foreground text-background rounded-md hover:bg-foreground/90 transition-colors"
            >
              {isWhatsAppConfigured() ? "Escríbenos" : "Contáctanos por Instagram"}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
