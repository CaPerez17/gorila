"use client";

const DEFAULT_MESSAGE =
  "DISCIPLINA SIN EXCUSAS — LEALTAD AL PROCESO — CALLE Y GIMNASIO — ";

const SECONDARY_MESSAGE =
  "HECHO EN CÓRDOBA, COLOMBIA — PARA QUIENES CUMPLEN — GOD IS FIRST — ";

interface MarqueeProps {
  /** Messages to repeat (joined with " — "). Default: primary Spanish tagline. */
  messages?: string[];
  /** Use secondary message (Brand/Collections). */
  variant?: "primary" | "secondary";
  /** Animation direction. Default: left. */
  direction?: "left" | "right";
}

function MarqueeTrack({
  text,
  direction,
}: {
  text: string;
  direction: "left" | "right";
}) {
  const items = Array.from({ length: 6 }).map((_, i) => (
    <span
      key={i}
      className="inline-flex shrink-0 px-6 text-[11px] font-medium uppercase tracking-[0.25em] text-muted-foreground"
    >
      {text}
    </span>
  ));
  return (
    <div
      className={`marquee-content flex w-max whitespace-nowrap ${direction === "right" ? "marquee-reverse" : ""}`}
    >
      {items}
      {items}
    </div>
  );
}

export function Marquee({
  messages,
  variant = "primary",
  direction = "left",
}: MarqueeProps) {
  const text =
    messages && messages.length > 0
      ? messages.join(" — ") + " "
      : variant === "secondary"
        ? SECONDARY_MESSAGE
        : DEFAULT_MESSAGE;

  return (
    <div
      className="overflow-hidden border-y border-border bg-muted/20 py-3"
      aria-hidden="true"
    >
      <MarqueeTrack text={text} direction={direction} />
    </div>
  );
}
