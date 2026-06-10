import { defineCollection } from "astro:content";
import { z } from "astro:schema";
import { glob } from "astro/loaders";

// Subject slugs are the canonical key shared by platforms (data) and the
// accent palette (src/lib/subjects.ts). Keep these in sync with that file.
const subjectSlugs = [
  "andre",
  "billedkunst",
  "biologi",
  "dansk",
  "engelsk",
  "fysik-kemi",
  "geografi",
  "handvaerk-design",
  "historie",
  "madkundskab",
  "matematik",
  "natur-teknologi",
  "religion",
  "samfundsfag",
  "tysk",
] as const;

const platforms = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/platforms" }),
  schema: z.object({
    name: z.string(),
    publisher: z.string(),
    grades: z.array(z.number()),
    url: z.string().url(),
    subject: z.enum(subjectSlugs),
    isActive: z.boolean().default(true),
    description: z.string(),
    longDescription: z.string(),
  }),
});

const subjects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/subjects" }),
  schema: z.object({
    name: z.string(),
    displayName: z.string(),
    order: z.number(),
    isActive: z.boolean().default(true),
  }),
});

export const collections = { platforms, subjects };
