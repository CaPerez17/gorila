import { groq } from "next-sanity";

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  marqueeMessages,
  marqueeSecondary,
  manifestoEs,
  manifestoEn
}`;

export const productsQuery = groq`*[_type == "product"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  name,
  description,
  category,
  productType,
  "images": images[].asset->url,
  "variants": variants[]{
    _key,
    id,
    sku,
    color,
    size,
    price,
    stock,
    "imageUrl": image.asset->url
  },
  _createdAt
}`;

export const productsByCategoryQuery = groq`*[_type == "product" && category == $category] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  name,
  description,
  category,
  productType,
  "images": images[].asset->url,
  "variants": variants[]{
    _key,
    id,
    sku,
    color,
    size,
    price,
    stock,
    "imageUrl": image.asset->url
  },
  _createdAt
}`;

export const productBySlugQuery = groq`*[_type == "product" && category == $category && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  name,
  description,
  category,
  productType,
  "images": images[].asset->url,
  "variants": variants[]{
    _key,
    id,
    sku,
    color,
    size,
    price,
    stock,
    "imageUrl": image.asset->url
  },
  _createdAt
}`;

export const productsByIdsQuery = groq`*[_type == "product" && _id in $ids]{
  _id,
  "slug": slug.current,
  name,
  description,
  category,
  productType,
  "images": images[].asset->url,
  "variants": variants[]{
    _key,
    id,
    sku,
    color,
    size,
    price,
    stock,
    "imageUrl": image.asset->url
  },
  _createdAt
}`;

export const collectionsQuery = groq`*[_type == "collection"] | order(type asc, _createdAt asc) {
  _id,
  "slug": slug.current,
  name,
  description,
  descriptionEn,
  type,
  "imageUrl": image.asset->url,
  "productIds": products[]->_id
}`;

export const dropsQuery = groq`*[_type == "collection" && type == "drop"] | order(_createdAt desc) {
  _id,
  "slug": slug.current,
  name,
  description,
  type,
  "imageUrl": image.asset->url,
  "productIds": products[]->_id
}`;

export const collectionBySlugQuery = groq`*[_type == "collection" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  name,
  description,
  type,
  "imageUrl": image.asset->url,
  "productIds": products[]->_id
}`;

export const foundingCollectionQuery = groq`*[_type == "collection" && type == "founding"][0]{
  _id,
  "slug": slug.current,
  name,
  description,
  type,
  "imageUrl": image.asset->url,
  "productIds": products[]->_id
}`;

export const timelineQuery = groq`*[_type == "timelineEvent"] | order(order asc, year asc) {
  _id,
  year,
  title,
  titleEn,
  description,
  descriptionEn,
  "imageUrl": image.asset->url
}`;

export const lookbooksQuery = groq`*[_type == "lookbook"] | order(order asc) {
  _id,
  "slug": slug.current,
  title,
  subtitle,
  subtitleEn,
  cta,
  href,
  "imageUrl": image.asset->url,
  order
}`;

export const lookbookBySlugQuery = groq`*[_type == "lookbook" && slug.current == $slug][0]{
  _id,
  "slug": slug.current,
  title,
  subtitle,
  subtitleEn,
  cta,
  href,
  "imageUrl": image.asset->url
}`;
