import { defineCollection, z } from "astro:content";

// Define valid subject names based on our subject files
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

const platformCollection = defineCollection({
  type: "data",
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
      .describe("Whether to use custom icon instead of subject icon"),
    icon: z
      .object({
        name: z.string().describe("Icon name from the phosphor-icons set"),
        color: z.string().describe("Tailwind CSS color class"),
      })
      .optional()
      .describe("Custom icon override for this platform"),
  }),
});

const subjectCollection = defineCollection({
  type: "data",
  schema: z.object({
    name: z.string(),
    displayName: z.string(),
    order: z.number(),
    isActive: z.boolean().default(true),
    icon: z
      .object({
        name: z.string().describe("Icon name from the phosphor-icons set"),
        color: z.string().describe("Tailwind CSS color class"),
      })
      .optional()
      .describe("Default icon for this subject"),
  }),
});

export const collections = {
  platforms: platformCollection,
  subjects: subjectCollection,
};
