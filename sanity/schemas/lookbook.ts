import { defineField, defineType } from "sanity";

export default defineType({
  name: "lookbook",
  title: "Lookbook",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título (ES)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtítulo (ES)",
      type: "string",
    }),
    defineField({
      name: "subtitleEn",
      title: "Subtítulo (EN)",
      type: "string",
      description: "Opcional.",
    }),
    defineField({
      name: "cta",
      title: "Texto del CTA (ES)",
      type: "string",
      description: "Ej: Ver colección",
    }),
    defineField({
      name: "href",
      title: "Enlace (href)",
      type: "string",
      description: "Ej: /collections/god-is-first",
    }),
    defineField({
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Orden en LookbookRail.",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "subtitle",
      media: "image",
    },
  },
});
