import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getFoundingCollection } from "@/lib/data/collections";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export async function CollectionPreviewHero() {
  const collection = await getFoundingCollection();
  if (!collection) return null;

  const imageSrc =
    collection.imageUrl?.startsWith("/") ||
    collection.imageUrl?.startsWith("http")
      ? collection.imageUrl
      : PLACEHOLDER_IMAGE;

  return (
    <section className="relative min-h-[70vh] flex items-end">
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-[#111]/40"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-cover bg-center opacity-60"
        style={{
          backgroundImage: `url(${imageSrc})`,
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 w-full container px-4 md:px-6 pb-16 md:pb-24 pt-32">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/70 mb-2">
          Founding Collection
        </p>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6 max-w-2xl">
          {collection.name}
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mb-2">
          {collection.description}
        </p>
        <p className="text-sm text-white/60 mb-8 max-w-xl">
          La colección fundadora. Donde comenzó todo. Disciplina, lealtad y
          street made — desde Córdoba, Colombia.
        </p>
        <Button asChild size="lg">
          <Link href={`/collections/${collection.slug}`}>
            Explore the collection
          </Link>
        </Button>
      </div>
    </section>
  );
}
