import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Marquee } from "@/components/editorial/Marquee";
import { NewDropHero } from "@/components/editorial/NewDropHero";
import { FoundingCollectionCapsule } from "@/components/editorial/FoundingCollectionCapsule";
import { LookbookRail } from "@/components/editorial/LookbookRail";
import { StoryCards } from "@/components/editorial/StoryCards";
import { EditorialProductGrid } from "@/components/product/EditorialProductGrid";
import { getAllProducts } from "@/lib/data/products";
import {
  getDrops,
  getHistoricalCollections,
} from "@/lib/data/collections";
import { getSiteSettings } from "@/lib/sanity";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export default async function HomePage() {
  const [products, drops, collections, siteSettings] = await Promise.all([
    getAllProducts().then((p) => (p ?? []).slice(0, 5)),
    getDrops(),
    getHistoricalCollections(),
    getSiteSettings(),
  ]);
  const marqueeMessages = siteSettings?.marqueeMessages ?? undefined;
  const safeDrops = drops ?? [];
  const safeCollections = collections ?? [];

  const imageSrc = (path: string | undefined) =>
    path?.startsWith("/") || path?.startsWith("http") ? path! : PLACEHOLDER_IMAGE;

  return (
    <div>
      <section className="relative h-[55vh] min-h-[380px] flex items-center justify-center bg-[#111]">
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
            LADELGORILA
          </h1>
          <p className="text-lg md:text-xl text-white/70 mb-8">
            Disciplina. Lealtad. Calle.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Ir a la tienda</Link>
          </Button>
        </div>
      </section>

      <Marquee messages={marqueeMessages} />

      <NewDropHero />

      <section className="container py-8 md:py-12 px-4 md:px-6">
        <h2 className="text-xl font-semibold mb-6">Lookbook</h2>
        <LookbookRail />
      </section>

      <section className="container py-16 md:py-24 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Seleccionados</h2>
        <p className="text-muted-foreground mb-10 max-w-xl">
          Lo mejor de los últimos drops.
        </p>
        {products?.length > 0 ? (
          <EditorialProductGrid products={products} featuredIndex={0} />
        ) : (
          <p className="text-muted-foreground py-8">Aún no hay productos aquí.</p>
        )}
      </section>

      <FoundingCollectionCapsule />

      <StoryCards />

      <section className="container py-16 md:py-24 px-4 md:px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-2">Drops</h2>
        <p className="text-muted-foreground mb-10">
          Selecciones curadas. Nuevos, más vendidos, esenciales.
        </p>
        {safeDrops.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {safeDrops.map((drop) => (
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
              <p className="text-sm text-muted-foreground">{drop.description}</p>
            </Link>
          ))}
        </div>
        ) : (
          <p className="text-muted-foreground py-8">Próximamente.</p>
        )}
      </section>

      {safeCollections.length > 0 && (
        <section className="container py-16 md:py-24 px-4 md:px-6">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Colecciones</h2>
          <p className="text-muted-foreground mb-10">
            Cápsulas históricas. Origen y evolución de la marca.
          </p>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {safeCollections.map((col) => (
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
                <p className="text-sm text-muted-foreground">{col.description}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container py-16 md:py-24 px-4 md:px-6">
        <div className="max-w-2xl">
          <p className="text-muted-foreground text-lg leading-relaxed mb-2">
            Construimos para quienes se presentan. Disciplina sobre excusas.
            Lealtad al proceso.
          </p>
          <p className="text-sm text-muted-foreground/70 mb-6">
            We build for those who show up. Discipline over excuses. Loyalty to
            the grind.
          </p>
          <Button variant="outline" size="lg" asChild>
            <Link href="/brand">Nuestra historia</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
