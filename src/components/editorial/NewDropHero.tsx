import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PLACEHOLDER_IMAGE } from "@/lib/constants";

export function NewDropHero() {
  return (
    <section className="relative min-h-[70vh] flex items-end">
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#111] via-[#111]/80 to-[#111]/40 z-[1]"
        aria-hidden="true"
      />
      <div className="absolute inset-0 z-0" aria-hidden="true">
        <Image
          src={PLACEHOLDER_IMAGE}
          alt=""
          fill
          priority
          quality={80}
          className="object-cover opacity-60"
          sizes="100vw"
        />
      </div>
      <div className="relative z-10 w-full container px-4 md:px-6 pb-16 md:pb-24 pt-32">
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-4">
          Nuevo drop
        </h2>
        <p className="text-lg md:text-xl text-white/90 leading-relaxed max-w-xl mb-2">
          Hecho para quienes cumplen.
        </p>
        <p className="text-sm text-white/60 mb-8 max-w-xl">
          Built for those who show up.
        </p>
        <Button asChild size="lg">
          <Link href="/collections/new-arrivals">Explorar el drop</Link>
        </Button>
      </div>
    </section>
  );
}
