import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

export function urlFor(source: { _type: string; asset?: { _ref: string } } | null) {
  if (!source?.asset?._ref) return null;
  return builder.image(source);
}

export function getImageUrl(
  source: { _type: string; asset?: { _ref: string } } | null | undefined
): string | null {
  if (source == null) return null;
  const url = urlFor(source);
  return url ? url.url() : null;
}
