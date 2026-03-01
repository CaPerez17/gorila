"use client";

import Link from "next/link";
import Image from "next/image";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

const SLIDES = [
  {
    id: "god-is-first",
    title: "God Is First",
    subtitle: "Colección fundadora",
    href: "/collections/god-is-first",
    cta: "Ver colección",
    imageUrl: "/placeholders/collection.svg",
  },
  {
    id: "new-drop",
    title: "Nuevo drop",
    subtitle: "Últimas piezas",
    href: "/collections/new-arrivals",
    cta: "Explorar el drop",
    imageUrl: "/placeholders/collection.svg",
  },
];

export function LookbookRail() {
  const imageSrc = (path: string | undefined) =>
    path?.startsWith("/") || path?.startsWith("http") ? path! : PLACEHOLDER_IMAGE;

  return (
    <section className="py-12 md:py-16">
      <div className="overflow-x-auto snap-x snap-mandatory scrollbar-hide flex gap-4 md:gap-6 px-4 md:px-6 pb-4">
        {SLIDES.map((slide) => (
          <div
            key={slide.id}
            className="snap-center shrink-0 w-[85vw] md:w-[45vw] lg:w-[35vw]"
          >
            <Link href={slide.href} className="group block">
              <div className="aspect-[3/4] relative bg-muted rounded-lg overflow-hidden mb-4">
                <Image
                  src={imageSrc(slide.imageUrl)}
                  alt={slide.title}
                  fill
                  className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
                  sizes="(max-width: 768px) 85vw, (max-width: 1024px) 45vw, 35vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111]/80 via-transparent to-transparent flex items-end p-6">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-widest text-white/80 mb-1">
                      {slide.subtitle}
                    </p>
                    <p className="text-2xl font-bold text-white">
                      {slide.title}
                    </p>
                  </div>
                </div>
              </div>
              <span className="text-sm font-medium underline underline-offset-4">
                {slide.cta}
              </span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
