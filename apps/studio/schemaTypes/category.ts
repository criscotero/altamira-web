import { defineType, defineField } from "sanity";
import { LOCALES } from "./fields";

export default defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "locale", type: "string", options: { list: LOCALES }, initialValue: "en" }),
  ],
});
