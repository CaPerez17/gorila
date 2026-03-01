import { defineField, defineType } from "sanity";

export default defineType({
  name: "story",
  title: "Story",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Título (ES)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleEn",
      title: "Título (EN)",
      type: "string",
      description: "Opcional.",
    }),
    defineField({
      name: "excerpt",
      title: "Extracto (ES)",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerptEn",
      title: "Extracto (EN)",
      type: "text",
      description: "Opcional.",
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
      name: "href",
      title: "Enlace (href)",
      type: "string",
      description: "Ej: /brand#manifesto o /lookbook/god-is-first",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
      description: "Orden de aparición en StoryCards.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
