import { defineField, defineType } from "sanity";

export default defineType({
  name: "collection",
  title: "Colección",
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
      validation: (Rule) => Rule.required().error("Slug es requerido y debe ser único"),
    }),
    defineField({
      name: "description",
      title: "Descripción (ES)",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "descriptionEn",
      title: "Descripción (EN)",
      type: "text",
      description: "Opcional.",
    }),
    defineField({
      name: "type",
      title: "Tipo",
      type: "string",
      options: {
        list: [
          { title: "Drop", value: "drop" },
          { title: "Colección histórica", value: "collection" },
          { title: "Colección fundadora", value: "founding" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "products",
      title: "Productos",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "type",
      media: "image",
    },
  },
});
