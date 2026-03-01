import Link from "next/link";
import { isSanityConfigured } from "@/lib/sanity";
import { StudioClient } from "./StudioClient";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-muted/30">
        <h1 className="text-xl font-semibold mb-2">CMS no configurado</h1>
        <p className="text-muted-foreground text-center max-w-md mb-6">
          Sanity CMS requiere NEXT_PUBLIC_SANITY_PROJECT_ID y NEXT_PUBLIC_SANITY_DATASET en las variables de entorno.
        </p>
        <Link
          href="/"
          className="text-sm font-medium text-primary hover:underline"
        >
          Volver al inicio
        </Link>
      </div>
    );
  }

  return <StudioClient />;
}
