import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data/products";
import { PDPClient } from "@/components/product/PDPClient";
import type { ProductCategory } from "@/types";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  women: "Mujeres",
  men: "Hombres",
  headwear: "Gorras",
  kids: "Niños",
};

export default async function ProductPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const validCategories: ProductCategory[] = [
    "women",
    "men",
    "headwear",
    "kids",
  ];
  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const product = await getProductBySlug(category as ProductCategory, slug);
  if (!product) notFound();

  const label = CATEGORY_LABELS[category as ProductCategory];

  return (
    <div className="container py-8 md:py-12">
      <nav className="text-sm text-muted-foreground mb-8">
        <Link href="/shop" className="hover:text-foreground">
          Tienda
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/shop/${category}`} className="hover:text-foreground">
          {label}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{product.name}</span>
      </nav>

      <PDPClient
        product={product}
        category={category}
        categoryLabel={label}
      />
    </div>
  );
}
