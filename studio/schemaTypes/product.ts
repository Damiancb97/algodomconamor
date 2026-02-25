import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Productos",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nombre",
      type: "string",
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Descripción",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "gender",
      title: "Para",
      type: "string",
      options: {
        list: [
          { title: "Niña", value: "nina" },
          { title: "Niño", value: "nino" },
          { title: "Unisex", value: "unisex" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ageRanges",
      title: "Edad (rangos)",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "0–1 mes", value: "0-1m" },
          { title: "1–3 meses", value: "1-3m" },
          { title: "3–6 meses", value: "3-6m" },
          { title: "6–9 meses", value: "6-9m" },
          { title: "9–12 meses", value: "9-12m" },
          { title: "12–18 meses", value: "12-18m" },
          { title: "18–24 meses", value: "18-24m" },
          { title: "2–3 años", value: "2-3y" },
        ],
      },
    }),
    defineField({
      name: "category",
      title: "Categoría",
      type: "string",
      options: {
        list: [
          { title: "Jersey", value: "jersey" },
          { title: "Pelele", value: "pelele" },
          { title: "Chaqueta", value: "chaqueta" },
          { title: "Gorro", value: "gorro" },
          { title: "Patucos", value: "patucos" },
          { title: "Manta", value: "manta" },
          { title: "Conjunto", value: "conjunto" },
          { title: "Otro", value: "otro" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Precio (opcional)",
      type: "number",
      description: "Déjalo vacío si prefieres que pongan 'Consultar'.",
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "materials",
      title: "Materiales",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "status",
      title: "Estado",
      type: "string",
      options: {
        list: [
          { title: "Disponible", value: "available" },
          { title: "Bajo pedido", value: "made_to_order" },
          { title: "Agotado", value: "sold_out" },
        ],
      },
      initialValue: "available",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Imágenes",
      type: "array",
      of: [
        defineField({
          name: "imageItem",
          title: "Imagen",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Texto alternativo (alt)",
              type: "string",
              validation: (Rule) => Rule.required().min(3),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "videos",
      title: "Vídeos",
      type: "array",
      description: "Vídeos del producto (mp4, mov…). Opcional.",
      of: [
        defineField({
          name: "videoItem",
          title: "Vídeo",
          type: "file",
          options: { accept: "video/*" },
          fields: [
            defineField({
              name: "title",
              title: "Título (opcional)",
              type: "string",
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: "featured",
      title: "Destacado",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "publishedAt",
      title: "Fecha",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      subtitle: "category",
    },
  },
});