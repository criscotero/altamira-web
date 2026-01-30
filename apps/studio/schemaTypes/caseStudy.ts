import { defineType, defineField } from "sanity";
import { LOCALES } from "./fields";

export default defineType({
  name: "caseStudy",
  title: "Case Study",
  type: "document",
  fields: [
    defineField({ name: "locale", type: "string", options: { list: LOCALES }, initialValue: "en" }),
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "problem", type: "text" }),
    defineField({ name: "solution", type: "text" }),
    defineField({ name: "results", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
  ],
});
