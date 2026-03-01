import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const EDITORIAL_PLACEHOLDER = "/placeholders/collection.svg";

const EDITORIAL_BLOCKS = [
  {
    id: "disciplina",
    imageFirst: true,
    text: "La disciplina no se pide prestada. Se construye cada mañana. En el gimnasio, en la calle, en las decisiones que nadie ve. God Is First nació de esa rutina — sin atajos, sin excusas.",
  },
  {
    id: "lealtad",
    imageFirst: false,
    text: "Lealtad al proceso. A la gente que te levanta. Al barrio que te formó. Esta colección es un tributo a quienes se presentan cuando no hay cámaras.",
  },
  {
    id: "cordoba",
    imageFirst: true,
    text: "Córdoba, Colombia. Origen. Donde el calor y el concreto se mezclan con la disciplina. De ahí salió todo — Bodies, t-shirts, gorras. Hecho para entrenar, diseñado para durar.",
  },
];

export const metadata = {
  title: "God Is First — LADELGORILA",
  description:
    "La colección fundadora. Donde empezó todo. Disciplina, lealtad y street made desde Córdoba, Colombia.",
};

export default function GodIsFirstLookbookPage() {
  return (
    <article className="min-h-screen">
      {/* Intro */}
      <header className="container py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-2xl">
          <h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            God Is First
          </h1>
          <p className="text-xl md:text-2xl text-foreground leading-relaxed mb-2">
            La colección fundadora. Donde empezó todo.
          </p>
          <p className="text-sm text-muted-foreground">
            The founding collection.
          </p>
        </div>
      </header>

      {/* Editorial blocks */}
      <div className="space-y-24 md:space-y-32">
        {EDITORIAL_BLOCKS.map((block) => (
          <section
            key={block.id}
            className="container px-4 md:px-6"
          >
            <div
              className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
                block.imageFirst ? "" : "md:grid-flow-dense"
              }`}
            >
              <div
                className={`relative aspect-[4/5] md:aspect-[3/4] bg-muted rounded-lg overflow-hidden ${
                  block.imageFirst ? "" : "md:col-start-2"
                }`}
              >
                <Image
                  src={EDITORIAL_PLACEHOLDER}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={block.imageFirst ? "" : "md:col-start-1 md:row-start-1"}>
                <p className="text-lg md:text-xl leading-relaxed text-foreground">
                  {block.text}
                </p>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Full-width image break */}
      <section className="w-full mt-24 md:mt-32">
        <div className="relative aspect-[16/9] md:aspect-[21/9] bg-muted">
          <Image
            src={EDITORIAL_PLACEHOLDER}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </section>

      {/* Quote block */}
      <section className="container py-24 md:py-32 px-4 md:px-6">
        <blockquote className="max-w-3xl">
          <p
            className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-foreground"
            style={{ fontFamily: "var(--font-display)" }}
          >
            &ldquo;La disciplina no se negocia.&rdquo;
          </p>
          <cite className="mt-6 block text-sm text-muted-foreground not-italic">
            Córdoba, Colombia.
          </cite>
        </blockquote>
      </section>

      {/* Soft product presence */}
      <section className="container px-4 md:px-6 pb-16">
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-foreground mb-6">
            Bodies. T-shirts. Gorras. Piezas esenciales para quienes entrenan sin
            concesiones.{" "}
            <Link
              href="/collections/god-is-first"
              className="underline underline-offset-4 hover:text-foreground/80 transition-colors duration-150 ease-out"
            >
              Ver la colección God Is First
            </Link>
          </p>
        </div>
      </section>

      {/* Closing section */}
      <section className="container py-24 md:py-32 px-4 md:px-6 border-t border-border">
        <div className="max-w-2xl">
          <p
            className="text-2xl md:text-3xl font-semibold tracking-tight leading-snug text-foreground mb-10"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Esto no fue una tendencia. Fue el inicio.
          </p>
          <Button asChild size="lg">
            <Link href="/collections/god-is-first">
              Ver la colección God Is First
            </Link>
          </Button>
        </div>
      </section>
    </article>
  );
}
