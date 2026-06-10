// @unocss-include
import type { PublisherKey } from "./types";

export function publisherKey(publisher: string): PublisherKey {
  switch (publisher) {
    case "Gyldendal":
      return "gyldendal";
    case "Alinea":
      return "alinea";
    case "Dansk LF":
      return "dansk-lf";
    case "JH Software":
      return "jh-software";
    default:
      return "andre";
  }
}

/**
 * Static badge palette per publisher. Literal strings (with the @unocss-include
 * hint above) so UnoCSS extracts them — never build these with template strings.
 */
export const PUBLISHER_BADGE: Record<PublisherKey, string> = {
  gyldendal: "bg-green-wash text-green-dark",
  alinea: "bg-rose-100 text-rose-700",
  "dansk-lf": "bg-sky-100 text-sky-700",
  "jh-software": "bg-amber-100 text-amber-700",
  andre: "bg-paper-sunken text-ink-soft",
};
