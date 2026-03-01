import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCollectionBySlugAsync,
} from "@/lib/data/collections";
import { getProductsByIds } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlugAsync(slug);
  if (!collection) notFound();

  const products = await getProductsByIds(collection.productIds);

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/collections" className="hover:text-foreground">
          Colecciones
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{collection.name}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold mb-2">
        {collection.name}
      </h1>
      <p className="text-muted-foreground mb-10 text-lg">
        {collection.description}
      </p>
      <ProductGrid products={products} />
    </div>
  );
}
