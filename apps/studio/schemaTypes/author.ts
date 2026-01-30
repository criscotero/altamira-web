import { defineType, defineField } from "sanity";
import { LOCALES } from "./fields";

export default defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "bio", type: "text" }),
    defineField({ name: "locale", type: "string", options: { list: LOCALES }, initialValue: "en" }),
  ],
});
