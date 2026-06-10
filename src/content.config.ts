import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro:schema";

// Valid subject names — must match the files in src/content/subjects/.
const validSubjects = [
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

const iconSchema = z
  .object({
    name: z.string().describe("Icon name from the Phosphor icon set"),
    color: z.string().describe("UnoCSS text colour utility, e.g. text-rose-500"),
  })
  .optional();

const platforms = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/platforms" }),
  schema: z.object({
    name: z.string(),
    publisher: z.string(),
    grades: z.array(z.number()),
    url: z.string().url(),
    subject: z.enum(validSubjects).describe("Must match a valid subject name"),
    isActive: z.boolean().default(true),
    description: z.string(),
    longDescription: z.string(),
    iconOverwrite: z
      .boolean()
      .optional()
      .default(false)
      .describe("Use the custom icon below instead of the subject icon"),
    icon: iconSchema.describe("Custom icon override for this platform"),
  }),
});

const subjects = defineCollection({
  loader: glob({ pattern: "**/*.json", base: "./src/content/subjects" }),
  schema: z.object({
    name: z.string(),
    displayName: z.string(),
    order: z.number(),
    isActive: z.boolean().default(true),
    icon: iconSchema.describe("Default icon for this subject"),
  }),
});

export const collections = { platforms, subjects };
