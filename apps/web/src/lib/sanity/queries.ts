export const POSTS_BY_LOCALE = `*[_type == "post" && locale == $locale && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  "author": author-> { name },
  "coverImage": coverImage.asset->url,
  "categories": categories[]-> { title, slug }
}`;

export const POST_BY_SLUG = `*[_type == "post" && locale == $locale && slug.current == $slug][0]{
  _id,
  title,
  slug,
  excerpt,
  publishedAt,
  content,
  "author": author-> { name },
  "coverImage": coverImage.asset->url,
  "categories": categories[]-> { title, slug },
  "translations": translations[]->{ locale, "slug": slug.current, title }
}`;
