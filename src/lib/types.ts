// Plain, serialisable shapes passed from Astro server frontmatter into the
// Svelte and Solid islands. Islands never touch `astro:content` directly.

export type PublisherKey =
  | "gyldendal"
  | "alinea"
  | "dansk-lf"
  | "jh-software"
  | "andre";

export interface PlatformItem {
  id: string;
  name: string;
  publisher: string;
  publisherKey: PublisherKey;
  grades: number[];
  url: string;
  /** Subject key, e.g. "dansk". */
  subject: string;
  /** Human display name, e.g. "Dansk". */
  subjectDisplay: string;
  description: string;
  longDescription: string;
  /** UnoCSS icon class, e.g. "i-ph-book-bookmark-fill". */
  iconClass: string;
  /** UnoCSS text-colour utility, e.g. "text-rose-500". */
  iconColor: string;
}

export interface SubjectInfo {
  name: string;
  displayName: string;
  order: number;
  iconClass: string;
  iconColor: string;
}
