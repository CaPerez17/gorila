import Link from "next/link";
import Image from "next/image";
import {
  getDrops,
  getHistoricalCollections,
} from "@/lib/data/collections";
import { Marquee } from "@/components/editorial/Marquee";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default async function CollectionsPage() {
  const [drops, collections] = await Promise.all([
    getDrops(),
    getHistoricalCollections(),
  ]);
  const imageSrc = (path: string | undefined) =>
    path?.startsWith("/") || path?.startsWith("http") ? path! : PLACEHOLDER_IMAGE;

  return (
    <div className="container py-12 md:py-16 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-12">
        Colecciones
      </h1>

      <Marquee variant="secondary" direction="right" />

      {(!drops || drops.length === 0) && (!collections || collections.length === 0) && (
        <p className="text-muted-foreground py-12">
          No hay colecciones disponibles por el momento.
        </p>
      )}

      {drops && drops.length > 0 && (
        <section className="mb-16 mt-12">
          <h2 className="text-xl font-semibold mb-2">Drops</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Selecciones curadas. Nuevos, más vendidos, esenciales.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {drops.map((drop) => (
              <Link
                key={drop.id}
                href={`/collections/${drop.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] relative bg-muted rounded-lg overflow-hidden mb-4">
                  <Image
                    src={imageSrc(drop.imageUrl)}
                    alt={drop.name}
                    fill
                    className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#111]/50 flex items-end p-6">
                    <span className="font-semibold text-white text-lg">
                      {drop.name}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {drop.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {collections && collections.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-semibold mb-2">Colecciones</h2>
          <p className="text-muted-foreground mb-8 max-w-xl">
            Cápsulas históricas. Origen y evolución de la marca.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {collections.map((col) => (
              <Link
                key={col.id}
                href={`/collections/${col.slug}`}
                className="group block"
              >
                <div className="aspect-[4/3] relative bg-muted rounded-lg overflow-hidden mb-4">
                  <Image
                    src={imageSrc(col.imageUrl)}
                    alt={col.name}
                    fill
                    className="object-cover transition-transform duration-150 ease-out group-hover:scale-[1.02]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-[#111]/50 flex items-end p-6">
                    <span className="font-semibold text-white text-lg">
                      {col.name}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {col.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
