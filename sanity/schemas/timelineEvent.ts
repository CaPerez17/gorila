import { defineField, defineType } from "sanity";

export default defineType({
  name: "timelineEvent",
  title: "Evento de línea de tiempo",
  type: "document",
  fields: [
    defineField({
      name: "year",
      title: "Año",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
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
      name: "image",
      title: "Imagen",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "order",
      title: "Orden",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "year",
      media: "image",
    },
  },
});
