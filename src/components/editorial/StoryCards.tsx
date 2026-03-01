"use client";

import Link from "next/link";

const CARDS = [
  {
    id: "cordoba",
    title: "Desde Córdoba, Colombia",
    excerpt: "Origen. Donde nace la disciplina.",
    href: "/brand#manifesto",
  },
  {
    id: "disciplina",
    title: "Disciplina sin excusas",
    excerpt: "Lealtad al proceso. Calle y gimnasio.",
    href: "/brand#manifesto",
  },
  {
    id: "god-is-first",
    title: "God Is First",
    excerpt: "La colección fundadora.",
    href: "/lookbook/god-is-first",
  },
];

export function StoryCards() {
  return (
    <section className="container py-16 md:py-24 px-4 md:px-6">
      <h2 className="text-2xl md:text-3xl font-bold mb-10">La historia</h2>
      <div className="grid md:grid-cols-3 gap-6 md:gap-8">
        {CARDS.map((card) => (
          <Link
            key={card.id}
            href={card.href}
            className="group block p-6 rounded-lg border border-border hover:border-foreground/20 transition-colors duration-150 ease-out"
          >
            <h3 className="font-semibold text-lg mb-2 group-hover:text-foreground/90">
              {card.title}
            </h3>
            <p className="text-sm text-muted-foreground">{card.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
