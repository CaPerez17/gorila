import Link from "next/link";
import {
  buildWhatsAppGenericMessage,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";

const footerLinks = [
  { href: "/customer-care", label: "Contacto" },
  { href: "/customer-care#shipping", label: "Envíos" },
  { href: "/customer-care#faq", label: "Preguntas" },
  { href: "/shop", label: "Tienda" },
  { href: "/collections", label: "Colecciones" },
  { href: "/brand", label: "Marca" },
];

export function Footer() {
  const contactUrl = isWhatsAppConfigured()
    ? buildWhatsAppGenericMessage("Hola, tengo una pregunta")
    : FALLBACK_CONTACT_URL;
  const contactLabel = isWhatsAppConfigured()
    ? "Pedir por WhatsApp"
    : "WhatsApp aún no configurado. Contáctanos por Instagram.";

  return (
    <footer className="border-t bg-muted/30">
      <div className="container py-16 px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link
              href="/"
              className="font-bold text-xl tracking-tight block mb-4"
            >
              LADELGORILA
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Disciplina. Lealtad. Calle. — Desde Córdoba al mundo.
            </p>
            <a
              href={contactUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:underline"
            >
              {contactLabel}
            </a>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Atención al cliente</h3>
            <ul className="space-y-3">
              {footerLinks.slice(0, 3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Tienda</h3>
            <ul className="space-y-3">
              {footerLinks.slice(3).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Síguenos</h3>
            <p className="text-sm text-muted-foreground">
              Instagram, TikTok — próximamente.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground space-y-1">
          {(() => {
            const isPreview =
              process.env.NEXT_PUBLIC_SITE_URL?.includes("vercel.app") ||
              process.env.PREVIEW_MODE === "true" ||
              process.env.VERCEL_ENV === "preview";
            return isPreview ? (
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground/70">
                Vista previa para revisión
              </p>
            ) : null;
          })()}
          <p>© {new Date().getFullYear()} LADELGORILA. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
