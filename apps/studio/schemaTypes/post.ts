import { defineType, defineField } from "sanity";
import { LOCALES } from "./fields";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({
      name: "locale",
      title: "Locale",
      type: "string",
      options: { list: LOCALES },
      validation: (r) => r.required(),
      initialValue: "en",
    }),
    defineField({
      name: "translationGroupId",
      title: "Translation Group ID",
      type: "string",
      description: "Use the same ID to link translations across locales (e.g. 'post-001').",
    }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "author", type: "reference", to: [{ type: "author" }] }),
    defineField({ name: "categories", type: "array", of: [{ type: "reference", to: [{ type: "category" }] }] }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "content", type: "array", of: [{ type: "block" }, { type: "image", options: { hotspot: true } }] }),
    defineField({
      name: "translations",
      title: "Translations",
      type: "array",
      of: [{ type: "reference", to: [{ type: "post" }] }],
      description: "Link translated versions of this post.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text" }),
        defineField({ name: "canonical", type: "url" }),
        defineField({ name: "ogImage", type: "image", options: { hotspot: true } }),
      ],
    }),
  ],
});
