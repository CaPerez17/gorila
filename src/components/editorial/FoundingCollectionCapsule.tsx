import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getFoundingCollection } from "@/lib/data/collections";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export async function FoundingCollectionCapsule() {
  const collection = await getFoundingCollection();
  if (!collection) return null;

  const imageSrc =
    collection.imageUrl?.startsWith("/") ||
    collection.imageUrl?.startsWith("http")
      ? collection.imageUrl
      : PLACEHOLDER_IMAGE;

  return (
    <section className="container py-16 md:py-24 px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div className="aspect-[4/3] relative bg-muted rounded-lg overflow-hidden">
          <Image
            src={imageSrc}
            alt={collection.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mb-2">
            Colección fundadora
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {collection.name}
          </h2>
          <p className="text-lg text-foreground leading-relaxed mb-2">
            La colección fundadora. Donde comenzó todo. Disciplina, lealtad y
            street made — desde Córdoba, Colombia.
          </p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">
            The founding collection. Where it began.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button asChild>
              <Link href={`/collections/${collection.slug}`}>
                Ver colección
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/lookbook/god-is-first">Leer el origen</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
