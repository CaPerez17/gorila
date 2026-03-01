import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductsByCategory } from "@/lib/data/products";
import { ProductGrid } from "@/components/product/ProductGrid";
import type { ProductCategory } from "@/types";

const CATEGORY_LABELS: Record<ProductCategory, string> = {
  women: "Mujeres",
  men: "Hombres",
  headwear: "Gorras",
  kids: "Niños",
};

export default async function ShopCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const validCategories: ProductCategory[] = [
    "women",
    "men",
    "headwear",
    "kids",
  ];
  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const products = (await getProductsByCategory(category as ProductCategory)) ?? [];
  const label = CATEGORY_LABELS[category as ProductCategory];

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <nav className="text-sm text-muted-foreground mb-6">
        <Link href="/shop" className="hover:text-foreground">
          Tienda
        </Link>
        <span className="mx-2">/</span>
        <span className="text-foreground">{label}</span>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold mb-10">{label}</h1>
      <ProductGrid products={products} />
    </div>
  );
}
