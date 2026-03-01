import Link from "next/link";
import {
  buildWhatsAppGenericMessage,
  isWhatsAppConfigured,
  FALLBACK_CONTACT_URL,
} from "@/lib/whatsapp";

export default function CustomerCarePage() {
  const contactUrl = isWhatsAppConfigured()
    ? buildWhatsAppGenericMessage("Hola, tengo una pregunta")
    : FALLBACK_CONTACT_URL;
  const contactLabel = isWhatsAppConfigured()
    ? "Pedir por WhatsApp"
    : "WhatsApp aún no configurado. Contáctanos por Instagram.";

  return (
    <div className="container py-12 md:py-16 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-12">Atención</h1>

      <div className="max-w-2xl space-y-16">
        <section id="contact">
          <h2 className="text-xl font-semibold mb-4">Contacto</h2>
          <p className="text-muted-foreground mb-4">
            {isWhatsAppConfigured()
              ? "Escríbenos por WhatsApp para pedidos, preguntas o soporte."
              : "WhatsApp aún no configurado. Contáctanos por Instagram."}
          </p>
          <a
            href={contactUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            {contactLabel}
          </a>
        </section>

        <section id="shipping">
          <h2 className="text-xl font-semibold mb-4">Envíos</h2>
          <p className="text-muted-foreground">
            Enviamos a todo Colombia. Los tiempos varían según la ubicación.
            Contáctanos para envíos internacionales.
          </p>
        </section>

        <section id="faq">
          <h2 className="text-xl font-semibold mb-4">Preguntas frecuentes</h2>
          <p className="text-muted-foreground">
            Las preguntas más comunes se añadirán aquí. Por ahora, escríbenos por
            WhatsApp con cualquier duda.
          </p>
        </section>
      </div>
    </div>
  );
}
