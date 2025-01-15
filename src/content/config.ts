import { defineCollection, z } from 'astro:content';

const platformCollection = defineCollection({
	type: 'data',
	schema: z.object({
		name: z.string(),
		publisher: z.string(), 
		grades: z.array(z.number()),
		url: z.string().url(),
		subject: z.string(),
		isActive: z.boolean().default(true),
		description: z.string(),
		longDescription: z.string()
	})
});

const subjectCollection = defineCollection({
	type: 'data', 
	schema: z.object({
		name: z.string(),
		displayName: z.string(),
		order: z.number(),
		isActive: z.boolean().default(true)
	})
});

export const collections = {
	platforms: platformCollection,
	subjects: subjectCollection
};