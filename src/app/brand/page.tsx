import Image from "next/image";
import { Marquee } from "@/components/editorial/Marquee";
import { getAllTimelineEvents } from "@/lib/data/timeline";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

const MANIFESTO_ES = `Construimos para quienes se presentan. Disciplina sobre excusas. Lealtad al proceso.`;

const MANIFESTO_EN = `We build for those who show up. Discipline over excuses. Loyalty to the grind.`;

export default function BrandPage() {
  const events = getAllTimelineEvents();

  const imageSrc = (path: string | undefined) =>
    path?.startsWith("/") || path?.startsWith("http") ? path! : PLACEHOLDER_IMAGE;

  return (
    <div className="container py-12 md:py-20 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-16">
        Evolución de la marca
      </h1>

      <Marquee variant="secondary" direction="right" />

      <section id="manifesto" className="max-w-2xl mb-24 mt-16">
        <h2 className="text-xl font-semibold mb-6">Manifiesto</h2>
        <p className="text-lg leading-relaxed text-foreground mb-4">
          {MANIFESTO_ES}
        </p>
        <p className="text-sm leading-relaxed text-muted-foreground/80">
          {MANIFESTO_EN}
        </p>
        <p className="text-sm text-muted-foreground mt-6">
          LADELGORILA — desde Córdoba, Colombia al mundo.
        </p>
      </section>

      <section id="timeline">
        <h2 className="text-xl font-semibold mb-12">Línea de tiempo</h2>
        <div className="space-y-16 md:space-y-24">
          {events.map((event) => (
            <div
              key={event.id}
              className="grid md:grid-cols-2 gap-8 md:gap-12 items-start"
            >
              <div className="order-2 md:order-1">
                <p className="text-4xl md:text-5xl font-bold text-[#111] mb-4">
                  {event.year}
                </p>
                <h3 className="text-xl font-semibold mb-1">
                  {event.titleEs ?? event.title}
                </h3>
                {event.titleEs && event.title !== event.titleEs && (
                  <p className="text-sm text-muted-foreground mb-3">
                    {event.title}
                  </p>
                )}
                <p className="text-muted-foreground leading-relaxed">
                  {event.descriptionEs ?? event.description}
                </p>
                {event.descriptionEs && event.description !== event.descriptionEs && (
                  <p className="text-sm text-muted-foreground/70 mt-2">
                    {event.description}
                  </p>
                )}
              </div>
              <div className="order-1 md:order-2 aspect-[4/3] relative bg-muted rounded-lg overflow-hidden">
                <Image
                  src={imageSrc(event.imageUrl)}
                  alt={event.titleEs ?? event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
