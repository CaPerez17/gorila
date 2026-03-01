import { defineField, defineType } from "sanity";

export const productVariant = defineType({
  name: "productVariant",
  title: "Variante",
  type: "object",
  fields: [
    defineField({
      name: "id",
      title: "ID (opcional)",
      type: "string",
      description: "Para compatibilidad. Si no se define, se usa _key.",
    }),
    defineField({
      name: "sku",
      title: "SKU",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
    }),
    defineField({
      name: "size",
      title: "Talla",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Precio (COP)",
      type: "number",
    }),
    defineField({
      name: "stock",
      title: "Stock",
      type: "number",
    }),
    defineField({
      name: "image",
      title: "Imagen de variante",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      color: "color",
      size: "size",
      sku: "sku",
    },
    prepare({ color, size, sku }) {
      const parts = [color, size].filter(Boolean);
      return {
        title: parts.length ? `${parts.join(" / ")} (${sku})` : sku || "Variante",
      };
    },
  },
});

export default defineType({
  name: "product",
  title: "Producto",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nombre (ES)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción (ES)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Mujeres", value: "women" },
          { title: "Hombres", value: "men" },
          { title: "Gorras", value: "headwear" },
          { title: "Niños", value: "kids" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "productType",
      title: "Tipo de producto",
      type: "string",
      description: "Ej: Bodysuit, T-Shirt, Flexfit Cap",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "variants",
      title: "Variantes",
      type: "array",
      of: [{ type: "productVariant" }],
      validation: (Rule) =>
        Rule.required().min(1).error("Al menos una variante es requerida"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "category",
      media: "images.0",
    },
  },
});
