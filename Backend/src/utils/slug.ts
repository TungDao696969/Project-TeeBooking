import slugify from "slugify";

export const generateSlug = (title: string) => {
  return slugify(title, {
    lower: true,
    strict: true,
    locale: "vi",
  });
};

export const generateSlug2 = (text: string) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "");
};