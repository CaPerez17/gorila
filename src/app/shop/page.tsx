import Link from "next/link";
import { getAllProducts } from "@/lib/data/products";
import type { ProductCategory } from "@/types";

const CATEGORIES: { id: ProductCategory; label: string }[] = [
  { id: "women", label: "Mujeres" },
  { id: "men", label: "Hombres" },
  { id: "headwear", label: "Gorras" },
  { id: "kids", label: "Niños" },
];

export default async function ShopPage() {
  const products = await getAllProducts();

  return (
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Tienda</h1>
      <div className="flex flex-wrap gap-4 mb-12">
        {CATEGORIES.map((cat) => {
          const count = products.filter((p) => p.category === cat.id).length;
          return (
            <Link
              key={cat.id}
              href={`/shop/${cat.id}`}
              className="px-4 py-2 rounded-md bg-muted hover:bg-muted/80 font-medium transition-colors"
            >
              {cat.label} {count > 0 && `(${count})`}
            </Link>
          );
        })}
      </div>
      <p className="text-muted-foreground">
        Selecciona una categoría para ver los productos.
      </p>
    </div>
  );
}
