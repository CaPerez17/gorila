import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Configuración del sitio",
  type: "document",
  fields: [
    defineField({
      name: "marqueeMessages",
      title: "Mensajes del marquee (ES)",
      type: "array",
      of: [{ type: "string" }],
      description: "Mensajes que rotan en el marquee. Ej: DISCIPLINA SIN EXCUSAS",
      validation: (Rule) =>
        Rule.required().min(1).error("Al menos un mensaje en español es requerido"),
    }),
    defineField({
      name: "marqueeSecondary",
      title: "Mensaje secundario del marquee (ES)",
      type: "string",
      description: "Opcional. Usado en páginas Brand/Collections.",
    }),
    defineField({
      name: "manifestoEs",
      title: "Manifiesto (ES)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "manifestoEn",
      title: "Manifiesto (EN)",
      type: "text",
      rows: 3,
      description: "Opcional. Traducción al inglés.",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Configuración del sitio",
      };
    },
  },
});
